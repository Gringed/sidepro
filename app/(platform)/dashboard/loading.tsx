const Loading = () => {
  return (
    <>
      <div className="absolute right-1/2 bottom-1/2 transform translate-x-1/2 translate-y-1/2">
        <div className="p-4 bg-gradient-to-tr animate-spin from-primary to-green-500 via-black rounded-full">
          <div className="bg-background rounded-full">
            <div className="w-24 h-24 rounded-full"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Loading;
