import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems } from '../../store/cart';

import classes from './Purchase.module.scss';
import { Spinner } from 'react-bootstrap';

export default function Purchase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { cart, isLoading, total } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        await dispatch(getCartItems());
      }
    };

    fetchData();
  }, [dispatch, auth.currentUser]);

  function cartItems(item) {
    return (
      <div className={classes.item} key={item.id}>
        <div className="d-flex align-items-center w-50">
          <img
            src={item.imageUrl}
            alt={`${item.name}`}
            className={classes.item__image}
          />
          <h5 className={classes.item__name}>
            {item.name}
            <span className={classes.item__quantity}>x {item.quantity}</span>
          </h5>
        </div>

        <div className="w-50 d-flex align-items-center justify-content-around">
          <div className={classes.item__price}>£&nbsp;{item.price}</div>
          <div className={classes.item__price}>
            £&nbsp;{item.price * item.quantity}
          </div>
        </div>
      </div>
    );
  }

  return isLoading ? (
    <>
      <Spinner variant="primary" />
    </>
  ) : cart.length === 0 ? (
    <div className={classes.purchase}>
      <h1 className="heading w-100 text-center">Cart Items</h1>
      <p>There are not items in cart!</p>
      <button className="btn btn-success" onClick={() => navigate('/shop')}>
        Shop Now &rarr;
      </button>
    </div>
  ) : (
    <div className={classes.purchase}>
      <h1 className="heading w-100 text-center">Cart Items</h1>

      {cart.map((item) => cartItems(item))}

      <div className={classes.purchase__total}>
        <h4 className={classes.item__price}>
          {cart.length} Items&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;£&nbsp;
          {total}
        </h4>

        <button
          className="btn btn-success"
          onClick={() => navigate('/checkout')}
        >
          Proceed to Pay &rarr;
        </button>
      </div>
    </div>
  );
}
