import React, { useEffect, useState } from "react";
import { RiVerifiedBadgeFill } from "@remixicon/react";
import { BsStars } from "react-icons/bs";
import { FaQuoteRight } from "react-icons/fa6";
import { Button, Tooltip } from "@nextui-org/react";
import Drinks from "../badges/Drinks";
import DatingPurpose from "../badges/DatingPurpose";
import Smoking from "../badges/Smoking";
import Workout from "../badges/Workout";
import ZodiacSign from "../badges/ZodiacSign";
import gradientImage from "../../assets/images/gradient background.jpg";
import maleDummy from "../../assets/images/male-dummy-image.jpg";
import femaleDummy from "../../assets/images/female-dummy-image.jpg";
import nuetralDummy from "../../assets/images/nuetral-dummy-image.jpg";
import Height from "../badges/Height";
import Gender from "../badges/Gender";
import "../../assets/styles/heart.css";
import "../../assets/styles/carouselsAnimation.css";
import heart from "../../assets/images/pink_heart.png";
import loadingBg from "../../assets/images/huddle_loading_bg.jpg";
import limitBg from "../../assets/images/huddle_limit_bg.jpg";
import { toast as hottoast } from "react-hot-toast";
import { MdCancel } from "react-icons/md";
import { BsLightningFill } from "react-icons/bs";
import fake_details from "../../temp_data/user_data";
import { IMAGE_URL, POST_URL, USERS_URL } from "../../constants/urls";
import UserSettings from "../userSettingsModal/UserSettings";
import axiosInstance from "../../axios/axiosInstance";
import useFetchRecommends from "../../hooks/useFetchRecommends";
import useInterest from "../../hooks/useInterest";
import { useSelector } from "react-redux";

