import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Thankyou() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 5000);
  }, [navigate]);

  return (
    <div>
      Thankyou for ordering!
      <br />
      You will be redirected to home page in 5 secs...
    </div>
  );
}
