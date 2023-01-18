const express = require("express");
const Products = require("../modals/products");
const productRouter = express.Router();


productRouter.post("/postproducts", (req,res) => {
  let products = new Products(req.body);
  products
    .save()
    .then((products) => {
      res.status(200).json({ products: "products in added successfully" });
    })
    .catch((err) => {
      res.status(400).send("unable to save to database");
    });
})

//Get all Method
productRouter.get("/getallproducts", (req, res) => {
  Products.find(function (err, products) {
    if (err) {
      console.log(err);
    } else {
      products.map(product => product.image = process.env.HOST_NAME + product.image)
      res.json(products);
    }
  });
});


module.exports = productRouter;
