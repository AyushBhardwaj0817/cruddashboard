const Product = require("../models/Product");
const mongoose = require("mongoose");

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {

  const messages = await req.flash("info");

  const locals = {
    title: "NodeJs",
    description: "Free NodeJs User Management System",
  };

  let perPage = 12;
  let page = req.query.page || 1;

  try {
    const products = await Product.aggregate([{ $sort: { createdAt: -1 } }])
      .skip(perPage * page - perPage)
      .limit(perPage)
      .exec();

    const count = await Product.countDocuments({});

    res.render("index", {
      locals,
      products,
      current: page,
      pages: Math.ceil(count / perPage),
      messages,
    });
  } catch (error) {
    console.log(error);
  }
};


/**
 * GET /
 * About
 */
exports.about = async (req, res) => {
  const locals = {
    title: "About",
    description: "Free NodeJs User Management System",
  };

  try {
    res.render("about", locals);
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * New Product Form
 */
exports.addProduct = async (req, res) => {
  const locals = {
    title: "Add New Product - NodeJs",
    description: "Free NodeJs User Management System",
  };

  res.render("product/add", locals);
};

/**
 * POST /
 * Create New Product
 */
exports.postProduct = async (req, res) => {
  console.log(req.body);

  const newProduct = new Product({
    title: req.body.title,
    description: req.body.description,
    quantity: req.body.quantity,
    pricing: req.body.pricing,
    details: req.body.details
    //email: req.body.email,
  });
  try {
    console.log('try');
    await Product.create(newProduct);
    await req.flash("info", "New product has been added.");

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Product Data
 */
exports.view = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    const locals = {
      title: "View Product Data",
      description: "Free NodeJs User Management System",
    };

    res.render("product/view", {
      locals,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Edit Product Data
 */
exports.edit = async (req, res) => {
  try {
    const product = await Product.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Product Data",
      description: "Free NodeJs User Management System",
    };

    res.render("product/edit", {
      locals,
      product,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * GET /
 * Update Product Data
 */
exports.editPost = async (req, res) => {
  try {
    await Product.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      description: req.body.description,
      quantity: req.body.quantity,
      pricing: req.body.pricing,
      details: req.body.details,
      updatedAt: Date.now(),
    });
    await req.flash("info", "Your Product has been updated.");
    await res.redirect(`/edit/${req.params.id}`);

    console.log("redirected");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Delete /
 * Delete Product Data
 */
exports.deleteProduct = async (req, res) => {
  try {
    await Product.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

/**
 * Get /
 * Search Product Data
 */
exports.searchProducts = async (req, res) => {
  const locals = {
    title: "Search Product Data",
    description: "Free NodeJs User Management System",
  };

  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const products = await Product.find({
      $or: [
        { title: { $regex: new RegExp(searchNoSpecialChar, "i") } },
        { description: { $regex: new RegExp(searchNoSpecialChar, "i") } },
      ],
    });

    res.render("search", {
      products,
      locals,
    });
  } catch (error) {
    console.log(error);
  }
};
