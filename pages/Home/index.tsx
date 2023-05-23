"use client"; // This is a client component
import React, { useState, useEffect } from 'react';
import Header from '../../components/Header';
import Apod from '../../components/Apod'

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

const Home = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        const data = await response.json();
        setImageUrl(data.url);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching image data:', error);
        setIsLoading(false);
      }
    };

    fetchImageData();
  }, []);

  return (
      <>
      <div
        className="grid grid-cols-12 w-full h-screen items-center justify-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${imageUrl})`,
        }}
      >
        <Header />

        {isLoading ? (
          <p className="text-white text-center">Loading...</p>
        ) : (
        <div className="text-center col-span-12 md:col-span-8">
          <h1 className="text-4xl text-white font-bold mb-4">UniverseExplorer</h1>
          <h2 className="text-2xl text-white">Descubra os mistérios do universo com apenas um clique!</h2>
        </div>
        )}
      </div>
      <Apod />
    
    </>
  );
};

export default Home;
