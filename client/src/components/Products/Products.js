import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProducts, filterProducts } from '../../store/product';
import { getCategories } from '../../store/category';
import { addToCart, getCartItems, removeFromCart } from '../../store/cart';
import { Container, Spinner, Form, Row, Col } from 'react-bootstrap';
import classes from './Products.module.scss';
import catchErrors from '../../services/catchErrors';
import { MdOutlineAdd, MdOutlineRemove } from 'react-icons/md';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [filterCategory, setFilterByCategory] = useState('all');

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchData = async () => {
      await dispatch(getProducts());
      await dispatch(getCategories());

      if (auth.currentUser) {
        await dispatch(getCartItems());
      }
    };

    fetchData();
  }, [dispatch, auth.currentUser]);

  const {
    filteredProducts,
    errors: productErrors,
    isLoading: productLoading,
  } = useSelector((state) => state.product);

  const { categories } = useSelector((state) => state.category);

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

  const handleFilterByCategory = (e) => {
    setFilterByCategory(e.target.value);
    dispatch(filterProducts(e.target.value));
  };

  function getQuantity(product) {
    return product.isActive === 0 ? (
      <div className="text-danger">Out of stock!</div>
    ) : (
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
          <Row>
            <Col></Col>
            <Col></Col>
            <Col className="d-flex justify-content-center align-items-center">
              <div className="w-100">Filter By Category: </div>
              <Form.Select
                aria-label="Filter by category"
                value={filterCategory}
                onChange={handleFilterByCategory}
              >
                <option value="all">All</option>
                {categories.map((category) => (
                  <option key={category.name} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>

          <div className={`${classes.products}`}>
            {filteredProducts?.map((product) => (
              <div
                className="card m-2 d-flex align-items-center justify-content-center position-relative"
                key={product.id}
              >
                {product.isFeatured && (
                  <BsFillBookmarkCheckFill className={classes.products__icon} />
                )}
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
