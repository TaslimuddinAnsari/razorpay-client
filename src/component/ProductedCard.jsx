import React from "react";

const ProductedCard = ({ handlePayment, prodData }) => {
  return (
    <div className="card-section">
      {prodData.map((item) => (
        <div className="card" key={item.productId}>
          <img className="card-img" src={item.prodImg} alt="prod-img" />
          <div className="card-body">
            <div className="prod-info">
              <div className="text">{item.productName}</div>
              <div className="text">₹{item.price}</div>
            </div>
            <button className="btn" onClick={() => handlePayment(item.price)}>
              Buy Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductedCard;
