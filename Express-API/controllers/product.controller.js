const productService = require("../services/product.service");
const productModel = require("../models/product.model");

// add new products
module.exports.createProduct = async (req, res) => {
  const {
    name,
    description,
    stock,
    price,
    discount,
    sku,
    images,
    brand,
    category,
  } = req.body;

  const isExist = await productModel.findOne({ sku: sku });

  if (isExist) {
    return res.status(400).json({ message: "Product Already Registerd" });
  }

  const product = await productService.createProduct({
    name,
    description,
    stock,
    price,
    discount,
    sku,
    images,
    brand,
    category,
  });

  return res.status(200).json({ msg: "Product Added Sucessfully", product });
};

// all products
module.exports.allProduct = async (req, res) => {
  try {
    const products = await productService.AllProduct();
    if (!products) {
      return res.status(404).json({ message: "Product Not Found !!" });
    }
    return res.status(200).json({ message: "Fetch All Product:", products });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// single products
module.exports.singleProduct = async (req, res) => {
  try {
    const product = await productService.singleProduct(req.params.id);

    if (!product) {
      return res.status(400).json({
        message: "Product Not Found !!",
      });
    }

    return res.status(200).json({ message: "product", product });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

// update product
module.exports.updateProduct = async (req, res) => {
  const productId = req.params.id;

  const updateProduct = await productService.updateProduct({
    name,
    description,
    stock,
    price,
    discount,
    sku,
    images,
    brand,
    category,
  });

  return res
    .status(200)
    .json({ message: "User Update Successfully", updateProduct });
};

// delete product
module.exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deleteProduct = await productService.deleteProduct(productId);

    if (!deleteProduct) {
      return res.status(404).json({ message: "Product Not Found!!" });
    }

    return res.status(200).json({ message: "Product Deleted Successfully!" });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};
