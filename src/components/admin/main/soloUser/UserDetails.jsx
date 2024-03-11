import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../../axios/axiosInstance";
import { Avatar, Button } from "@nextui-org/react";
import { toast as hottoast } from "react-hot-toast";
import { ADMIN_USER_ACCESS } from "../../../../constants/admin_urls";
import avatar from "../../../../assets/images/avatar.jpg";
import { IMAGE_URL } from "../../../../constants/urls";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

function UserDetails() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    axiosInstance
      .post(`${ADMIN_USER_ACCESS}/user_details/${userId}`)
      .then((res) => {
        setUser(res?.data?.user);
        console.log("res in user details", res);
      })
      .catch((err) => {
        console.log("error at getting user details : ", err);
      });
  }, []);

  const showUserReports = () => {
    navigate(`/admin/user/reports/${userId}`);
  };

  const updateUserActive = () => {
    axiosInstance.post(`${ADMIN_USER_ACCESS}/update_active/${userId}`)
    .then((res) => {
      if (res?.status===200){
        hottoast.success("Status Updated")
        setUser({...user, is_active : !user.is_active})
       
      }
    })
    .catch((err) => {
      hottoast.error("Unable to update user status")
      console.log("error at getting user details : ", err);
    })
    .finally(()=>{

    })
  }

  return (
    <>
      {user ? (
        <>
          <div className="flex items-center justify-between border border-gray-200 p-4 rounded-lg shadow-md">
            {/* Left Div */}
            <div className="flex items-center space-x-4">
              {/* User Image */}
              <div className="relative w-20 h-20">
                <Avatar
                  className="w-20 h-20 text-large"
                  src={
                    user?.profile_picture
                      ? user.profile_picture.startsWith("http")
                        ? user.profile_picture
                        : `${IMAGE_URL}${user.profile_picture}`
                      : avatar
                  }
                />
              </div>
              {/* User Details */}
              <div>
                <h2 className="text-lg font-semibold">{user?.name}</h2>
                <p className="text-sm text-gray-500">{`Age: ${user?.age}`}</p>
                <p className="text-sm text-gray-500 py-3">
                  {user.is_active ? (
                    <button className="btn btn-solid-success">Active</button>
                  ) : (
                    <button className="btn btn-solid-error">Deactivated</button>
                  )}
                </p>
              </div>
            </div>
            <div className="flex flex-col items-stretch">
              <Button onClick={showUserReports} className="mb-4">
                Reports
              </Button>
              {!user.is_active ? (
                <button className="btn btn-solid-success" onClick={onOpen}>
                  Activate User
                </button>
              ) : (
                <button className="btn btn-solid-error" onClick={onOpen}>
                  Block User
                </button>
              )}
            </div>
          </div>
          <div className="border border-gray-200 p-4 rounded-lg shadow-md mt-4 flex justify-evenly">
            <ul className="">
              <li className="flex">
                <strong>User ID:</strong>
                <span className="ml-2">{user.id}</span>
              </li>
              <li className="flex">
                <strong>Email Address:</strong>
                <span className="ml-2">{user.email}</span>
              </li>
            </ul>
            <ul className="">
              <li className="flex">
                <strong>Location :</strong>
                <span className="ml-2">{user.location}</span>
              </li>
              <li className="flex">
                <strong>Joined At:</strong>
                <span className="ml-2">{user.created_at}</span>
              </li>
            </ul>
          </div>
        </>
      ) : (
        <div className="animate-pulse">
          <div className="h-16 p-2 bg-gray-200 mt-3 mx-4 mb-6 rounded"></div>
        </div>
      )}

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                <p>
                  {user.is_active
                    ? "Are you sure want to BLOCK user ?"
                    : "Are you sure want to UNBLOCK the user ?"}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color={user.is_active ? "danger": "default"} variant="bordered" onPress={onClose}>
                  Close
                </Button>
                <Button color={user.is_active ? "danger": "success"} variant="solid" onClick={updateUserActive} onPress={onClose}>
                  <p>{user.is_active ? "Block" : "Unblock"}</p>
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

export default UserDetails;
