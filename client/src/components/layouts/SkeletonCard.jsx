import { Skeleton } from "@/components/ui/skeleton"

 const SkeletonCard=({isHideSub=false})=>{
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-[125px] w-full rounded-xl" />
      <div className="space-y-2">
       {
        !isHideSub && <>
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-[85%]" /></>
       }
      </div>
    </div>
  )
}
export default SkeletonCard
