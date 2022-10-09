import { useNavigate } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';

import classes from './Banner.module.scss';

export default function Banner() {
  const navigate = useNavigate();
  return (
    <>
      <div className="row-container">
        <Row className="mr-0 ml-0 mb-3">
          <Col className="p-0">
            <img src="/assets/banner.webp" alt="banner" width="100%" />
          </Col>
          <Col className="p-0">
            <div className={classes.banner__content}>
              <h1 className={classes.banner__title}>Welcome to Primo's!</h1>
              <br />
              <p className={classes.banner__info}>
                At Primo's, the real Italian experience is what matters the
                most. Come to enjoy authentic Italian food and have a look at
                our Italian products!
              </p>
              <br />
              <button
                className="btn btn-lg btn-success"
                onClick={() => navigate('/shop')}
              >
                Shop Now &rarr;
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
}
