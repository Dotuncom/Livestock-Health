//src/Pages/Farmer/Profile.jsx
import React from "react";
import AnimalInfoCard from "../../components/AnimalInfoCard";
import ReportHistoryCard from "../../components/ReportHistoryCard";
import ActionButtons from "../../components/ActionButtons";

const Profile = () => {
  return (
    <div className=" bg-white/60 shadow-[0px_4px_17px_11px_rgba(0,0,0,0.03) p-[75px]">
      <div className="p-4 ">
        <div className="flex flex-col lg:flex-row gap-6">
          <AnimalInfoCard />
          <ReportHistoryCard />
        </div>
        <div className="flex justify-end mt-[32px]">
        <ActionButtons />
        </div>
      </div>
    </div>
  );
};

export default Profile;
