"use client"; // This is a client component
"use client"; // This is a client component
import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const NASA_API_KEY = process.env.NEXT_PUBLIC_NASA_API_KEY;

type ImageData = {
  url: string;
  title: string;
  explanation: string;
  date: string;
};

const Nasa = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchImageData = async () => {
      try {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`);
        const data = await response.json();
        setImageData({
          url: data.url,
          title: data.title,
          explanation: data.explanation,
          date: data.date,
        });
      } catch (error) {
        console.error('Error fetching image data:', error);
      }
    };

    fetchImageData();
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative mx-10 mt-8 mb-10 text-center h-90 w-64  bg-white shadow-2xl rounded-lg overflow-hidden">
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
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-2 mb-4 rounded "
            onClick={openModal}
          >
            Ver mais
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Ampliar Imagem"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center">
          <div className="max-w-7xl w-full bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">{imageData?.title}</h1>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={closeModal}
              >
                Fechar
              </button>
            </div>
            <div className="flex">
              <div className="w-2/5">
                <img className="h-full w-full object-cover" src={imageData?.url} alt={imageData?.title} />
              </div>
              <div className="w-3/5 p-4">
                <p className="text-base text-gray-700 mb-4">
                  {imageData?.explanation}
                </p>
                <p className="text-sm text-gray-500">{imageData?.date}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Nasa;
