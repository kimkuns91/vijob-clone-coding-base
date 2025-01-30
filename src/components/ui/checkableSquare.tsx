const CheckableSquare = () => {
  return (
    <div
      className="flex-shrink-0 size-5 rounded-[3px] flex justify-center items-center group-active:outline-2 group-active:outline group-active:outline-blue-400 bg-contain bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(/icons/checkable.square.gray.svg)`,
      }}
    />
  );
};

export default CheckableSquare;
