import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classes from './Cart.module.scss';

export default function Cart() {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);

  return (
    cart.total > 0 && (
      <div className={classes.cart}>
        <h4 className={classes.amount}>
          {cart.cart.length} Items&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;£&nbsp;
          {cart.total}
        </h4>
        <button
          className="btn btn-lg text-white"
          onClick={() => navigate('/checkout')}
        >
          View Cart &rarr;
        </button>
      </div>
    )
  );
}
