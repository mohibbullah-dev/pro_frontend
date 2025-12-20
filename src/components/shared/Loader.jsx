import React from "react";
import { Oval } from "react-loader-spinner";
const Loader = () => {
  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#1f1f1f]">
      <Oval
        visible={true}
        height="50"
        width="50"
        color="#F6B100"
        ariaLabel="oval-loading"
        secondaryColor="#F6B100"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};
// , "#f47e60", "#f8b26a", "#abbd81", "#849b87"

export default Loader;
