import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import classes from "./CartButton.module.css";
import cart from "../../Assets/cart.png";
import { uiActions } from "../Store/uiSlice";

const CartButton = (props) => {
  const dispatch = useDispatch();

  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggleCart());
  };
  return (
    <button className={classes.button} onClick={toggleCartHandler}>
      <span>
        <img src={cart} />
      </span>
      <span className={classes.badge}>{totalQuantity}</span>
    </button>
  );
};

export default CartButton;
