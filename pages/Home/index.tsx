"use client"; // This is a client component
import { useState, useEffect } from 'react';

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

type ImageData = {
  url: string;
  title: string;
};

const Nasa = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        const data = await response.json();
        setImageData({
          url: data.url,
          title: data.title,
        });
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, []);

  return (
    <div className="max-w-md mx-auto mt-8 bg-white shadow-md rounded-lg overflow-hidden">
      {imageData ? (
        <>
          <img className="object-cover h-64 w-full" src={imageData.url} alt={imageData.title} />
          <div className="p-4">
            <h2 className="text-xl font-bold mb-2">{imageData.title}</h2>
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Nasa;
