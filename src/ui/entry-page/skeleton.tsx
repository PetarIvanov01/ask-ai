export const SkeletonLoader = () => {
  return (
    <div className="flex justify-center items-center flex-wrap">
      {Array(3)
        .fill(null)
        .map((_, index) => (
          <CardSkeleton key={index} />
        ))}
    </div>
  );
};

const CardSkeleton = () => {
  return (
    <div className="flex flex-col items-center p-6 animate-pulse">
      <div className="size-14 rounded-full mb-4 bg-gray-300 flex justify-center items-center"></div>
      <div className="h-6 w-36 bg-gray-300 mb-4"></div>
      <div className="w-60 space-y-2">
        <div className="h-10 bg-gray-300 rounded-lg"></div>
        <div className="h-10 bg-gray-300 rounded-lg"></div>
        <div className="h-10 bg-gray-300 rounded-lg"></div>
      </div>
    </div>
  );
};
