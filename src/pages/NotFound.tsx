import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center min-h-[calc(100vh-150px)] px-4  text-foreground'>
      <h1 className='text-9xl font-extrabold text-primary md:text-[12rem] md:leading-[12rem] animate-pulse text-center'>
        404
      </h1>
      <p className='text-2xl md:text-3xl mt-4 font-semibold text-center'>Oops! Page Not Found</p>
      <p className='text-muted-foreground mt-2 max-w-md text-center'>
        The page you are looking for does not exist or has been moved.
      </p>

      <button
        onClick={() => window.history.back()}
        className='mt-6 px-6 py-3 bg-primary text-white rounded-md hover:bg-primary/90 transition'
      >
        Go Back
      </button>
    </div>
  );
};

export default NotFound;
