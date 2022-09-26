import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts } from '../../store/product';
import { addToCart, getCartItems, removeFromCart } from '../../store/cart';
import { Container, Spinner } from 'react-bootstrap';
import classes from './Products.module.scss';
import catchErrors from '../../services/catchErrors';
import { MdOutlineAdd, MdOutlineRemove } from 'react-icons/md';

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProducts());

      if (auth.currentUser) {
        await dispatch(getCartItems());
      }
    };

    fetchData();
  }, [dispatch, auth.currentUser]);

  const {
    products,
    errors: productErrors,
    isLoading: productLoading,
  } = useSelector((state) => state.product);

  const {
    cart,
    errors: cartErrors,
    isLoading: cartLoading,
  } = useSelector((state) => state.cart);

  const handleAddToCart = async (product) => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    await dispatch(addToCart(product.id));
  };

  const handleRemoveFromCart = async (product) => {
    if (!auth.currentUser) {
      navigate('/login');
      return;
    }

    await dispatch(removeFromCart(product.id));
  };

  function getQuantity(product) {
    return (
      <div className="d-flex align-items-center justify-content-center">
        <MdOutlineRemove
          color="red"
          size="1.5em"
          onClick={() => handleRemoveFromCart(product)}
        />
        <div className={`${classes.quantity}`}>
          {cart.find((c) => c.product_id === product.id) !== undefined ? (
            cart.find((c) => c.product_id === product.id).quantity
          ) : (
            <span>0</span>
          )}
        </div>
        <MdOutlineAdd
          color="blue"
          size="1.5em"
          onClick={() => handleAddToCart(product)}
        />
      </div>
    );
  }

  return (
    <>
      <h1 className="d-flex align-items-center justify-content-center heading mt-5">
        Shop
      </h1>

      {productLoading && <Spinner variant="success" />}

      {!productLoading &&
        productErrors.length > 0 &&
        catchErrors(productErrors)}

      {!cartLoading && cartErrors.length > 0 && catchErrors(cartErrors)}

      {!productLoading && productErrors.length === 0 && (
        <Container>
          <div className={`${classes.products}`}>
            {products?.map((product) => (
              <div
                className="card m-2 d-flex align-items-center justify-content-center position-relative"
                key={product.id}
              >
                <img
                  className={classes.products__image}
                  src={product.imageUrl}
                  alt={product.name}
                />
                <p className={classes.card__category}>{product.category}</p>

                <div className="card-body position-relative">
                  <h2 className={classes.card__name}>{product.name}</h2>

                  <p className={classes.card__description}>
                    {product.description}
                  </p>
                  <h4 className={classes.card__price}>
                    £&nbsp;{product.price}
                  </h4>

                  {getQuantity(product)}
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
