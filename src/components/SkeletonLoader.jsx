// Skeleton loader component - displays as placeholder while content is loading
export function SkeletonJobCard() {
  return (
    <div className="animate-pulse bg-gradient-to-r from-slate-700 to-slate-900 rounded-lg p-6 border border-slate-600">
      {/* Job title skeleton */}
      <div className="h-6 bg-slate-600 rounded-md mb-4 w-3/4"></div>
      
      {/* Company name skeleton */}
      <div className="h-4 bg-slate-600 rounded-md mb-3 w-1/2"></div>
      
      {/* Location skeleton */}
      <div className="h-4 bg-slate-600 rounded-md mb-4 w-2/3"></div>
      
      {/* Description skeleton */}
      <div className="space-y-2 mb-4">
        <div className="h-3 bg-slate-600 rounded-md w-full"></div>
        <div className="h-3 bg-slate-600 rounded-md w-5/6"></div>
      </div>
      
      {/* Button skeletons */}
      <div className="flex gap-2">
        <div className="h-10 bg-slate-600 rounded-md flex-1"></div>
        <div className="h-10 bg-slate-600 rounded-md w-20"></div>
      </div>
    </div>
  );
}
