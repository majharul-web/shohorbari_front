import ReactLoading from "react-loading";

interface Iprops {
  staticProp?: boolean;
}

const PageLoader = ({ staticProp }: Iprops) => {
  return (
    <div
      className={`${
        staticProp
          ? "fixed top-0 left-0 bottom-0 right-0 w-full h-full flex justify-center items-center z-[9999] bg-white/40"
          : "flex justify-center items-center"
      }`}
    >
      <ReactLoading type='spinningBubbles' color='#567DF2' height={40} width={40} />
    </div>
  );
};

export default PageLoader;
