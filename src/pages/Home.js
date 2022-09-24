import React from 'react';
import Banner from '../components/Home/Banner/Banner';
import FeaturedProducts from '../components/Home/FeaturedProducts/FeaturedProducts';
import Offerings from '../components/Home/Offerings/Offerings';

export default function Home() {
  return (
    <>
      <Banner />
      <Offerings />
      <FeaturedProducts />
    </>
  );
}
