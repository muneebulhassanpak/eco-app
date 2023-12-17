const Product = require("../models/Product");
const User = require("../models/User");
const ForumTopic = require("../models/ForumTopic");
const CustomError = require("../ErrorHandling/Error");

//Get all products
exports.getAllProducts = async (req, res, next) => {
  try {
    // Fetch all products
    const allProducts = await Product.find();
    res.json({
      success: true,
      products: allProducts || [],
    });
  } catch (error) {
    next(error);
  }
};

//Get one product
exports.getOneProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    // Fetch all products
    const allProducts = await Product.findById({ _id: productId });
    res.json({
      success: true,
      product: allProducts || [],
    });
  } catch (error) {
    next(error);
  }
};

// Create Product Handler
exports.createProduct = async (req, res, next) => {
  const { userId } = req.user;

  try {
    const { name, description, image, price, quantity, privacy } = req.body;

    if (!name || !description || !image || !price || !quantity || !privacy) {
      throw new CustomError(400, "Missing fields for product creation");
    }

    // Create a new product
    const newProduct = await Product.create({
      name,
      description,
      image,
      price,
      quantity,
      privacy,
    });

    // Find the user by ID
    const user = await User.findById(userId);

    // Add the new product's ID to the user's products array
    if (user) {
      user.products.push(newProduct._id);
      await user.save(); // Save the changes to the user
    }

    return res.json({
      success: true,
      product: newProduct,
    });
  } catch (err) {
    return next(err);
  }
};

// Delete Product Handler
exports.deleteProductHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    console.log("Delete handler hit", productId);

    // Check if the product exists

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      throw new CustomError(404, "Product not found");
    }
    console.log(existingProduct);
    await Product.findByIdAndDelete(productId);

    console.log("Product deleted successfully");

    return res.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return next(error);
  }
};

//Edit Product handler
exports.editProductHandler = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, description, image, price, quantity, privacy } = req.body;

    if (!name || !description || !image || !price || !quantity || !privacy) {
      throw new CustomError(400, "Missing fields for product edit");
    }

    // Check if the product exists
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      throw new CustomError(404, "Product not found");
    }

    // Update the product details
    existingProduct.name = name;
    existingProduct.description = description;
    existingProduct.image = image;
    existingProduct.price = price;
    existingProduct.quantity = quantity;
    existingProduct.privacy = privacy;

    const updatedProduct = await existingProduct.save();

    return res.json({
      success: true,
      updatedProduct,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getAllForumTopicsHandler = async (req, res, next) => {
  try {
    // Fetch all forum topics
    const allForumTopics = await ForumTopic.find();

    if (!allForumTopics) {
      throw new CustomError(404, "No forum topics found");
    }

    return res.json({
      success: true,
      forumTopics: allForumTopics,
    });
  } catch (err) {
    return next(err);
  }
};
