"use client"
import Image from "next/image";
import {  Modal } from "antd";
import { Button } from "@nextui-org/react";
import Shot from "../../../public/images/test.jpg";
import Logo from "../../../public/images/logo.png";
import { useState } from "react";
import AuthForm from "../components/AuthForm";

const HomeScreen = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

 

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
0
  return (
    <div className="mt-6 bg-stone-950">
      <Image
        title="JoMessanger"
        src={Logo}
        alt=""
        height={42}
        width={42}
        className="cursor-pointer object-contain absolute left-4 top-6 md:left-20 md:top-16"
      />
      <div className="absolute left-4 md:left-20 mt-24 bg-stone-950">
        <h1 className="text-7xl gradient-text max-w-md font-bold justify-center mt-[10%]">
          Hang out anytime, anywhere
        </h1>
        <p className="text-xl text-slate-200 max-w-lg justify-center mt-[3rem]">
          Messenger makes it easy and fun to stay close to your favorite people.
        </p>

        <Button color="gradient" size="lg" className="mt-9" onClick={showModal}>
          SignIn / SignUp
        </Button>
      </div>
      <Image
        src={Shot}
        alt=""
        height={400}
        width={650}
        className="object-contain absolute right-4 top-4 hidden lg:block md:block lg:right-10  lg:top-6 md:top-[70%] "
      />
     <Modal
  visible={isModalOpen}
  onCancel={handleCancel}
  footer={null}
  centered
  className="custom-modal"
  style={{ backgroundColor: '#0c0a09' }}
  width="90%"
  
>
  <div className="modal-content">
    <style>
      {`
      .custom-modal .ant-modal .ant-modal-content {
        background-color: #0c0a09 !important;
      }
      `}
    </style>
    <AuthForm />
  </div>
</Modal>

    </div>
  );
};

export default HomeScreen;
