import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCartItems } from '../store/cart';
import StripeCheckout from 'react-stripe-checkout';
import { Spinner } from 'react-bootstrap';
import { createOrder } from '../store/order';

export default function Pay() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { isLoading, total } = useSelector((state) => state.cart);

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        await dispatch(getCartItems());
      }
    };

    fetchData();
  }, [dispatch, auth.currentUser]);

  const handlePayment = async (token) => {
    const response = await dispatch(createOrder(token));

    if (response) {
      navigate('/thankyou');
    }
  };

  return isLoading ? (
    <>
      <Spinner variant="primary" />
    </>
  ) : (
    <div className="container">
      <StripeCheckout
        token={(token) => handlePayment(token)}
        stripeKey={process.env.REACT_APP_STRIPE_KEY}
        amount={total * 100}
        currency="GBP"
        email={auth.currentUser?.email}
      />
    </div>
  );
}
