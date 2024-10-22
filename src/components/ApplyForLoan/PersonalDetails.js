import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/back-icon.png";

const PersonalDetails = ({
  name,
  setName,
  address,
  setAddress,
  contactNumber,
  setContactNumber,
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

  // State variable to hold a boolean indicating if any of the fields are filled
  const [isAnyFieldFilled, setIsAnyFieldFilled] = useState(false);

  useEffect(() => {
    // Check if name, contactNumber, or address are not empty
    if (name !== "" || contactNumber !== "" || address !== "") {
      setIsAnyFieldFilled(true); // Set to true if any field is filled
    } else if (name === "" || contactNumber === "" || address === ""){
      setIsAnyFieldFilled(false); // Set to false if all fields are empty
    }
  }, [name, contactNumber, address]); // Dependencies to trigger the effect

  return (
    <div className="wrapper text-default">
      <div className="support-bottom-nav fixed bottom-0 left-0 right-0 py-4 px-0 pt-0 z-10">
        <nav className="flex pt-3 items-center px-4 gap-2 flex-col">
          <section className="flex gap-2 bg-pink-50 flex-1 w-full">
            <span className="h-1 flex-1 w-full bg-inactive opacity-15 rounded-full"></span>
            <span className="h-1 flex-1 w-full bg-primary rounded-full"></span>
            <span className="h-1 flex-1 w-full bg-inactive opacity-15 rounded-full"></span>
          </section>
          <span
            onClick={() => navigate(`${isAnyFieldFilled ? "/apply-for-loan/review-details" : "#"}`)}
            className={`text-white text-bold p-4 flex-1 text-center bg-primary w-full rounded-full ${!isAnyFieldFilled && 'opacity-50 cursor-not-allowed'}`}
          >
            Next
          </span>
        </nav>
      </div>
      <section className="header p-4 flex justify-between items-center gap-2 ">
        <img
          src={backIcon}
          alt=""
          className="h-6 p-1 cursor-pointer absolute"
          onClick={() => {
            navigate("/apply-for-loan/loan-details");
          }}
        />
        <h2 className="flex-1 text-center text-xl">Personal Details</h2>
      </section>
      <main className="flex-1 flex flex-col mt-20 container-with-label pb-40">
        <section className="flex flex-col gap-1">
          <section className="px-4 flex flex-col">
            <label className="mb-1" htmlFor="name">
              Name
            </label>
            <input
            className="opacity-75"
              type="text"
              id="name"
              name="name"
              placeholder="Type your name"
              value={name}
              required
              readOnly
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
              required
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
              required
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
            <section className="flex flex-row gap-1 opacity-75">
              {membershipStatus.map((status, index) => (
                <span
                  key={index}
                  className={`text-nowrap text-base py-2 px-6 text-center cursor-not-allowed  ${
                    selectedMembershipStatus === status
                      ? "button-1"
                      : "button-2"
                  }`}
                >
                  {status}
                </span>
              ))}
            </section>
          </section>
          <section className="flex flex-col">
            <label className="pl-4 mb-1 mt-6">Employment Status</label>
            <section className="flex flex-row gap-1 overflow-y-scroll pb-1.5 px-4 opacity-75">
              {employmentStatus.map((status, index) => (
                <span
                  key={index}
                  className={`text-nowrap text-base py-2 px-6 flex-1 text-center cursor-not-allowed ${
                    selectedEmploymentStatus === status
                      ? "button-1"
                      : "button-2"
                  }`}
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

export default PersonalDetails;
