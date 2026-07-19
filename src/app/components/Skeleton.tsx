// Skeleton Components for Loading States
interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  className?: string;
}

export function Skeleton({ width = '100%', height = '1rem', className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded-lg ${className}`}
      style={{ width, height }}
    />
  );
}

export function CardSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`bg-white rounded-2xl border border-gray-200 overflow-hidden ${className}`}>
      <Skeleton height="192px" className="rounded-none" />
      <div className="p-6 space-y-3">
        <div className="flex gap-2">
          <Skeleton width="80px" height="24px" />
          <Skeleton width="60px" height="24px" />
        </div>
        <Skeleton height="20px" width="80%" />
        <Skeleton height="16px" />
        <Skeleton height="16px" width="60%" />
        <div className="pt-3 border-t border-gray-200 flex justify-between">
          <Skeleton width="80px" height="16px" />
          <Skeleton width="100px" height="32px" className="rounded-lg" />
        </div>
      </div>
    </div>
  );
}