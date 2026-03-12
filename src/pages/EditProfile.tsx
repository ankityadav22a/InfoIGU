import React, { useState, useEffect, useRef } from "react";
import * as constants from "../components/constants";
import ShowData from "../components/ShowData";
import ShowProfession from "../components/ShowProfession";
import ShowPublication from "../components/ShowPublication";
import ShowResearch from "../components/ShowResearch";

interface ProfileData {
  name: string;
  profession: string;
  department: string;
  email: string;
  phone: string;
  // Add other editable fields here if needed
}

interface EditProfileProps {
  researchinterests?: string;
  biosketch?: string;
  research?: string;
  honors?: string;
  students?: string;
  miscellaneous?: string;
}
const professionData = [
  { profession: "B.Tech in Computer Science", dateRange: "2005-2009" },
  { profession: "M.Tech in Computer Science", dateRange: "2009-2011" },
  { profession: "Ph.D. in Computer Science", dateRange: "2011-2015" },
];
const publicationData = [
  { Publication: "Paper 1: Deep Learning for Computer Vision" },
  { Publication: "Paper 2: Natural Language Processing Advances" },
  { Publication: "Paper 3: AI in Healthcare" },
];

const EditProfile = (props: EditProfileProps) => {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    profession: "",
    department: "",
    email: "",
    phone: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  // Simulate data fetching on component mount
  const fetchedDataOG = useRef<ProfileData | null>(null); // Use useRef to store initial data
  useEffect(() => {
    // In a real application, you would fetch this data from an API
    // e.g., fetch('/api/profile').then(res => res.json()).then(data => setProfileData(data));
    const initialData: ProfileData = {
      name: "Pooja Singh",
      profession: "Assistant Professor",
      department: "Computer Science Dept.",
      email: "pooja.singh@example.com",
      phone: "+91-9876543210",
    };
    fetchedDataOG.current = initialData;
    setProfileData(initialData);
  }, []); // Empty dependency array means this effect runs once after the initial render

  const titleStyleh2 = "text-2xl text-[#0067B3] mt-2 mb-4";
  const titleStyleh3 = "text-xl  mb-4";
  const handleExit = () => {
    if (fetchedDataOG.current) {
      setProfileData(fetchedDataOG.current); // Reset to original data on cancel
    }
    setIsEditing(false);
    // Optionally, you could reset profileData to the original fetched data here if you want to discard changes
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const createJsonProfileData = (data: ProfileData) => {
    return JSON.stringify(data, null, 2); // Pretty print JSON with 2 space indent
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Here you would typically send the profileData to your backend API to save changes
    console.log("Saving changes:", profileData);
    console.log("JSON Profile Data:", createJsonProfileData(profileData));
    setIsEditing(false); // Exit editing mode after saving
    // You might want to add error handling or a success notification here
  };

  return (
    <>
      <form>
        <div
          className="flex w-4/5 bg-[#1A365D] min-h-2/5 text-white m-auto rounded-b-2xl"
          style={{ padding: "2vh 5vw" }}
        >
          <div className="w-2/5 m-auto">
            <img
              className="rounded-2xl shadow-2xl w-3/5 m-auto "
              src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile Pic"
            />
          </div>
          <div className="w-3/5 flex flex-col justify-between gap-3 align-middle ">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  className="ml-2 text-white bg-blue-400 p-1 rounded" // Added styling for clarity
                  value={profileData.name}
                  name="name"
                  onChange={handleChange}
                />
              ) : (
                <span className="ml-2">{profileData.name}</span>
              )}
              <div className="place-items-end lg:w-1/4 sm:w-2/5">
                {isEditing ? (
                  <input
                    type="text"
                    className="mb-4 text-white p-1 rounded bg-blue-400" // Added styling for clarity
                    value={profileData.profession}
                    name="profession"
                    onChange={handleChange}
                  />
                ) : (
                  <p className="mb-4"> - {profileData.profession}</p>
                )}
              </div>
            </div>
            <div>
              <span className="flex items-center gap-2">
                <img
                  className="w-4"
                  src={constants.DEPARTMENT_SVG_WHITE}
                  alt="Department: "
                />
                {isEditing ? (
                  <input
                    type="text"
                    className="text-white p-1 rounded bg-blue-400" // Added styling for clarity
                    value={profileData.department}
                    name="department"
                    onChange={handleChange}
                  />
                ) : (
                  profileData.department
                )}
              </span>
              <span className="flex items-center gap-2">
                <img
                  className="w-4"
                  src={constants.EMAIL_SVG_WHITE}
                  alt="E-Mail: "
                />
                {isEditing ? (
                  <input
                    type="email" // Use type="email" for better validation
                    className="text-white p-1 rounded bg-blue-400" // Added styling for clarity
                    value={profileData.email}
                    name="email"
                    onChange={handleChange}
                  />
                ) : (
                  profileData.email
                )}
              </span>
              <span className="flex items-center gap-2">
                <img
                  className="w-4"
                  src={constants.PHONE_SVG_WHITE}
                  alt="Phone: "
                />
                {isEditing ? (
                  <input
                    type="tel" // Use type="tel" for phone numbers
                    className="text-white p-1 rounded bg-blue-400" // Added styling for clarity
                    value={profileData.phone}
                    name="phone"
                    onChange={handleChange}
                  />
                ) : (
                  profileData.phone
                )}
              </span>
            </div>
            <p className="text-[#cfdbe6] text-sm "></p>
            <div className="flex justify-end gap-2">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Save Changes
                  </button>
                  <button
                    type="button"
                    onClick={handleExit}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
      <div className="w-3/5 bg-[#f0f0f0] p-2 text-black hide-scrollbar min-h-20 m-auto  rounded-2xl overflow-y-auto ">
        {props.researchinterests && (
          <>
            <h2 className={titleStyleh2} id="researchinterests">
              RESEARCH INTERESTS
            </h2>
            <p>{props.researchinterests}</p>
          </>
        )}

        {props.biosketch && (
          <>
            <h2 className={titleStyleh2}>BIO SKETCH</h2>
            <h3 className={titleStyleh3}>Educational Details</h3>
            <ShowProfession data={professionData} />
            <h3 className={titleStyleh3}>Proffessional Background</h3>
            <ShowProfession data={professionData} />
          </>
        )}
        {props.research && (
          <>
            <h2 className={titleStyleh2}>RESEARCH</h2>
            <ShowResearch />
            <h3 className={titleStyleh3}>Publications</h3>
            <ShowPublication data={publicationData} />
            <h3 className={titleStyleh3}>Patents</h3>
            <ShowData />
            <h3 className={titleStyleh3}>Books</h3>
            <ShowData />
            <h3 className={titleStyleh3}>Collaborations</h3>
            <ShowData />
          </>
        )}
        {props.honors && (
          <>
            <h2 className={titleStyleh2}>HONORS & AWARDS</h2>
            <h3 className={titleStyleh3}>Honors</h3>
            <ShowProfession data={professionData} />
            <h3 className={titleStyleh3}>Memberships</h3>
            <ShowProfession data={professionData} />
          </>
        )}
        {props.students && (
          <>
            <h2 className={titleStyleh2}>STUDENTS</h2>
            <h3 className={titleStyleh3}>Supervisions</h3>
            <ShowProfession data={professionData} />
            <h3 className={titleStyleh3}>Associate Scholars</h3>
            <ShowProfession data={professionData} />
          </>
        )}
        {props.miscellaneous && (
          <>
            <h2 className={titleStyleh2}>MISCELLANEOUS</h2>
            <h3 className={titleStyleh3}>Supervisions</h3>
            <ShowProfession data={professionData} />
            <h3 className={titleStyleh3}>Associate Scholars</h3>
            <ShowProfession data={professionData} />
          </>
        )}
      </div>
    </>
  );
};

export default EditProfile;
