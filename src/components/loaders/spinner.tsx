import { cn } from '@/lib/utils';

export const Spinner = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'size-10 animate-spin rounded-full border-[5px] border-gray-300 border-t-blue-600',
        className
      )}
    />
  );
};
