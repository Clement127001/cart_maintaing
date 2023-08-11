import { uiActions } from "./uiSlice";
import { cartActions } from "./cartSlice";

export const fetchData = () => {
  return async (dispatch) => {
    const fetchRequest = async () => {
      dispatch(
        uiActions.sendNotification({
          status: "sending",
          title: "Fetching",
          message: "Fetching cart data...",
        })
      );

      const response = await fetch(
        "https://cart-maintainer-default-rtdb.firebaseio.com/cart.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong");
      }

      dispatch(
        uiActions.sendNotification({
          status: "success",
          title: "Success",
          message: "Fetched cart successfully...",
        })
      );

      const cartData = await response.json();
      return cartData;
    };

    try {
      const cartData = await fetchRequest();

      dispatch(
        cartActions.replaceCart({
          items: cartData.items || [],
          totalQuantity: cartData.totalQuantity,
        })
      );
    } catch (err) {
      dispatch(
        uiActions.sendNotification({
          status: "error",
          title: "Error Occurred",
          message: "Fetching cart failed...",
        })
      );
    }
  };
};

export const sendCartData = (cart) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      dispatch(
        uiActions.sendNotification({
          status: "sending",
          title: "Sending",
          message: "Sending cart data...",
        })
      );

      const response = await fetch(
        "https://cart-maintainer-default-rtdb.firebaseio.com/cart.json",
        {
          method: "PUT",
          body: JSON.stringify({
            items: cart.items,
            totalQuantity: cart.totalQuantity,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("somethig went wrong");
      }
    };

    try {
      await sendRequest();
      dispatch(
        uiActions.sendNotification({
          status: "success",
          title: "Success",
          message: "Sending cart sent successfully...",
        })
      );
    } catch (err) {
      dispatch(
        uiActions.sendNotification({
          status: "error",
          title: "Error Occurred",
          message: "Sending cart failed...",
        })
      );
    }
  };
};
