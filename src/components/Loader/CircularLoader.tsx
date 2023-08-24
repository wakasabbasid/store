const CircularLoader = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  );
};

export default CircularLoader;
