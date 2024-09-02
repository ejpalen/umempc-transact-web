import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/images/back-icon.png";
import loanIcon from "../../assets/images/loan-transact-icon.png";
import cameraIcon from "../../assets/images/camera-icon.png";

const EditProfile = ({
  name,
  setName,
  address,
  setAddress,
  contactNumber,
  setContactNumber,
  email,
  setEmail,
  selectedCollege,
  setSelectedCollege,
  selectedMembershipStatus,
  setSelectedMembershipStatus,
  selectedEmploymentStatus,
  setSelectedEmploymentStatus,
  membershipStatus,
  employmentStatus,
  colleges,
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.querySelector("meta[name='theme-color']").content = "#ffffff";
  }, []);

  return (
    <div className="wrapper text-default full-screen-100">
      <section className="header p-4 flex justify-between items-center gap-2">
        <img
          src={backIcon}
          alt=""
          className="h-6 p-1 cursor-pointer absolute"
          onClick={() => {
            navigate("/profile");
          }}
        />
        <h2 className="flex-1 text-center text-xl"></h2>
        <span className="opacity-50">Save</span>
      </section>
      <main className=" flex-1 flex flex-col mt-14 container-with-label">
        <section className="flex flex-col gap-1  items-center">
          <span className="profile-icon  bg-secondary rounded-full h-20 w-20 items-center flex relative">
            <img src={cameraIcon} alt="" />
            <h1 className="text-xl text-bold m-auto flex justify-center">E</h1>
          </span>
          <p className="opacity-75 mt-1">K11940758</p>
        </section>
        <section className="flex flex-col gap-1 mt-6">
          <section className="px-4 flex flex-col">
            <label className="mb-1" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Type your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="mb-1 mt-6" htmlFor="contactNumber">
              Contact Number
            </label>
            <input
              type="tel"
              id="contactNumber"
              name="contactNumber"
              placeholder="Type your contact number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
            <label className="mb-1 mt-6" htmlFor="address">
              Address
            </label>
            <textarea
              className="min-h-14"
              type="text"
              id="address"
              name="address"
              placeholder="Type your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <label className="mb-1 mt-6" htmlFor="college">
              College
            </label>
            <select
              name="college"
              id="college"
              defaultValue={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
            >
              {colleges.map((college, index) => (
                <option key={index} value={college}>
                  {college}
                </option>
              ))}
            </select>
          </section>
          <section className="px-4 flex flex-col">
            <label className="mb-1 mt-6">Membership Status</label>
            <section className="flex flex-row gap-1">
              {membershipStatus.map((status, index) => (
                <span
                  key={index}
                  className={`text-nowrap text-base rounded-full py-2 px-6  text-center ${
                    selectedMembershipStatus === status
                      ? "button-1"
                      : "button-2"
                  }`}
                  onClick={() => setSelectedMembershipStatus(status)}
                >
                  {status}
                </span>
              ))}
            </section>
          </section>
          <section className=" flex flex-col">
            <label className="pl-4 mb-1 mt-6">Employment Status</label>
            <section className="flex flex-row gap-1 overflow-y-scroll pb-1.5 px-4">
              {employmentStatus.map((status, index) => (
                <span
                  key={index}
                  className={`text-nowrap text-base rounded-full py-2 px-6 flex-1 text-center ${
                    selectedEmploymentStatus === status
                      ? "button-1"
                      : "button-2"
                  }`}
                  onClick={() => setSelectedEmploymentStatus(status)}
                >
                  {status}
                </span>
              ))}
            </section>
          </section>
        </section>
      </main>
    </div>
  );
};

export default EditProfile;
