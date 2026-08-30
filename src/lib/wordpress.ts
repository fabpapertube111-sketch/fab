import type { WPPost, WPMedia, Product, WPImage, Testimonial, CompanySettings } from '@/types';

const WP_API_URL =
  process.env.WORDPRESS_API_URL ||
  'https://dev-fab-paper-tube.pantheonsite.io/wp-json/wp/v2';

const IS_DEV = process.env.NODE_ENV === 'development';

// ─── Fetch Helper ─────────────────────────────────────────────────────────────
async function wpFetch<T>(endpoint: string): Promise<T> {
  const url = `${WP_API_URL}${endpoint}`;
  const res = await fetch(url, IS_DEV
    ? { cache: 'no-store' }
    : { next: { revalidate: 60 } }
  );
  if (!res.ok) throw new Error(`WP ${res.status}: ${url}`);
  return res.json();
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
function parseMedia(media: WPMedia): WPImage {
  return {
    id: media.id,
    url: media.source_url,
    alt: media.alt_text || '',
    width: media.media_details?.width || 800,
    height: media.media_details?.height || 600,
  };
}

export function getYouTubeEmbedId(url: string): string | null {
  if (!url) return null;
  const patterns = [
    /youtu\.be\/([a-zA-Z0-9_-]{11})/,
    /[?&]v=([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/,
  ];
  for (const p of patterns) {
    const m = url.match(p);
    if (m) return m[1];
  }
  return null;
}

// ─── Parse Product ────────────────────────────────────────────────────────────
function parseProduct(post: WPPost): Product {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  const featuredImage = media ? parseMedia(media) : null;
  const acf = (post.acf || {}) as Record<string, unknown>;

  const str = (v: unknown): string =>
    typeof v === 'string' ? v.trim() : '';

  // used_for → array
  const usedFor = str(acf.used_for)
    ? str(acf.used_for).split('\n').map(s => s.trim()).filter(Boolean)
    : [];

  // applications → array (fall back to usage_application)
  const applications = str(acf.applications)
    ? str(acf.applications).split('\n').map(s => s.trim()).filter(Boolean)
    : str(acf.usage_application)
    ? [str(acf.usage_application)]
    : [];

  // specifications from individual ACF fields
  const specs: Product['specifications'] = [];
  const add = (label: string, v: unknown) => {
    const s = str(v);
    if (s) specs.push({ label, value: s });
  };
  add('Thickness', acf.thickness);
  add('Diameter', acf.diameter);
  add('Length', acf.length);
  add('Size', acf.size);
  add('Weight', acf.weight);
  add('Usage / Application', acf.usage_application ?? acf.usage);
  add('Material', acf.material);
  add('Quality / Features', acf.quality);

  const legacySpecs = Array.isArray(acf.specifications)
    ? (acf.specifications as Product['specifications'])
    : [];
  const allSpecs = specs.length > 0 ? specs : legacySpecs;

  const productOrder =
    typeof acf.product_order === 'number' && acf.product_order > 0
      ? acf.product_order
      : typeof acf.product_order === 'string' && acf.product_order.trim() !== '' && !isNaN(Number(acf.product_order))
      ? Number(acf.product_order)
      : typeof post.menu_order === 'number' && post.menu_order > 0
      ? post.menu_order
      : 9999;

  const rawExcerpt = post.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]*>/g, '').trim()
    : '';
  const shortDesc = str(acf.short_description) ||
    (rawExcerpt.length > 10 ? rawExcerpt :
      `${post.title.rendered} — manufactured with precision for consistent performance.`);

  const rawVideo = acf.product_video ?? acf.video_url;
  const videoUrl = str(rawVideo) || undefined;

  return {
    id: post.id,
    slug: post.slug,
    title: post.title.rendered,
    shortDescription: shortDesc,
    description: post.content.rendered,
    featuredImage,
    gallery: [],
    usedFor,
    applications,
    specifications: allSpecs,
    seoTitle: post.yoast_head_json?.title || post.title.rendered,
    seoDescription: post.yoast_head_json?.description || '',
    acf: acf as Product['acf'],
    videoUrl,
    thickness: str(acf.thickness) || undefined,
    diameter: str(acf.diameter) || undefined,
    length: str(acf.length) || undefined,
    size: str(acf.size) || undefined,
    weight: str(acf.weight) || undefined,
    usage: str(acf.usage_application) || str(acf.usage) || undefined,
    material: str(acf.material) || undefined,
    quality: str(acf.quality) || undefined,
    productOrder,
  };
}

// ─── Products API ─────────────────────────────────────────────────────────────
export async function getAllProducts(): Promise<Product[]> {
  try {
    const posts = await wpFetch<WPPost[]>(
      '/products?_embed&per_page=100&status=publish&orderby=menu_order&order=asc'
    );
    if (!Array.isArray(posts) || posts.length === 0) return getFallbackProducts();
    return posts
      .map(parseProduct)
      .sort((a, b) => (a.productOrder ?? 999) - (b.productOrder ?? 999));
  } catch (err) {
    console.error('[WP] getAllProducts failed:', err);
    return getFallbackProducts();
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const posts = await wpFetch<WPPost[]>(
      `/products?slug=${slug}&_embed&status=publish`
    );
    if (!Array.isArray(posts) || posts.length === 0) return null;
    return parseProduct(posts[0]);
  } catch (err) {
    console.error('[WP] getProductBySlug failed:', err);
    return getFallbackProducts().find(p => p.slug === slug) ?? null;
  }
}

export async function getRelatedProducts(currentSlug: string, limit = 4): Promise<Product[]> {
  const all = await getAllProducts();
  return all.filter(p => p.slug !== currentSlug).slice(0, limit);
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const posts = await wpFetch<WPPost[]>('/testimonials?_embed&per_page=20&status=publish');
    return posts.map(post => {
      const acf = (post.acf || {}) as Record<string, string | number>;
      return {
        id: post.id,
        clientName: typeof acf.client_name === 'string' ? acf.client_name : post.title.rendered,
        designation: typeof acf.designation === 'string' ? acf.designation : '',
        company: typeof acf.company === 'string' ? acf.company : '',
        review: typeof acf.review === 'string' ? acf.review : post.content.rendered,
        rating: typeof acf.rating === 'number' ? acf.rating : 5,
      };
    });
  } catch {
    return getFallbackTestimonials();
  }
}

