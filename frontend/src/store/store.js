import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import articlesReducer from "./allarticles";
// import postsReducer from "./postsReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    allArticles: articlesReducer,
  },
});

export default store;
