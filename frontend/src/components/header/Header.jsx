import React, { useState, useEffect } from "react";
import Link from "../shared/link/Link";

import Logo from "../../assets/eco-logo.png";
import { Link as DefaultLink } from "react-router-dom";
import Button from "../shared/button/Button";
import Overlay from "../shared/overlay/Overlay";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Modal from "../shared/modal/Modal";
import { motion } from "framer-motion";
import {
  successNotification,
  errorNotification,
} from "../shared/notifications/Notification";
import { IoMenu } from "react-icons/io5";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Logout as LogoutAction } from "../../store/userSlice";
import Cookies from "js-cookie";

const Header = () => {
  const [activateSignup, setActivateSignup] = useState(false);
  const [activateLogin, setActivateLogin] = useState(false);

  const isLoggedIn = useSelector((store) => store?.user?.isLoggedIn);

  const closeSignUpModal = () => {
    setActivateSignup(false);
  };
  const closeLoginUpModal = () => {
    setActivateLogin(false);
  };
  const dispatch = useDispatch();
  // logoutHandler
  const logoutHandler = () => {
    // Remove the cookie with the same options
    Cookies.remove("access_token", { path: "/" });

    dispatch(LogoutAction());
  };

  return (
    <>
      <motion.header
        className="bg-darkGreen text-white py-4"
        initial={{
          top: "-100vh",
          opacity: 0,
        }}
        animate={{
          top: 0,
          opacity: 1,
          transition: {
            duration: 0.7,
          },
        }}
      >
        <div className="container mx-auto flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold w-1/4">
            <DefaultLink to="/" className="flex items-center ">
              <img src={Logo} alt="EcoGrow-logo" className="w-10 h-10" />
              <span>EcoGrow</span>
            </DefaultLink>
          </div>

          {/* Navigation Links */}
          <nav className="w-2/4 flex flex-col absolute right-0 top-14 h-[calc(100vh-3.6rem)] md:h-auto bg-darkGreen text-black md:text-white md:flex-row md:bg-transparent md:static space-y-8 md:space-x-4 md:space-y-0 justify-center md:justify-center items-center z-50">
            <Link text="Forum" link="/forum" />
            <Link text="EcoShop" link="/ecoshop" />
            {isLoggedIn ? (
              <>
                <Link text="Dashboard" link="/dashboard/forum" />
              </>
            ) : (
              <>
                <Link text="Agronomists" link="/agronomists" />
              </>
            )}
          </nav>
          <div className="w-1/4 flex justify-end items-center gap-4">
            {isLoggedIn ? (
              <div className="flex items-center">
                <Button
                  text="Logout"
                  style="brownFilled"
                  onClick={logoutHandler}
                />
              </div>
            ) : (
              <div className="flex gap-3">
                <Button
                  text="Login"
                  style="filled"
                  onClick={() => {
                    setActivateLogin(true);
                  }}
                />
                <Button
                  text="Signup"
                  style="normal"
                  onClick={() => {
                    setActivateSignup(true);
                  }}
                />
              </div>
            )}
          </div>
          <IoMenu className="block md:hidden text-3xl cursor-pointer" />

          {/* <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            className="bg-lightSoil text-white placeholder:italic placeholder:text-white px-2 py-1 rounded-full border border-white focus:border focus:border-white"
          />
        </div> */}
        </div>
      </motion.header>
      {activateLogin && (
        <Overlay onClick={closeLoginUpModal}>
          <Modal>
            <Login onClick={closeLoginUpModal} />
          </Modal>
        </Overlay>
      )}
      {activateSignup && (
        <Overlay onClick={closeSignUpModal}>
          <Modal>
            <Signup onClick={closeSignUpModal} />
          </Modal>
        </Overlay>
      )}
    </>
  );
};

export default Header;
