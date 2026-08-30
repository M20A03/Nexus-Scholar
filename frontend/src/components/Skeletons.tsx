import React from 'react';

export const SkeletonBox: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => (
  <div className={`animate-pulse bg-slate-200 dark:bg-slate-800 rounded-lg ${className}`} />
);

export const PaperCardSkeleton: React.FC = () => (
  <div className="lumina-card p-6 border border-slate-200 dark:border-slate-800 space-y-4">
    <div className="flex justify-between items-start gap-4">
      <SkeletonBox className="h-6 w-3/4" />
      <SkeletonBox className="h-5 w-16 rounded-full" />
    </div>
    <div className="space-y-2">
      <SkeletonBox className="h-4 w-full" />
      <SkeletonBox className="h-4 w-5/6" />
    </div>
    <div className="flex gap-2 pt-2">
      <SkeletonBox className="h-6 w-24 rounded-md" />
      <SkeletonBox className="h-6 w-20 rounded-md" />
      <SkeletonBox className="h-6 w-28 rounded-md" />
    </div>
  </div>
);

export const StatCardSkeleton: React.FC = () => (
  <div className="lumina-card p-5 border border-slate-200 dark:border-slate-800 flex items-center gap-4">
    <SkeletonBox className="h-12 w-12 rounded-xl shrink-0" />
    <div className="space-y-2 flex-1">
      <SkeletonBox className="h-4 w-1/3" />
      <SkeletonBox className="h-7 w-1/2" />
    </div>
  </div>
);
