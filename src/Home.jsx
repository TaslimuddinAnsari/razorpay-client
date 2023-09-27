import React from "react";
import "./App.css";
import axios from "axios";
import ProductedCard from "./component/ProductedCard";
import { getProductList } from "./mock-data";


const Home = () => {
  const prodData = getProductList();
    
  // Using Callback URL 

  const handlePayment = async (payValue) => {
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
        amount: amount,
        currency:  currency || "INR",
        name: "Payment Testing.",
        description: "Tutorial of RazorPay",
        image: "https://example.com/https://banner2.cleanpng.com/20180329/zue/kisspng-computer-icons-user-profile-person-5abd85306ff7f7.0592226715223698404586.jpg",
        order_id: id,
        callback_url: "http://localhost:5000/payment/verify",
        prefill: {
            name: "Anna",
            email: "anna@gmail.com",
            contact: "9999999999"
        },
        notes: {
            "address": "E-commerce"
        },
        theme: {
            "color": "#121212"
        }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p className="heading-text">Buy now!</p>
        <ProductedCard prodData={prodData} handlePayment={handlePayment} />
      </header>
    </div>
  );
};

export default Home;
