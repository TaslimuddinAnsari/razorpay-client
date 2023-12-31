import React from "react";
import "./App.css";
import axios from "axios";
import ProductedCard from "./component/ProductedCard";
import { getProductList } from "./mock-data";

const App = () => {
  const prodData = getProductList();

  // Using Handler Function 

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }
  async function handlePayment(priceValue) {
    const payValue = priceValue;
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }
    let paymentData = {
      amount: payValue,
      currency: "INR",
      payment_capture: 1,
    };
    const result = await axios.post(
      "http://localhost:5000/payment/orders",
      paymentData
    );

    if (!result) {
      alert("Server error. Are you online?");
      return;
    }
    const { amount, id, currency } = result.data.data;
    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: "Payment Testing.",
      description: "Test Transaction",
      // image: "https://example.com/https://banner2.cleanpng.com/20180329/zue/kisspng-computer-icons-user-profile-person-5abd85306ff7f7.0592226715223698404586.jpg",
      order_id: id,
      handler: async function (response) {
        const data = {
          orderCreationId: id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
        };

        const result = await axios.post(
          "http://localhost:5000/payment/verify",
          data
        );

        alert(result.data.msg);
      },
      prefill: {
        name: "Anna",
        email: "demo@example.com",
        contact: "1234567890",
      },
      notes: {
        address: "E-commerce",
      },
      theme: {
        color: "blue",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p className="heading-text">Buy now!</p>
        <ProductedCard prodData={prodData} handlePayment={handlePayment} />
      </header>
    </div>
  );
};

export default App;
