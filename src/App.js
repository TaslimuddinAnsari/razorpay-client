import React from 'react'
import './App.css';


const App = () => {

  const displayRazorpay = () => {
    console.log('hello');
  };

  return (
    <div className="App">
    <header className="App-header">
        <p>Buy now!</p>
        <button className="btn" onClick={displayRazorpay}>
            Pay ₹500
        </button>
    </header>
</div>
  )
}

export default App
