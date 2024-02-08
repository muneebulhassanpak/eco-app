import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import postReducer from "./postSlice";
import articlesReducer from "./allarticles";
import tokenReducer from "./csrfToken";
import temperature from "./temperature";
// import postsReducer from "./postsReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    allArticles: articlesReducer,
    token: tokenReducer,
    temperature: temperature,
  },
});

export default store;
