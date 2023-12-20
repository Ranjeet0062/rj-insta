import React, { useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { getuser } from "../reducers/userReducer.js";
import { useEffect, useContext } from "react";
import Leftnav from "../components/leftnav.jsx";
import BottomBar from "../components/BottomBar.jsx";
import { Context } from "../context/contextApi.jsx";
import StoryBar from "../components/story/StoryBar.jsx";
import HomepostCard from "../components/HomepostCard.jsx";
export const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { loading } = useContext(Context);
  const [allpost, setallpost] = useState([]);
  console.log("afterdata", user);

  useEffect(() => {
    axios
      .get("http://localhost:5555/user/getuser", { withCredentials: true })
      .then((res) => {
        dispatch(getuser(res.data.user));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [loading]);
  useEffect(() => {
    axios
      .get("http://localhost:5555/user/getallpost", { withCredentials: true })
      .then((res) => {
        setallpost(res.data.posts);
        console.log(res.data.posts);
      })
      .catch((error) => {
        console.log(error);
      })

  }, [])
  return (
    <div className=" h-screen flex overflow-hidden">
      <div className="hidden sm:block">
        {" "}
        <Leftnav />
      </div>
      <div className="w-full sm:w-[85vw] overflow-y-scroll">
        <div className="container flex flex-col items-center translate-x-[-12px]">
          <div>
            <StoryBar />
          </div>
          <div className="allposts w-[50%]  mt-6 flex justify-center">
            <div className="">
              {
                allpost?.map((post,index) => {
                  return <div className="mt-4" key={index}>
                    <HomepostCard post={post} />
                  </div>
                })
              }

            </div>
          </div>
        </div>
      </div>

      <div className="fixed w-screen bottom-0 bg-gray-100 py-2 block sm:hidden">
        <BottomBar />
      </div>
    </div>
  );
};
