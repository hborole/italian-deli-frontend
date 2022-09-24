import { useNavigate } from 'react-router-dom';

import { Row, Col } from 'react-bootstrap';

import classes from './Offerings.module.scss';

const CONTENT = [
  {
    title: 'Deli Meat Counter',
    description:
      'Always a big hit with our customers. Italian speciality meats Milano Salame, Bresaola, Parma Ham, Porchetta, Salame Napoli, fresh sausages, Nduja and much more.',
    svg: (
      <path
        fill="#000000"
        d="M38 0a1 1 0 0 0-.51.14l-37 22a1.27 1.27 0 0 0-.12.1l-.1.08a1 1 0 0 0-.16.25v.05A.84.84 0 0 0 0 23v8a1 1 0 0 0 1 1 4 4 0 1 1 0 8 1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h34a1 1 0 0 0 1-1 3 3 0 0 1 6 0 1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V22A22 22 0 0 0 38 0zm20 48H43.9a5 5 0 0 0-9.8 0H2v-6.08a6 6 0 0 0 0-11.84V24h56zM4.64 22L38.27 2A20 20 0 0 1 58 22z"
        data-color="1"
      ></path>
    ),
  },
  {
    title: 'Deli Cheese Counter',
    description:
      'An assortment of Italian cheeses pecorino, mozzarella di Bufala, Burrata to name a few.',
    svg: (
      <path
        fill="#000000"
        d="M38 0a1 1 0 0 0-.51.14l-37 22a1.27 1.27 0 0 0-.12.1l-.1.08a1 1 0 0 0-.16.25v.05A.84.84 0 0 0 0 23v8a1 1 0 0 0 1 1 4 4 0 1 1 0 8 1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h34a1 1 0 0 0 1-1 3 3 0 0 1 6 0 1 1 0 0 0 1 1h16a1 1 0 0 0 1-1V22A22 22 0 0 0 38 0zm20 48H43.9a5 5 0 0 0-9.8 0H2v-6.08a6 6 0 0 0 0-11.84V24h56zM4.64 22L38.27 2A20 20 0 0 1 58 22z"
        data-color="1"
      ></path>
    ),
  },
  {
    title: 'Cafe Food',
    description:
      'Whether eating in or taking out, enjoy delicious home made foods : lasagna, pastas, baguettes and ciabatta, followed by a tasty dessert : pasticcini (fruit tarts, cannoli), homemade tiramisu, cakes. End with a creamy cappuccino or your choice of drink.',
    svg: (
      <path
        fill="#000000"
        d="M15.906.001a2 2 0 0 0-.781 3.811S16 4.337 16 5.03a1.16 1.16 0 0 1-.437 1 14.287 14.287 0 0 1-1.75 1.374 14.05 14.05 0 0 0-2.312 1.874 5.3 5.3 0 0 0 1.625 8.527 2 2 0 1 0 1.75-3.592S14 13.718 14 13.025a1.217 1.217 0 0 1 .438-1.031 14.287 14.287 0 0 1 1.75-1.374A14.05 14.05 0 0 0 18.5 8.746 5.551 5.551 0 0 0 20 5.029a5.664 5.664 0 0 0-3.125-4.81A2 2 0 0 0 15.906 0zm12 0a2 2 0 0 0-.781 3.811S28 4.337 28 5.03a1.16 1.16 0 0 1-.437 1 14.287 14.287 0 0 1-1.75 1.374 14.05 14.05 0 0 0-2.312 1.874 5.3 5.3 0 0 0 1.625 8.527 2 2 0 1 0 1.75-3.592S26 13.718 26 13.025a1.217 1.217 0 0 1 .438-1.031 14.287 14.287 0 0 1 1.75-1.374A14.05 14.05 0 0 0 30.5 8.746 5.551 5.551 0 0 0 32 5.029a5.664 5.664 0 0 0-3.125-4.81A2 2 0 0 0 27.906 0zm12 0a2 2 0 0 0-.781 3.811S40 4.337 40 5.03a1.16 1.16 0 0 1-.437 1 14.287 14.287 0 0 1-1.75 1.374 14.05 14.05 0 0 0-2.312 1.874 5.3 5.3 0 0 0 1.625 8.527 2 2 0 1 0 1.75-3.592S38 13.718 38 13.025a1.217 1.217 0 0 1 .438-1.031 14.287 14.287 0 0 1 1.75-1.374A14.05 14.05 0 0 0 42.5 8.746 5.551 5.551 0 0 0 44 5.029a5.664 5.664 0 0 0-3.125-4.81A2 2 0 0 0 39.906 0zM1.812 22.021a2 2 0 0 0-1.812 2c0 11.127 5.324 21.155 14 26.111v4.872a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2v-4.868a25.306 25.306 0 0 0 5.375-4.123H56a8.025 8.025 0 0 0 8-8v-8a8.025 8.025 0 0 0-8-8H1.813zm2.438 4h45.5c-.633 9.409-5.39 17.52-12.656 21.176A2 2 0 0 0 36 49.006v4H18v-4a2 2 0 0 0-1.094-1.812C9.64 43.536 4.883 35.426 4.25 26.019zm49.688 0H56a3.947 3.947 0 0 1 4 4v8a3.947 3.947 0 0 1-4 4h-7.312a31.732 31.732 0 0 0 5.25-16.002zM3.813 60.003a2.002 2.002 0 1 0 .188 4H50a2 2 0 1 0 0-4H3.813z"
        data-color="1"
      ></path>
    ),
  },
  {
    title: 'Supermarket',
    description:
      "We have an extensive range of Italian foods and drinks. If you don't find something you want, come and tell us. We'll be sure to include it in out next delivery from Italy!",
    svg: (
      <path
        fill="#000000"
        d="M1.753 49.37a1.777 1.777 0 0 1 0-3.553h42.122l1.29-4.812H1.784a1.777 1.777 0 0 1-1.777-1.777V16.249a1.777 1.777 0 0 1 1.777-1.777h50.49l3.521-13.154A1.776 1.776 0 0 1 57.509.001h13.177a1.777 1.777 0 0 1 0 3.553H58.873L46.975 47.961a1.778 1.778 0 0 1-1.739 1.409H1.753zm35.842-11.919v-7.936h-9.411v7.937zm0-11.49v-7.936h-9.411v7.937zm3.553-7.937v7.937h8.047l2.126-7.937H41.152zm0 11.49v7.937h4.964l2.126-7.937h-7.09zm-16.517 7.937v-7.936h-9.414v7.937zm0-11.49v-7.936h-9.414v7.937zm-12.967 11.49v-7.936h-8.1v7.937zm0-11.49v-7.936h-8.1v7.937zm24.438 25.863a7.315 7.315 0 1 1-7.314 7.315 7.315 7.315 0 0 1 7.314-7.315zm0 3.554a3.761 3.761 0 1 0 3.762 3.761 3.761 3.761 0 0 0-3.762-3.761zm-26.36-3.554a7.315 7.315 0 1 1-7.314 7.315 7.315 7.315 0 0 1 7.314-7.315zm0 3.554a3.761 3.761 0 1 0 3.761 3.761 3.761 3.761 0 0 0-3.761-3.761z"
        data-color="1"
      ></path>
    ),
  },
];
export default function Offerings() {
  const navigate = useNavigate();
  return (
    <>
      <div className="row-container">
        <Row className={`mb-5 ${classes.row}`}>
          <div className={`p-0 w-25`}>
            <div className="h-100">
              <img
                src="/assets/offerings.webp"
                alt="offerings"
                className={classes.image}
              />
            </div>
          </div>

          <div className={`p-0 w-75 ${classes.content}`}>
            <div className={classes.colors}>
              <div
                className={classes.colors__each}
                style={{ backgroundColor: `#008c44`, height: '2rem' }}
              ></div>
              <div
                className={classes.colors__each}
                style={{ backgroundColor: `#f4f5f1`, height: '2rem' }}
              ></div>
              <div
                className={classes.colors__each}
                style={{ backgroundColor: `#cd222b`, height: '2rem' }}
              ></div>
            </div>

            <div className="d-flex align-items-start justify-content-start h-100">
              {CONTENT.map((item, index) => (
                <div key={index} className={classes.card}>
                  <svg className={classes.card__svg}>{item.svg}</svg>
                  <h1 className={classes.card__title}>{item.title}</h1>
                  <p className={classes.card__description}>
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center mb-5">
              <button className="btn btn-lg btn-success">
                Visit Shop &rarr;
              </button>
            </div>
          </div>
        </Row>
      </div>
    </>
  );
}
