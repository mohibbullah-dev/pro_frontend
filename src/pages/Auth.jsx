import React from "react";
import restaurantImage from "../assets/images/restaurantImage.jpg";
import logo_2 from "../assets/images/logo_2.png";
import Register from "../components/auth/Register";
import { useState } from "react";
import Login from "../components/auth/Login";
import Loader from "../components/shared/Loader";

const Auth = ({ loader, setLoader }) => {
  const [isRegistered, setIsRegistered] = useState(true);

  if (loader) return <Loader />;

  return (
    <div className="flex min-h-screen w-full overflow-y-scroll overflow-hidden">
      {/* Left Section  */}
      <div className="wl/2 relative flex items-center justify-center bg-cover">
        {/* BG Image  */}
        <img
          className="w-full h-screen object-cover"
          src={restaurantImage}
          alt="restanrant Image"
        />
        {/* blacke overley  */}
        <div className="absolute inset-0 bg-black opacity-80"></div>

        <blockquote className="absolute bottom-10 px-8 mb-10 text-2xl italic text-white">
          "Server customer the best food wieth prompt and friendly sevice in a
          welcoming atmosphere, and they'all kiip coming back."
          <br />
          <span className="block mt-4 text-yellow-400">Founder of Restro</span>
        </blockquote>
      </div>

      {/* Right Section  */}

      <div className="w-1/2 min-h-screen bg-[#1a1a1a] px-10 py-5">
        <div className="flex flex-col items-center gap-2">
          <img
            src={logo_2}
            alt="logo"
            className="h-14 w-14 border-2 rounded-full p-1"
          />
          <h1 className="text-lg font-semibold text-[#f5f5f5] tracking-wide">
            Restro
          </h1>
        </div>
        <h2 className="text-4xl text-center pb-5 mb-0 font-semibold text-yellow-400 mg-10">
          Employee Registration
        </h2>
        {/* components  */}
        {isRegistered ? <Register /> : <Login />}

        <div className="flex justify-center gap-1 mt-6">
          <p className="text-sm text-[#ababab]">
            {isRegistered
              ? "Already have an account?"
              : "Don't have an account?"}{" "}
          </p>
          <a
            onClick={() => setIsRegistered(!isRegistered)}
            className="text-yellow-400 font-semibold hover:underline"
            href="#"
          >
            {isRegistered ? "Sign in" : "Sign up"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Auth;
