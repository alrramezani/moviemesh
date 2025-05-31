import { UserIcon } from "@/components/icons";
import { useCallback } from "react";
type SkeletonType = {
  type: "userSearch";
  count?: number;
};
export default function Skeleton({ type, count = 3 }: SkeletonType) {
  const userSearchViewCreator = useCallback(() => {
    return (
      <>
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} data-testid="userSearch">
            <div className="flex items-center">
              <UserIcon className="w-10 h-10 me-3 text-gray-200" />
              <div className="border-b-gray-300">
                <div className="h-2.5 bg-gray-200 rounded-full w-32 mb-2"></div>
                <div className="w-48 h-2 bg-gray-200 rounded-full"></div>
              </div>
            </div>
            {i < count - 1 && (
              <div className="flex items-center justify-center">
                <div className="h-[1px] bg-gray-200 w-3/4 my-2"></div>
              </div>
            )}
          </div>
        ))}
      </>
    );
  }, [count]);
  const LoadingBlock = useCallback(() => {
    switch (type) {
      case "userSearch":
        return userSearchViewCreator();
      default:
        return <p>Idle</p>;
    }
  }, [type]);
  return (
    <div role="status" data-testid="skeleton" className="max-w-sm animate-pulse">
      {LoadingBlock()}
    </div>
  );
}
