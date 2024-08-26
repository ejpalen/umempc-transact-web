import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import backIcon from "../../assets/images/back-icon.png";

const Withdraw = ({}) => {
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
            navigate("/home");
          }}
        />
        <h2 className="flex-1 text-center text-xl">Withdraw</h2>
      </section>
      <main className=" flex-1 flex flex-col mt-14 px-4">
        <section className="flex flex-col gap-1">
          <h1>Withdraw Content</h1>
        </section>
      </main>
    </div>
  );
};

export default Withdraw;