function Display() {
  const [
    data,
    setData,
    account,
    setAccount,
    isLimitReached,
    setLimitReached,
    accountIndex,
    setAccountIndex,
    loading,
    fetchMoreUsers,
    fetchCompleted,
  ] = useFetchRecommends();
  const [handleLike, handleDislike] = useInterest();
  const [animation, setAnimation] = useState(false);
  const [slides, setSlides] = useState([]);
  const [isFollowed, setIsFollowed] = useState(false);
  const userId = useSelector(state => state.logUser.user.id)

  let counter = 0; // Counter for slider
  let lastScrollTime = 0; // Carousel scrolltime

  console.log('data = ', data)

  const handleSlideChange = (movement, liked_id = null, disliked_id = null) => {
    if (movement === "forward" && accountIndex < data?.length) {
      if (liked_id) {
        handleLike(liked_id);
      }

      if (disliked_id) {
        handleDislike(disliked_id);
      }

      setIsFollowed(false)
      setAccountIndex((prevState) => prevState + 1);
      setAnimation(true);
      setTimeout(() => {
        setAnimation(false);
      }, 500);
      setAccount(data[accountIndex]);
      console.log("a/c index =", accountIndex);

      if (!isLimitReached && accountIndex === data?.length - 5) {
        console.log("calling for fetching more users");
        fetchMoreUsers();
      }

      if (data?.length > 20) {
        let accounts = data;
        const sliced_accounts = accounts.slice(10);
        setData(sliced_accounts);
        setAccountIndex((prevState) => prevState - 10);
      }

      console.log("account = ", account?.user_id, account?.name);
    } else if (movement === "backward" && accountIndex >= 0) {
      if (accountIndex === 0) {
        hottoast("Reached end", {
          icon: "❗️",
          position: "top-center",
        });
      }

      setAccountIndex((prevState) => prevState - 1);
      setAnimation(true);
      setTimeout(() => {
        setAnimation(false);
      }, 1000);

      setAccount(data[accountIndex - 1]);
      console.log("a/c index bwd =", accountIndex);
    }
    handleSlidePosition();
  };

  const handleUserFollow = (followed_id) => {
    const data = {
      'followed_id': followed_id,
      'user_id': userId, 
      'task': !isFollowed?'unfollow':'follow'
    }
    axiosInstance.post(`${POST_URL}/follow_user`, data)
    .then((res)=>{
      console.log('res of follow = ',res)
    })
    .catch((err)=>{
    console.log('err of follow = ',err)

    })
  }

  const handleSlidePosition = () => {
    slides.forEach((e) => {
      e.style.transform = `translateY(-${0 * 100}%)`;
    });
  };

  useEffect(() => {
    const carousel = document.getElementById("carousel");
    const contentSlides = carousel.querySelectorAll(".carousel-wrapper");
    setSlides(contentSlides);

    contentSlides?.forEach((slide, index) => {
      slide.style.top = `${index * 100}%`;
    });

    const slideImage = () => {
      contentSlides.forEach((e) => {
        e.style.transform = `translateY(-${counter * 100}%)`;
      });
    };

    carousel?.addEventListener("wheel", (event) => {
      event.preventDefault();

      const currentTime = Date.now();
      if (currentTime - lastScrollTime > 200) {
        lastScrollTime = currentTime;

        const delta = Math.sign(event.deltaY);
        counter += delta;
        counter = Math.max(0, Math.min(counter, contentSlides.length - 1));
        slideImage();
      }
    });
  }, [counter]);

  return (
    <>
      <div className="absolute top-2 left-5">
        <UserSettings />
      </div>

      <div
        id="carousel"
        className={`carousel-container ${
          animation ? "animate" : ""
        } relative overflow-hidden flex flex-col overflow-y-hidden w-[68%] h-[94%] rounded-[10px] bg-white shadow-2xl`}
      >
        {/* Loading screen when fetching users */}
        <div
          className={`loading-div z-20 w-full h-full relative ${
            data.length ? "hidden" : fetchCompleted ? "hidden" : "" 
          }`}
        >
          <div className="rhombus absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="circle1"></div>
            <div className="circle2"></div>
          </div>
          <img
            className=" object-cover w-screen h-screen"
            src={loadingBg}
            alt=""
          />
        </div>

        {/* Image for showing the reached limit */}
        <div
          className={`loading-div z-20 w-full h-full relative ${
            data.length ? "hidden" : ""
          }`}
        >
          <img
            className=" object-cover w-screen h-screen"
            src={limitBg}
            alt=""
          />
        </div>

        {/* Background for carousel contents */}
        <img className="blur-3xl" src={gradientImage} alt="" />

        <div className=" flex content-between absolute left-1/2 transform -translate-x-1/2 bottom-0 w-[40%] opacity-95 p-4 z-10 rounded">
          <div
            className=" mt-10 mr-5 bg-red-400 rounded-full"
            onClick={() => handleSlideChange("forward", null, account?.user_id)}
          >
            <MdCancel color="white" size={88} className="hover:text-red-500" />
          </div>
          <div className=" mb-10 bg-red-400 rounded-full opacity-0">
            <BsLightningFill size={88} className="p-2" />
          </div>
          <div className="mt-10 ml-5 p-2 bg-[#f7adcf] rounded-full flex justify-center items-center">
            <img
              className="heart"
              src={heart}
              alt=""
              onClick={() =>
                handleSlideChange("forward", account?.user_id, null)
              }
            />
          </div>
        </div>

        {/* -------------------first one------------------- */}
        <div
          className={`carousel-wrapper ${
            animation ? "fadein" : ""
          } transition duration-500 ease-in-out absolute top-0 left-0 flex items-center justify-center w-[100%]`}
        >
          {/*  Left side for images  */}
          <div className="carousel-images flex-shrink-0 w-1/2 bg-yellow-400 max-h-[100%]">
            {/*  Image items go here  */}
            <img
              src={
                account
                  ? account?.images?.length
                    ? `${IMAGE_URL}${account?.images[0]}`
                    : account?.gender ? account?.gender === 'Male' ? maleDummy : femaleDummy : nuetralDummy
                  : ""
              }
              alt="Image 1"
              className="h-[100%] w-[100%] object-center"
            />
            {/*  Add more images as needed  */}
          </div>

          {/* <!-- Right side for text or other contents --> */}
          <div className="carousel-text h-full flex justify-center items-center flex-shrink-0 w-1/2">
            <Tooltip className={`${!isFollowed ? 'hidden' : ""}`} content="Unfollow ?" offset={15}>
            <Button
              className={`top-10 right-10 absolute z-10 ${
                isFollowed
                  ? "bg-pink-500 text-white border-default-200"
                  : ""
              }`}
              onClick={()=>handleUserFollow(account?.user_id)}
              color="primary"
              radius="full"
              size="md"
              variant={isFollowed ? "faded" : "solid"}
              onPress={() => setIsFollowed(!isFollowed)}
            >
              {isFollowed ? "Following" : "Follow"}
            </Button>
            </Tooltip>
            {/* <!-- Text or content items go here --> */}
            <div className="text-content ">
              <h1 className="font-sans font-semibold text-3xl flex items-center justify-center">
                {account ? account?.name ? account.name + " ," : "User " : ""}
                <div
                  className="ml-2 font-bold text-4xl"
                  style={{ fontFamily: "'Chivo', sans-serif" }}
                >
                  {account?.age ? account.age : ""}
                </div>
                <div className={`ml-2 ${account && account.name && account.age ? "" : "hidden"}`}>
                  {<RiVerifiedBadgeFill color="#249ef0" />}
                </div>
              </h1>
              <div className={`${account && account.name && account.age ? "hidden" : "flex"} p-1 px-3 text-base font-sans font-medium rounded-full items-center mt-4 bg-sky-300 border-white hover:bg-sky-400`}>New User <BsStars className="ml-1" color="yellow" /> </div>
            </div>
          </div>
        </div>

        {/* -------------------About------------------- */}
        <div className={`carousel-wrapper transition duration-500 ease-in-out absolute top-0 left-0 h-full w-full flex flex-col items-center justify-center`}>
          <div className="mb-6">
            <h3 className="font-sans text-xl font-semibold text-center mb-1">
              About
            </h3>
            <p className="font-sans text-center px-10">
              {account?.bio ? account.bio : ""}
            </p>
          </div>
          <div className="flex justify-center flex-wrap w-[70%] text-lg font-normal">
            {account?.height && <Height value={account.height} />}
            {account?.interests?.drinks && (
              <Drinks value={account.interests.drinks} />
            )}
            {account?.interests?.workout && (
              <Workout value={account.interests.workout} />
            )}
            {account?.interests?.smoking && (
              <Smoking value={account.interests.smoking} />
            )}
            {account?.gender && <Gender value={account?.gender} />}
            {account?.interests?.zodiac_sign && (
              <ZodiacSign value={account.interests.zodiac_sign} />
            )}
            {account?.interests?.dating_purpose && (
              <DatingPurpose value={account.interests.dating_purpose} />
            )}
          </div>
        </div>

        {/* -------------------prompt------------------- */}
        <div className="carousel-wrapper transition duration-500 ease-in-out absolute top-0 left-0 h-full w-full flex items-center justify-center">
          {/*  Left side for images  */}
          <div className="carousel-images flex-shrink-0 w-1/2 bg-yellow-400 max-h-[100%]">
            {/*  Image items go here  */}
            <img
              src={
                account?.images?.length
                  ? account.images[1]
                    ? `${IMAGE_URL}${account?.images[1]}`
                    : `${IMAGE_URL}${account?.images[0]}`
                  : account?.gender ? account?.gender === 'Male' ? maleDummy : femaleDummy : nuetralDummy
              }
              alt="Image 1"
              className="h-[100%] w-[100%] object-cover"
            />
            {/*  Add more images as needed  */}
          </div>

          {/* <!-- Right side for text or other contents --> */}
          <div className="carousel-text h-full flex justify-center items-center flex-shrink-0 w-1/2">
            {/* <!-- Text or content items go here --> */}
            <div className="text-content ">
              <div className="text-center flex justify-center content-center">
                <FaQuoteRight />
              </div>
              <h1 className="font-sans font-semibold px-10 pt-2 text-xl flex items-center justify-center">
                {account?.prompts ? account.prompts[0] : ""}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Display;
