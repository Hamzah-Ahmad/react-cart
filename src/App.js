import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";

import Homepage from "./components/Homepage";
import CartPage from "./components/CartPage";

function App() {
  return (
    // <BrowserRouter>
    //   {/* <Link to="/">Main Page</Link>
    //   <Link to="/cart">Shopping Cart</Link> */}
    //   <Switch>
    //     <Route exact path="/" component={Homepage} />
    //     <Route path="/cart" component={CartPage} />
    //   </Switch>
    // </BrowserRouter>
    <Homepage />
  );
}

// eslint-disable-next-line
{
  /* <div className="App">
         <CartPage /> 
        <Homepage />
      </div> */
}

export default App;
