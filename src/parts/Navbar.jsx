import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaRegFileAlt } from "react-icons/fa";
import { IoIosGlasses } from "react-icons/io";
import { IoPeopleSharp } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import { MdContactMail } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { useData } from "../parts/Memory.jsx";

function Navbar() {
  const navigate = useNavigate();
  const { profile, catalog, updateProfile } = useData();
  const { editor, forename, uid, cart } = profile;
  const [cartCount, setCartCount] = useState(0);
  const logged = localStorage.getItem("uid") !== "x" && localStorage.getItem("uid") !== "" && localStorage.getItem("uid") !== null;

  useEffect(() => {
    function calculateCart() {
      let number = 0;
      if (logged) {
        if (cart.length > 0) {
          number = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
      } else {
        let unLoggedCart = JSON.parse(localStorage.getItem("cart"));
        if (unLoggedCart !== null) {
          number = unLoggedCart.reduce((sum, item) => sum + item.quantity, 0);
        }
      }

      return number;
    }

    setCartCount(calculateCart());
  }, [catalog, logged]);

  return (
    <div className="flex justify-between bg-gray-100 shadow-md">
      <div className="ml-5 flex w-[350px] items-center">
        <Link to="/">
          <img className="h-20" src="logo2.png" alt="Logo" />
        </Link>
      </div>
      <div
        className="flex h-20 w-[680px] justify-center
        rounded-b-xl bg-gray-200 font-bold text-white "
      >
        <NavbarIcon icon={<FaHome size="30" />} href="/" text="Úvod" />
        <NavbarIcon icon={<IoIosGlasses size="30" />} href="/products" text="Brýle" />
        <NavbarIcon icon={<FaRegFileAlt size="26" />} href="/blog" text="Blog" />
        <NavbarIcon icon={<IoPeopleSharp size="30" />} href="/about-us" text="O nás" />
        <NavbarIcon icon={<MdContactMail size="30" />} href="/contact" text="Kontakt" width="long" />
      </div>
      <div className="mr-5 flex w-[350px] items-center justify-end">
        {editor && (
          <div className="flex">
            <button className="my-2 mr-4 rounded-lg border border-red-600 px-4  font-semibold text-red-600" onClick={() => updateProfile("editor", false)}>
              Disable
            </button>
            <button className="my-2 mr-4 rounded-lg bg-black px-4  font-semibold text-white" onClick={() => navigate("/dev")}>
              Dev
            </button>

            <p className="mr-5 flex flex-col font-bold">Editor Mode</p>
          </div>
        )}
        <Link className="group relative mr-5 flex flex-col items-center " to="/cart">
          <BsCart3 className="z scale-75 duration-150 group-hover:translate-y-2 group-hover:scale-100" size="40" />
          <div className="absolute left-7 top-0 flex items-center justify-center duration-150 group-hover:translate-x-[-16px] group-hover:translate-y-[7px]">
            <div className="flex h-5 w-5 items-center justify-center rounded-lg bg-red-600">
              <p className="w-8 text-center text-xs font-bold text-white">{cartCount}</p>
            </div>
          </div>
          <p className="text-center font-bold duration-150 group-hover:translate-y-4 group-hover:text-transparent">košík</p>
        </Link>
        <Link className="group flex w-16 flex-col items-center" to="/account">
          <CgProfile className="scale-75 duration-150 group-hover:translate-y-2 group-hover:scale-100" size="40" />
          <p className="text-center font-bold duration-150 group-hover:translate-y-4 group-hover:text-transparent">{logged === false ? "účet" : forename}</p>
        </Link>
      </div>
    </div>
  );
}

const NavbarIcon = ({ icon, href, text = "Produkty", width = "short" }) => {
  const location = useLocation();
  const widthPalette = {
    short: "w-[90px]",
    medium: "w-[105px]",
    long: "w-[115px]",
  };

  function currentPage() {
    const pathname = location.pathname;
    let currentIconPathname;

    switch (icon.type.name) {
      case "FaHome":
        currentIconPathname = "/";
        break;
      case "IoIosGlasses":
        currentIconPathname = "/products";
        break;
      case "FaRegFileAlt":
        return pathname.startsWith("/blog") ? { color: "rgb(70,156,248)" } : {};
      case "IoPeopleSharp":
        currentIconPathname = "/about-us";
        break;
      case "MdContactMail":
        currentIconPathname = "/contact";
        break;
      default:
        currentIconPathname = "different";
        break;
    }

    return pathname === currentIconPathname ? { color: "rgb(70,156,248)" } : {};
  }

  return (
    <div className="flex w-[140px] items-center justify-center ">
      <Link className="group relative flex flex-col items-center justify-center" to={href}>
        <div className="flex items-center">
          <p className="mr-2 whitespace-nowrap text-xl text-black duration-300 group-hover:text-brand-blue" style={currentPage()}>
            {text}
          </p>
          <div className="text-black">{icon}</div>
        </div>
        <div className="absolute left-auto top-[34px] h-[3px] w-[0px] rounded-full bg-transparent group-hover:w-[90px] group-hover:bg-white group-hover:duration-300 group-active:bg-blue-300"></div>
      </Link>
    </div>
  );
};

export default Navbar;
