import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, getCartItems, removeFromCart } from '../../store/cart';
import { MdOutlineAdd, MdOutlineRemove } from 'react-icons/md';
import StripeCheckout from 'react-stripe-checkout';

import classes from './Purchase.module.scss';
import { Spinner, Form } from 'react-bootstrap';
import { createOrder } from '../../store/order';

export default function Purchase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [note, setNote] = useState('');

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

        {getQuantity(item)}
      </div>
    );
  }

  const handleAddToCart = async (item) => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    await dispatch(addToCart(item.product_id));
  };

  const handleRemoveFromCart = async (item) => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    await dispatch(removeFromCart(item.product_id));
  };

  function getQuantity(item) {
    return item.isActive === 0 ? (
      <div className="text-danger">Out of stock!</div>
    ) : (
      <div className="d-flex align-items-center justify-content-center">
        <MdOutlineRemove
          color="red"
          size="1.5em"
          style={{ marginRight: `1rem` }}
          onClick={() => handleRemoveFromCart(item)}
        />
        <div className={`${classes.quantity}`}>{item.quantity}</div>
        <MdOutlineAdd
          color="blue"
          size="1.5em"
          style={{ marginLeft: `1rem` }}
          onClick={() => handleAddToCart(item)}
        />
      </div>
    );
  }

  const handlePayment = async (token) => {
    const response = await dispatch(createOrder({ token, note }));

    if (response) {
      navigate('/thankyou');
    }
  };

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

      <Form.Control
        as="textarea"
        aria-label="With textarea"
        placeholder="Delivery notes"
        className="mb-3"
        value={note}
        onChange={(e) => setNote(e.target.value)}
      />

      <div className={`mt-4 ${classes.purchase__total}`}>
        <h4 className={classes.item__price}>
          {cart.length} Items&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;£&nbsp;
          {total}
        </h4>

        <StripeCheckout
          token={(token) => handlePayment(token)}
          stripeKey={process.env.REACT_APP_STRIPE_KEY}
          amount={total * 100}
          currency="GBP"
          email={auth.currentUser?.email}
        />
      </div>
    </div>
  );
}
