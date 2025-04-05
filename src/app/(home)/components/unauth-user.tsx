import React from 'react'
import Hero from './hero';
import Banner from './banner';
import LatestPosts from './latest-posts';

export default function UnauthUser() {
  return (
    <div>
      <Hero />

      <Banner />

      <LatestPosts />
    </div>
  );
}
