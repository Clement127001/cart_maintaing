import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, Fragment } from "react";

import Notification from "./components/UI/Notification";
import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";

import { sendCartData, fetchData } from "./components/Store/cartActions";

let intialState = true;

function App() {
  const dispatch = useDispatch();
  const showCart = useSelector((state) => state.ui.isCartVisible);
  const notification = useSelector((state) => state.ui.notification);

  const cart = useSelector((state) => state.cart);


  //fetching data fom the database
  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  //adding (post) to the database
  useEffect(() => {
    //maintaing initialtate so that the reloading doesn't affect (override) the data already available in the backend
    if (intialState) {
      intialState = false;
      return;
    }
    //to avoid sending when cart is changed due to the initial fetching
    if (cart.changed) {
      dispatch(sendCartData(cart));
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
