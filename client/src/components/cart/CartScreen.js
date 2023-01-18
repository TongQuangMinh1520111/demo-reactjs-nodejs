import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Store } from "../../context/Store";
import ProductModule from "../../modules/products.module";

const CartScreen = () => {
  const { state, dispatch } = useContext(Store);

  const {
    cart: { cartItems },
  } = state;

  const removeItemHandler = (item) => {
    console.log(item.slug);
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  const updateCartHandler = async (item, qty) => {
    const quantity = Number(qty);
    const { data } = await ProductModule.getAllProduct();
    if (data.countInStock < quantity) {
      return toast.error("Sorry. Product is out of stock");
    }
    dispatch({ type: "CART_ADD_ITEM", payload: { ...item, quantity } });
  };
  return (
    <div className="inner">
      <h3 className="">Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go shopping</Link>
        </div>
      ) : (
        <div className="">
          <div className="">
            <table className="">
              <thead className="">
                <tr>
                  <th className="">Item</th>
                  <th className="">Quantity</th>
                  <th className="">Price</th>
                  <th className="">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.slug} className="">
                    <td>
                      <Link to={`/products/${item.slug}`}>
                        <div className="">
                          <img
                            src={item.image}
                            alt={item.name}
                            width={50}
                            height={50}
                          />
                          &nbsp;
                          {item.name}
                        </div>
                      </Link>
                    </td>
                    <td className="">
                      <select
                        value={item.quantity}
                        onChange={(e) =>
                          updateCartHandler(item, e.target.value)
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="">${item.price}</td>
                    <td className="">
                      <button onClick={() => removeItemHandler(item)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="">
            <ul>
              <li>
                <div className="">
                  Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}) : $
                  {cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </div>
              </li>
              <li>
                <Link to={"/order"}>Đặt Hàng</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
