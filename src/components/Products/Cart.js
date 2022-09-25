import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './Cart.module.scss';

export default function Cart() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  return (
    <div className={classes.cart}>
      <h4 className={classes.amount}>
        Total Amount:&nbsp;&nbsp;£&nbsp;{cart.total}
      </h4>
      <button
        className="btn btn-lg btn-outline-white"
        onClick={() => navigate('/checkout')}
      >
        Checkout &rarr;
      </button>
    </div>
  );
}
