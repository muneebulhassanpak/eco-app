import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";

import { errorNotification } from "../components/shared/notifications/Notification";
import { headers, viewTopic } from "../../utils/Urls";
import { ToastContainer } from "react-toastify";

import AddComment from "../components/addcomment/AddComment";
import { MdOutlinePersonOutline } from "react-icons/md";

const ForumDetailPage = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  const addAComment = (newComment) => {
    if (post && post.comments) {
      setPost((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, newComment],
      }));
    }
  };

  const { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        let response = await fetch(viewTopic(id), {
          headers,
          credentials: "include",
        });
        response = await response.json();

        if (response.success === true) {
          setPost(response.post);
        } else {
          let errorMessage;
          if (response.message.includes("not authorized")) {
            errorMessage = "Please sigin to read more";
          }
          errorNotification(errorMessage || "Something went wrong in fetching");
        }
        setLoading(false);
      } catch (error) {
        errorNotification("Failed to fetch forum topics");
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  return (
    <>
      <div className="max-w-6xl mx-auto mt-8">
        {loading ? (
          <p>Loading...</p>
        ) : post ? (
          <div className="max-w-lg mx-auto">
            <h1 className="text-center text-3xl md:text-5xl my-2">
              {post.title}
            </h1>
            <p className="text-center">{post.description}</p>
            <p className="text-center py-3">
              <span className="font-medium">Posted: </span>
              {format(post.timeOfCreation)}
            </p>

            {post.comments && post.comments.length > 0 && (
              <div className="max-w-lg mx-auto mt-2">
                <h2 className="text-xl font-bold my-2 text-center">
                  Comments:
                </h2>
                <ul>
                  {post.comments.map((comment) => (
                    <li key={comment._id} className="flex items-center mb-2">
                      <div className="w-7 h-7 bg-gray-500 rounded-full mr-2 border border-black grid place-items-center">
                        <MdOutlinePersonOutline className="text-white" />
                      </div>
                      <p>{comment.message}</p>
                      <p className="ml-auto">{format(comment.createdAt)}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <AddComment id={post._id} addComment={addAComment} />
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
      <ToastContainer />
    </>
  );
};

export default ForumDetailPage;