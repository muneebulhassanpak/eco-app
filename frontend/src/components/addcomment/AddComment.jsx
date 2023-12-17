import React, { useState } from "react";

import InputField from "../shared/inputfield/InputField";
import { LuSend } from "react-icons/lu";
import DOMPurify from "dompurify"; // Import DOMPurify for input sanitization

import { createAComment, headers } from "../../../utils/Urls";
import {
  errorNotification,
  successNotification,
} from "../shared/notifications/Notification";
import { ToastContainer } from "react-toastify";

import { useSelector } from "react-redux";

const AddComment = ({ id, addComment }) => {
  const [comment, setComment] = useState("");

  //Checking if user is logged in, if logged in then allow to comment, else no
  const isUserLoggedIn = useSelector((store) => store?.user?.isLoggedIn);

  const commentSubmitHandler = async (e) => {
    e.preventDefault();
    if (!comment.trim().length > 0) {
      errorNotification("No comment text provided");
      return;
    } else if (!isUserLoggedIn) {
      errorNotification("Only logged in person can comment");
      return;
    }
    // Sanitize user inputs using DOMPurify
    const sanitizedcomment = DOMPurify.sanitize(comment);
    const dataObject = {
      message: sanitizedcomment,
    };
    console.log(dataObject);
    let response = await fetch(createAComment(id), {
      method: "POST",
      headers,
      credentials: "include",
      body: JSON.stringify(dataObject),
    });

    //response handling
    response = await response.json();
    console.log(response);
    response.success == true &&
      successNotification("Successfully posted") &&
      addComment(response.comment);
    response.success == false &&
      errorNotification(response.message || "something went wrong in posting");
    //Form resetting
    setComment("");
  };
  return (
    <>
      <div className="mt-4 max-w-md mx-auto px-4">
        <form onSubmit={commentSubmitHandler}>
          <div className="flex justify-between items-end">
            <div className="w-full">
              <InputField
                type="text"
                text="Your message"
                placeholder="Your thoughts about this subject"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
                className="w-full"
              />
            </div>
            <button
              type="submit"
              className="ml-1 mb-3"
              disabled={!comment.trim().length > 0 || !isUserLoggedIn}
            >
              <LuSend className="text-xl" />
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddComment;
