import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearProducts, getFeaturedProducts } from '../../../store/product';
import { Container, Spinner } from 'react-bootstrap';
import classes from './FeaturedProducts.module.scss';
import catchErrors from '../../../services/catchErrors';
import { BsFillBookmarkCheckFill } from 'react-icons/bs';

export default function FeaturedProducts() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      await dispatch(getFeaturedProducts());
    };

    fetchProducts();

    return () => {
      clearProducts();
    };
  }, [dispatch]);

  const { featuredProducts, errors, isLoading } = useSelector(
    (state) => state.product
  );

  return (
    <>
      <h1 className="d-flex align-items-center justify-content-center heading">
        Featured Products
      </h1>

      {isLoading && <Spinner variant="success" />}

      {!isLoading && errors.length > 0 && catchErrors(errors)}

      {!isLoading && errors.length === 0 && (
        <Container>
          <div className={classes.featured}>
            {featuredProducts?.map((product) => (
              <div
                className="card m-2 d-flex align-items-center justify-content-center position-relative"
                key={product.id}
              >
                <BsFillBookmarkCheckFill className={classes.featured__icon} />
                <img
                  className={classes.featured__image}
                  src={product.imageUrl}
                  alt={product.name}
                />
                <div className="card-body">
                  <h4 className={classes.card__name}>{product.name}</h4>
                  <p className={classes.card__category}>{product.category}</p>
                  <p className={classes.card__description}>
                    {product.description}
                  </p>
                  <h4 className={classes.card__price}>
                    £&nbsp;{product.price}
                  </h4>
                  <button className="btn btn-outline-success mb-2">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Container>
      )}
    </>
  );
}