// ─── Company Settings ─────────────────────────────────────────────────────────
export async function getCompanySettings(): Promise<CompanySettings> {
  try {
    const s = await wpFetch<Record<string, string>>('/company-settings');
    return {
      name: s.name || 'FAB Paper Tube',
      tagline: s.tagline || 'Small Size. Big Precision.',
      phone1: s.phone1 || '+91 82380 74700',
      phone2: s.phone2 || '+91 98796 45030',
      email: s.email || 'fabpapertube111@gmail.com',
      address: s.address || 'Shed No. 14, Star Gold Industrial Park, Kuha, Ahmedabad, Gujarat - 382433',
      addressLine1: s.address_line1 || 'Shed No. 14, Star Gold Industrial Park',
      addressLine2: s.address_line2 || 'Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha',
      city: s.city || 'Ahmedabad',
      state: s.state || 'Gujarat',
      pincode: s.pincode || '382433',
      facebook: s.facebook,
      instagram: s.instagram,
      linkedin: s.linkedin,
      whatsapp: s.whatsapp || '+918238074700',
    };
  } catch {
    return getFallbackCompanySettings();
  }
}

// ─── Fallback Data (only used if WordPress is unreachable) ────────────────────
export function getFallbackProducts(): Product[] {
  return [
    {
      id: 1, slug: 'white-sewing-thread-paper-tube',
      title: 'White Sewing Thread Paper Tube',
      shortDescription: 'Strong paper tubes for sewing thread winding. Designed for smooth winding and reliable support.',
      description: '<p>Precision-wound paper tubes for sewing thread winding applications.</p>',
      featuredImage: null, gallery: [], usedFor: ['Sewing Thread & Yarn Winding'],
      applications: ['Textile Industry'],
      specifications: [{ label: 'Usage / Application', value: 'Sewing Thread Winding' }],
      seoTitle: 'White Sewing Thread Paper Tube | FAB Paper Tube',
      seoDescription: 'Premium white sewing thread paper tubes.', acf: {}, productOrder: 1,
    },
    {
      id: 2, slug: 'brown-notebook-cover-paper-tube',
      title: 'Brown Notebook Cover Paper Tube',
      shortDescription: 'Durable paper tubes for notebook cover rolls.',
      description: '<p>Brown kraft paper tubes for notebook cover roll winding.</p>',
      featuredImage: null, gallery: [], usedFor: ['Notebook Cover Roll Winding'],
      applications: ['Stationery Industry'],
      specifications: [{ label: 'Usage / Application', value: 'Notebook Cover Roll Winding' }],
      seoTitle: 'Brown Notebook Cover Paper Tube | FAB Paper Tube',
      seoDescription: 'Heavy-duty brown paper tubes.', acf: {}, productOrder: 2,
    },
  ];
}

