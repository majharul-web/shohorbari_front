import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const SkeletonLoader = () => {
  const digitsArray = Array.from({ length: 5 }, (_, index) => index);

  return (
    <>
      {digitsArray &&
        digitsArray.map((_, index) => (
          <div key={index} className='flex items-center'>
            <Skeleton count={2} />
          </div>
        ))}
    </>
  );
};
