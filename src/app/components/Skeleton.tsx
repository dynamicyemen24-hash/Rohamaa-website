// ============================================================
// Skeleton Components - For better loading states
// ============================================================

interface SkeletonProps {
  className?: string;
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

export function Skeleton({ className = '', variant = 'rectangular', width, height }: SkeletonProps) {
  const baseClasses = 'animate-pulse bg-[var(--muted)]';
  
  const variantClasses = {
    text: 'rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width || '100%',
    height: height || (variant === 'text' ? '1rem' : '2rem'),
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

// Shimmer effect for professional loading
export function ShimmerSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden bg-[var(--muted)] rounded-lg ${className}`}>
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  );
}

// Card skeleton
export function CardSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 border border-[var(--border)] space-y-3">
      <div className="flex items-start justify-between">
        <div className="w-10 h-10 bg-[var(--muted)] rounded-lg animate-pulse" />
        <div className="w-16 h-6 bg-[var(--muted)] rounded animate-pulse" />
      </div>
      <div className="w-3/5 h-6 bg-[var(--muted)] rounded animate-pulse" />
      <div className="w-4/5 h-4 bg-[var(--muted)] rounded animate-pulse" />
    </div>
  );
}

// Table row skeleton
export function TableRowSkeleton({ columns = 5 }: { columns?: number }) {
  return (
    <tr className="border-b border-[var(--border)]">
      {Array.from({ length: columns }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="w-full h-3 bg-[var(--muted)] rounded animate-pulse" />
        </td>
      ))}
    </tr>
  );
}

// Dashboard stats skeleton
export function DashboardStatsSkeleton() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="animate-pulse" style={{ animationDelay: `${i * 0.05}s` }}>
          <CardSkeleton />
        </div>
      ))}
    </div>
  );
}

// Chart skeleton
export function ChartSkeleton() {
  return (
    <div className="bg-white rounded-xl p-5 border border-[var(--border)] space-y-4">
      <div className="w-1/3 h-5 bg-[var(--muted)] rounded animate-pulse" />
      <div className="space-y-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-12 h-3 bg-[var(--muted)] rounded animate-pulse" />
            <div className="flex-1 h-4 bg-[var(--muted)] rounded animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}