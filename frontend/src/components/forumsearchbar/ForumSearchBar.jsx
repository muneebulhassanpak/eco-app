import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const ForumSearchBar = () => {
  return (
    <div className="max-w-md mx-auto my-2">
      <form className="flex items-center w-full">
        <input
          type="search"
          name="forumSearch"
          id="forumSearch"
          placeholder="Search on forum "
          className="border border-black pl-2 rounded-l-full p-2 w-full  focus:outline-none"
        />
        <div className="border border-black rounded-r-full ">
          <button type="submit" className="p-[12px]">
            <IoSearchSharp />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForumSearchBar;
