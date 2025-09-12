const NoDataFound = ({ message }: { message?: string }) => {
  return (
    <div className='text-center py-10 min-h-[200px] my-auto'>
      <h2>No Data Found</h2>
      <p>{message || "Sorry, we couldn't find any data to display."}</p>
    </div>
  );
};

export default NoDataFound;
