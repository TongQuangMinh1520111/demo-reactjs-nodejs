import React, { createRef, useState } from "react";
import OrderModule from "../../modules/order.module";

const OrderForm = () => {
  const { nameRef, phoneRef, addressRef} = createRef();
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
        <form onSubmit={handleSubmit}>
          <div className="order_cont">
            <ul className="info">
              <li>
                <label>Họ Tên:</label>
                <input
                  ref={nameRef}
                  name="name"
                  placeholder="Họ Và Tên"
                  value={inputField.name || ""}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label>Số Điện Thoại:</label>
                <input
                  ref={phoneRef}
                  type="number"
                  name="phone"
                  placeholder="Số Điện Thoại"
                  value={inputField.phone || ""}
                  onChange={handleChange}
                />
              </li>
              <li>
                <label>Địa chỉ:</label>
                <input
                  ref={addressRef}
                  name="address"
                  placeholder="Địa Chỉ"
                  value={inputField.address || ""} 
                  onChange={handleChange}
                />
              </li>
              <input type="submit"/>
            </ul>
            <div className="product_order"></div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
