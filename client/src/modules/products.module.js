import axios from "axios";

const ProductModule = {
  getAllProduct: async (product) => {
    try {
      let allProduct = await axios.get(
        "http://localhost:5000/api/getallproducts",
        product
      );
      if (allProduct) {
        return allProduct;
      } else {
        return {
          success: false,
          errMsg: " get product not success ",
        };
      }
    } catch (error) {
      return {
        success: false,
        errMsg: error.message,
      };
    }
  },
};
export default ProductModule;
