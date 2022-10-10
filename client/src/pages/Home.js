import React from 'react';
import Footer from '../components/Footer';
import Banner from '../components/Home/Banner/Banner';
import FeaturedProducts from '../components/Home/FeaturedProducts/FeaturedProducts';
import Offerings from '../components/Home/Offerings/Offerings';
import OpeningHours from '../components/Home/OpeningHours/OpeningHours';

export default function Home() {
  return (
    <>
      <Banner />
      <Offerings />
      <FeaturedProducts />
      <OpeningHours />
      <Footer />
    </>
  );
}
