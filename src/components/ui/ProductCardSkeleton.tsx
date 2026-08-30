export default function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded overflow-hidden border border-[#e5e5e5] animate-pulse">
      <div className="aspect-[4/3] bg-gray-200" />
      <div className="p-6 space-y-3">
        <div className="h-5 bg-gray-200 rounded w-3/4" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-5/6" />
        <div className="h-4 bg-gray-200 rounded w-1/2 mt-4" />
        <div className="h-9 bg-gray-200 rounded w-32 mt-4" />
      </div>
    </div>
  );
}
