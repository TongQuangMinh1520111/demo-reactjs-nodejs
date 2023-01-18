import React, { createRef, useState } from "react";
import OrderModule from "../../modules/order.module";

const OrderForm = () => {
  const { nameRef, phoneRef, addressRef } = createRef();
  const [inputField, setInputField] = useState({});
  const handleChange = (event) => {
    setInputField({
      ...inputField,
      [event.target.name]: event.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(inputField);
    let order = await OrderModule.oderProduct(inputField);
    if (order.success) {
      window.location.href = "/home";
    } else {
      alert(order.errMsg);
    }
  };

  return (
    <div id="order">
      <div className="inner">
        <h3 className="h3title">Order</h3>
        <div className="order_form">
          <form onSubmit={handleSubmit}>
            <div className="order_cont">
              <ul className="c_form">
                <li>
                  <label>Name</label>
                  <input
                    className="input_cus"
                    ref={nameRef}
                    name="name"
                    placeholder="Name"
                    required
                    value={inputField.name}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>Phone Number</label>
                  <input
                    className="input_cus"
                    ref={phoneRef}
                    type="number"
                    name="phone"
                    placeholder="Phone Number"
                    required
                    value={inputField.phone}
                    onChange={handleChange}
                  />
                </li>
                <li>
                  <label>Address</label>
                  <input
                    className="input_cus"
                    ref={addressRef}
                    name="address"
                    placeholder="Address"
                    required
                    value={inputField.address}
                    onChange={handleChange}
                  />
                </li>
                <li className="box_submit">
                  <input className="btn_submit" type="submit" value="Order" />
                </li>
              </ul>
              <div className="product_order"></div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrderForm;
