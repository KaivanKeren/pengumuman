/* eslint-disable @next/next/no-img-element */
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return (
    <nav className="bg-slate-800 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center px-3">
          <button
            className="  transition duration-300"
            onClick={handleHome}
          >
            <div className="text-white text-lg font-semibold mr-4 cursor-pointer flex">
              <Image
                src="/cropped-SMKN-2-Kudus.png"
                width={45}
                height={30}
                alt="Logo SMK"
              />
              <a href="/" className="hidden md:block m-2">
                SMK Negeri 2 Kudus
              </a>
            </div>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
