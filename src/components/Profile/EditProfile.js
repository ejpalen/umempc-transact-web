import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import backIcon from "../../assets/images/back-icon.png";
import loanIcon from "../../assets/images/loan-transact-icon.png";
import cameraIcon from "../../assets/images/camera-icon.png";
import defaultProfile from "../../assets/images/defaultProfile.jpg";

//Firebase
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { imageDb } from "../../firebaseConfig";
import { db } from "../../firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

import { v4 } from "uuid";

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
  selectedEmploymentStatus,
  membershipStatus,
  employmentStatus,
  colleges,
  memberPersonalDetails,
}) => {
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(memberPersonalDetails && memberPersonalDetails[0].member_profile_image || null);
  const [selectedFileImage, setSelectedFileImage] = useState(memberPersonalDetails && memberPersonalDetails[0].member_profile_image || null);
  const [originalValues, setOriginalValues] = useState({
    address,
    contactNumber,
    email,
    college: selectedCollege,
    profileImage 
  });
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    setOriginalValues({
      address,
      contactNumber,
      email,
      college: selectedCollege,
      profileImage
    });
  }, []); 

  useEffect(() => {
    setIsChanged(
      profileImage !== originalValues.profileImage ||
      contactNumber !== originalValues.contactNumber ||
      email !== originalValues.email ||
      address !== originalValues.address ||
      selectedCollege !== originalValues.college
    );

  }, [profileImage, contactNumber, email, address, selectedCollege, originalValues]); 

  // File input handling
  const handleFileInput = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileImage(URL.createObjectURL(e.target.files[0]));
      setProfileImage(file);
      console.log(file)
    }
  };

  // Handle profile upload
  const handleProfileUpload = async () => {
    if (!profileImage) {
      console.log("No profile image selected.");
      return null; 
    }

    try {
      const imageRef = ref(imageDb, `members/${memberPersonalDetails[0].id}-${v4()}`);
      
      const snapshot = await uploadBytes(imageRef, profileImage);
      const url = await getDownloadURL(snapshot.ref);
      console.log("Uploaded image URL:", url);
      return url;
    } catch (error) {
      console.error("Error uploading image:", error); 
      return null; 
    }
  };

  // Save Changes
  const handleSaveChanges = async () => {
    try {
      const membersRef = doc(db, "members", memberPersonalDetails[0].id);
      
      const uploadedImageUrl = await handleProfileUpload(); 

      if (!uploadedImageUrl && profileImage) {
        console.error("No valid image URL returned from upload.");
        return; 
      }

      console.log(uploadedImageUrl)

      await updateDoc(membersRef, {
        member_address: address,
        member_college: selectedCollege,
        member_contact_number: contactNumber,
        member_email: email,
        member_profile_image: uploadedImageUrl || profileImage, // Use the uploaded URL or existing profileImage
      });

      setProfileImage(memberPersonalDetails && memberPersonalDetails[0].member_profile_image || null)
      setSelectedFileImage(memberPersonalDetails && memberPersonalDetails[0].member_profile_image || null)
      setOriginalValues({
        address: memberPersonalDetails && memberPersonalDetails[0].member_address,
        contactNumber : memberPersonalDetails && memberPersonalDetails[0].member_contact_number,
        email: memberPersonalDetails && memberPersonalDetails[0].member_email,
        college: memberPersonalDetails && memberPersonalDetails[0].member_college,
        profileImage : memberPersonalDetails && memberPersonalDetails[0].member_profile_image 
      })
      setIsChanged(false)
      navigate("/profile");
      console.log("Changes saved successfully!");
    } catch (error) {
      console.error("Error saving changes:", error);
    }
  };

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
        <span 
        className={`${!isChanged && 'opacity-50'}`}
        onClick={handleSaveChanges}
        >Save</span>
      </section>
      <main className=" flex-1 flex flex-col mt-14 container-with-label">
        <section className="flex flex-col gap-1  items-center">
          <label className="profile-icon opacity-100 bg-secondary rounded-full h-20 w-20 items-center flex relative cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileInput}
            />
            {profileImage && profileImage !== null && <img src={selectedFileImage !== null ? selectedFileImage : profileImage} alt="" className="rounded-full object-cover h-full w-full" /> }
            <img src={cameraIcon} alt="" /> 
            <h1 className="text-xl text-bold m-auto flex justify-center">E</h1>
          </label>
          <p className="opacity-75 mt-1">
            {memberPersonalDetails[0].member_id}
          </p>
        </section>
        <section className="flex flex-col gap-1 mt-6">
          <section className="px-4 flex flex-col">
            <label className="mb-1" htmlFor="name"
            onClick={handleProfileUpload}
            >
              Name
            </label>
            <input
              className="opacity-75"
              type="text"
              id="name"
              name="name"
              readOnly
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
             <label className="mb-1 mt-6" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Type your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                  className={`text-nowrap text-base rounded-full py-2 px-6  text-center opacity-75 ${
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
          <section className=" flex flex-col">
            <label className="pl-4 mb-1 mt-6">Employment Status</label>
            <section className="flex flex-row gap-1 overflow-y-scroll pb-1.5 px-4">
              {employmentStatus.map((status, index) => (
                <span
                  key={index}
                  className={`text-nowrap text-base rounded-full py-2 px-6 flex-1 text-center opacity-75 ${
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

export default EditProfile;
