import classes from './OpeningHours.module.scss';

export default function OpeningHours() {
  return (
    <div className={classes.opening}>
      <h1 className="heading">OpeningHours</h1>
      <br />
      <p>Mon - Fri: 7am - 6pm</p>
      <p>Sat: 8am - 4pm</p>
      <p>Sun: 10am - 4pm</p>
    </div>
  );
}
