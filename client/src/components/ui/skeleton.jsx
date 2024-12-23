import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md bg-stone-300 dark:bg-stone-800", className)}
      {...props} />)
  );
}

export { Skeleton }
