import React, { useEffect, useState } from "react";
import { userAuth } from "../../context/AuthContext.js";
import { userData } from "../../context/UserContext.js";
import getCsrf from "../../service/auth/csrf.js";
import Cookies from "universal-cookie";

export default function EditProfile(props) {
  const [NickVal, setNickValue] = useState("null");
  const [AddVal, setAddValue] = useState("null");

  const { user } = userAuth();
  const { updateProfile, atalay } = userData();

  const cookie = new Cookies();
  const id = cookie.get("id");

  const popup = () => {
    props.toggle();
  };
  const closePopup = () => {
    props.close(AddVal, NickVal);
  };
  const EditProfileH = () => {
    updateProfile(id, AddVal, NickVal);
    atalay(AddVal);
  };

  useEffect(() => {
    getCsrf();
  }, []);
  return (
    <>
      <div className="w-full  popup-edit  absolute flex justify-center aligin-center flex-col pt-5  ">
        <div onClick={popup} className="absolute z-3 top-1 right-3">
          <svg
            onChange={closePopup}
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 svg-edit"
            fill="none"
            viewBox="0 0 24 24"
            stroke="black"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="card-bg  code-bg-edit h-full"></div>
        <div className="profile-image-card-edit">
          {!user.profile_image ? null : (
            <img
              className="rounded-full profile-image-card-edit"
              src={user.profile_image}
              width={100}
              height={100}
            />
          )}
          <div className="add none"></div>
        </div>
        <div className="w-full flex justify-center align-center flex-col  relative s  p-10 margin-auto  ">
          <input
            type="text"
            className="atalayaskım bg-slate-700 p-4 w-full"
            placeholder={user.name}
            onChange={(e) => setNickValue(e.target.value)}
          />
          <input
            type="text"
            className="atalayaskım content-edit  h-24 p-10 mt-5 w-full"
            placeholder="Açıklama"
            onChange={(e) => setAddValue(e.target.value)}
          />
          <div className="social-media-link"></div>
          <button
            onClick={EditProfileH}
            className="block w-42 hover:bg-black  çido border-2 border-black text-black focus:ring-4 mt-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Kaydet
          </button>
        </div>
      </div>
    </>
  );
}