function getFallbackTestimonials(): Testimonial[] {
  return [
    { id: 1, clientName: 'Rajesh Patel', designation: 'Production Manager', company: 'Textile Manufacturing Unit', review: 'FAB Paper Tube has been our trusted supplier for sewing thread tubes. Precision and consistency in manufacturing has significantly improved our production efficiency.', rating: 5 },
    { id: 2, clientName: 'Suresh Mehta', designation: 'Purchase Manager', company: 'Cracker Manufacturing Company', review: 'Excellent quality paper tubes for our cracker manufacturing needs. The small-size precision is outstanding. Very reliable supply and on-time delivery.', rating: 5 },
    { id: 3, clientName: 'Priya Shah', designation: 'Operations Head', company: 'Paper Converting Unit', review: 'We have been using FAB Paper Tube products for thermal rolls and notebook covers. Quality is consistent and the team is very responsive to custom requirements.', rating: 5 },
    { id: 4, clientName: 'Amit Kumar', designation: 'Director', company: 'Packaging Solutions', review: 'Their stretch film tubes are exactly what we needed. Strong, consistent and delivered on time. FAB Paper Tube understands industrial requirements very well.', rating: 5 },
    { id: 5, clientName: 'Dinesh Sharma', designation: 'Factory Manager', company: 'Candle Manufacturing Unit', review: 'The birthday cake sparkle candle tubes from FAB are perfect. Precise dimensions, good quality paper and reliable supply. Highly recommended for candle manufacturers.', rating: 5 },
    { id: 6, clientName: 'Vikram Desai', designation: 'Purchase Head', company: 'Stationery Products Ltd', review: 'FAB Paper Tube delivers consistent quality batch after batch. Their custom sizing service has been extremely helpful for our unique notebook cover requirements.', rating: 5 },
    { id: 7, clientName: 'Meena Joshi', designation: 'Operations Manager', company: 'Thread Winding Industries', review: 'We switched to FAB Paper Tube two years ago and have never looked back. The quality of sewing thread tubes is exceptional and supply is always on time.', rating: 5 },
    { id: 8, clientName: 'Harish Nair', designation: 'Production Director', company: 'Fireworks Manufacturing Co.', review: 'For our firecracker manufacturing, we need precise and consistent paper tubes. FAB Paper Tube has been our go-to supplier for years. Excellent quality and service.', rating: 5 },
  ];
}

function getFallbackCompanySettings(): CompanySettings {
  return {
    name: 'FAB Paper Tube', tagline: 'Small Size. Big Precision.',
    phone1: '+91 82380 74700', phone2: '+91 98796 45030',
    email: 'fabpapertube111@gmail.com',
    address: 'Shed No. 14, Star Gold Industrial Park, Kuha, Ahmedabad, Gujarat - 382433',
    addressLine1: 'Shed No. 14, Star Gold Industrial Park',
    addressLine2: 'Opp. Ghardaghar Kothiya Bus Stand, Indore Highway, Kuha',
    city: 'Ahmedabad', state: 'Gujarat', pincode: '382433', whatsapp: '+918238074700',
  };
}
