import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../context/Store";
import ProductModule from "../../modules/products.module";
const ProductDetail = () => {
  const [listProduct, setListProduct] = useState([]);
  useEffect(() => {
    const getAllProduct = async () => {
      let allProduct = await ProductModule.getAllProduct();
      if (allProduct) {
        setListProduct(allProduct.data);
      }
    };
    getAllProduct();
  }, []);

  const productSlug = useParams();
  const product = listProduct.find((prod) => prod.slug === productSlug.slug);

  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    if (product.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });
    window.location.href = "/cart";
  };
  return (
    <div id="product_details" className="">
      <div className="inner">
        {product ? (
          <div className="product_cont">
            <div className="details_fr">
              <div className="box-left">
                <figure className="product_img">
                  <img
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={400}
                  />
                </figure>
              </div>
              <div className="box-right">
                <h3 className="c-ttl01">{product.name}</h3>
                <div className="p_meta">
                  <p className="c-txt01">Brand: {product.brand}</p>
                  <p className="c-txt01">
                    Status:
                    {product.countInStock > 0 ? "In stock" : "Unavailable"}
                  </p>
                  <p className="c-txt01">
                    {product.rating} of {product.numReviews} reviews
                  </p>
                </div>
                <p className="price">Price: ${product.price}</p>

                <button className="primary-button" onClick={addToCartHandler}>
                  Add to cart
                </button>
              </div>
            </div>
            <div className="product_info">
              <p className="c-txt02">Description: {product.description}</p>
              <p className="c-txt02">Category: {product.category}</p>
            </div>
          </div>
        ) : (
          <p>...loading</p>
        )}
      </div>
    </div>
    //dua du lieu len context
  );
};

export default ProductDetail;
