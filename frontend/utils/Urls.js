const baseURL = "http://localhost:8080/api";

export const loginUrl = `${baseURL}/login`;
export const registerUrl = `${baseURL}/register`;

const baseForumUrl = `${baseURL}/forum`;

export const createTopic = `${baseForumUrl}/create`;
export const getAllTopics = `${baseForumUrl}/get`;
export const editTopic = (id) => `${baseForumUrl}/edit/${id}`;
export const viewTopic = (id) => `${baseForumUrl}/get/${id}`;
export const deleteTopic = (id) => `${baseForumUrl}/delete/${id}`;

//Profile picture updating Url
export const updateProfilePicture = `${baseForumUrl}/updateProfilePicture`;
//Getting all topics created by a person to show in his dashboard
export const getAllTopicsForAPerson = (personId) =>
  `${baseForumUrl}/getOfAPerson/${personId}`;
//Url to store a new comment on a post
export const createAComment = (postId) =>
  `${baseForumUrl}/createComment/${postId}`;

//ADMIN ROUTES---------------------------------------------------
const baseAdminUrl = `${baseURL}/admin`;
//Getting all topics to show on ecoshop page (accessible to everyone)
export const getAllForumTopics = `${baseAdminUrl}/getAllForumTopics`;
//Getting all products to show on ecoshop page (accessible to everyone)
export const getAllProducts = `${baseAdminUrl}/getAllProducts`;
//Getting individual product from database (accessible to everyone)
export const getOneProduct = (productId) =>
  `${baseAdminUrl}/getOneProduct/${productId}`;
//Create new product (accessible to only admin)
export const createOneProduct = `${baseAdminUrl}/createProduct`;
export const deleteOneProduct = (productId) =>
  `${baseAdminUrl}/deleteProduct/${productId}`;
export const editOneProduct = (productId) =>
  `${baseAdminUrl}/editProduct/${productId}`;

//Request headers used in sending requests to server-----------------------
export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Credentials": true,
};
