import { useEffect, useState } from "react";

import Profile from "../components/Profile";

const SettingsAndConfigurations = () => {

  return (
    <div className="dashboard">
        <section className="flex gap-2  justify-between">
        <span>
        <h1 className="text-2xl text-bold">Settings & Configurations</h1>
        </span>
        <Profile/>
        </section>
    </div>
  );
};

export default SettingsAndConfigurations;
