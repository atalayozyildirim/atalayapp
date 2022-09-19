import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { userAuth } from "../../context/AuthContext.js";
import Cookies from "universal-cookie";
import Navbar from "../navbar/Navbar.js";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";

export default function ProfilDetail() {
  const [userData, setUser] = useState({});

  const cookie = new Cookies();

  const { logoutProccsess } = userAuth();
  const { id } = useParams();
  const navigate = useNavigate();
  const userId = cookie.get("id");
  const token = cookie.get("acsess_token");
  const getUser = async () => {
    const data = await axios
      .get(`/api/user/profile/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .catch((err) => {
        toast.error(
          "Upps sunucu hata verdi tekrar giriş yap ? Tamam yönlendiriyorum ."
        );
        logoutProccsess();
      });
    const res = Object.assign(data.data.profile[0]);
    setUser(res);
  };
  useEffect(() => {
    if (userId === id) {
      navigate("/profile");
    }
    getUser();
  }, []);
  return (
    <>
      <Navbar />
      <div className="flex relative overflow-auto bg-profile h-full w-full">
        <ToastContainer />
        <Link to="/home" replace>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 relative exit left-36 top-5 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </Link>
        <div className="relative profile-a12A AtA11">
          <div className="flex w-full flex-col relative">
            <div className="card-bg profile-a12C "></div>
            <div className="profile-image-card">
              {!userData.image ? null : (
                <img
                  className="rounded-full"
                  src={userData.image}
                  width={100}
                  height={100}
                />
              )}
            </div>
            <div className="flex flex-wrap">
              <div className="text-xl text-bold profile-text"></div>
              <div className="profile-content relative">{userData.content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
