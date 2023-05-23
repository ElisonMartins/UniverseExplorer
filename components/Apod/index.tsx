"use client"; // This is a client component
import { useState, useEffect } from 'react';

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

type ImageData = {
  url: string;
  title: string;
  explanation: string;
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
          explanation: data.explanation,
        });
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, []);

  return (
    <div className="mx-10 mt-8 text-center h-90 w-64 bg-white shadow-2xl rounded-lg overflow-hidden">
      {imageData ? (
        <div className="max-w-sm rounded overflow-hidden shadow-lg relative">

          <div className='relative'>
            <img className="w-full" src={imageData.url} alt={imageData.title} />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black to-transparent py-2">
              <h1 className="text-xl text-white text-center font-bold">Imagem do dia</h1>
            </div>
          </div>
          <div className="px-6 py-4">
            <h1 className="font-bold text-xl mb-2">{imageData.title}</h1>
            <p className="text-gray-700 text-base">
              {imageData.explanation.length > 200
                ? `${imageData.explanation.slice(0, 200)}...`
                : imageData.explanation}
            </p>
          </div>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Nasa;