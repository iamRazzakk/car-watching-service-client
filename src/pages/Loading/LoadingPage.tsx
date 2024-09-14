const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="flex flex-col items-center">
        <img
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExZG1nc2dtMW1hdGgxd2p3MGxnN2JxMTB1ank0ZWlrbDZheWdibTE1dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT1R9BhLErdBbj9kuA/giphy.gif"
          alt="Loading..."
          className=""
        />
        <h2 className="text-2xl font-semibold mt-4 text-blue-600">
          Loading...
        </h2>
      </div>
    </div>
  );
};

export default LoadingPage;
