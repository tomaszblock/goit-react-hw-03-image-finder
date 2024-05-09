import React, { useState, useEffect } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';
import { Spinner } from './Loader/Loader';
import { fetchImages } from './Api';
import css from './App.module.css';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');

  const apiKey = '42489300-4271c1d54e84a75a5c8c2f4bb'; // Twój klucz API Pixabay

  const handleSearch = async searchQuery => {
    setQuery(searchQuery);
    setPage(1);
    const fetchedImages = await fetchImages(searchQuery, 1, 12, apiKey);
    setImages(fetchedImages);
  };

  const loadMoreImages = async () => {
    setIsLoading(true);
    const nextPage = page + 1;
    const fetchedImages = await fetchImages(query, nextPage, 12, apiKey);
    setImages(prevImages => [...prevImages, ...fetchedImages]);
    setPage(nextPage);
    setIsLoading(false);
  };

  const handleImageClick = imageUrl => {
    setModalImageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setModalImageUrl('');
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    }
  }, [query]);

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleSearch} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={handleImageClick} />
      )}
      {isLoading && <Spinner />}
      {images.length > 0 && !isLoading && (
        <Button onClick={loadMoreImages} text="Load More" />
      )}
      {modalImageUrl && (
        <Modal imageUrl={modalImageUrl} onClose={handleCloseModal} />
      )}
    </div>
  );
};
