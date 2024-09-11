// import { useEffect, useState } from "react";

import Profile from "../components/Profile.js";
const Dashboard = () => {

  return (
    <div className="dashboard">
        <section className="flex gap-2 items-start justify-between">
        <span>
        <h1 className="text-2xl text-bold">Dashboard</h1>
        </span>
        <Profile/>
        </section>
    </div>
  );
};

export default Dashboard;
