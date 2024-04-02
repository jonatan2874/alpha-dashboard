import React, { useContext } from "react";

//icons
import {
  RiNotification3Line,
  RiArrowDownSLine,
  RiSettings3Line,
  RiLogoutCircleRLine,
  RiThumbUpLine,
  RiChat3Line,
} from "react-icons/ri";
import { HiSun, HiOutlineMoon } from "react-icons/hi";

import { Menu, MenuItem, MenuButton } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth";
import BtnProfile from "../../components/ui/BtnProfile";

const Header = () => {
  const { user, logout, theme, changeTheme } = useContext(AuthContext);

  const onLogout = () => {
    logout();
  };

  const onChangeTheme = () => {
    changeTheme();
  };

  return (
    <header className="h-[7vh] w-full border-b border-secondary-100 p-8 flex items-center justify-end">
      <nav className="flex items-center gap-x-2">
        <BtnProfile
          nombre={user.name}
          alt="profile"
          img="https://res.cloudinary.com/samuelrm5/image/upload/c_scale,h_100,w_100/plataforma/wdz7ydlap8heqmgyzyy4.jpg"
          options={[
            {
              label: (
                <div className="flex gap-3 items-center px-3 bg-red-500 rounded p-2 text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5l-5 5Z"
                    />
                  </svg>
                  Cerrar sesión
                </div>
              ),
              event: onLogout,
            },
          ]}
        />
        <button
          onClick={onChangeTheme}
          className="hover:bg-secondary-100 text-secondary-50 p-2 rounded-lg"
        >
          {theme == "dark" ? (
            <HiSun className="text-2xl" />
          ) : (
            <HiOutlineMoon className="text-2xl" />
          )}
        </button>
      </nav>
    </header>
  );
};

export default Header;
