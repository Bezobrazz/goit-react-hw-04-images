import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { loadPhotos } from 'helpers/Api';
import { Modal } from './Modal/Modal';
import styles from './App.module.css';

const App = () => {
  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImgUrl, setLargeImgUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { results, total } = await loadPhotos(search, page);
        setImages(prevImages => [...prevImages, ...results]);
        setIsLoadMore(page < Math.ceil(total / 12));
      } catch (error) {
        toast.error('Ooops, something went wrong 😭');
        console.error('Error fetching more images from Unsplash:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [search, page]);

  const loadMoreImages = () => {
    setPage(prevPage => prevPage + 1);
  };

  const onSubmit = query => {
    setSearch(query);
    setPage(1);
    setImages([]);
  };

  const handleClickImg = url => {
    setLargeImgUrl(url);
  };

  const closeModal = () => {
    setLargeImgUrl('');
  };

  return (
    <div className={styles.Wrapper}>
      <ToastContainer />
      <Searchbar onSubmit={onSubmit} />
      <ImageGallery images={images} openModal={handleClickImg} />
      {isLoading && <Loader />}
      {isLoadMore && <Button loadMoreImages={loadMoreImages} />}
      {largeImgUrl && (
        <Modal closeModal={closeModal} largeImgUrl={largeImgUrl} />
      )}
    </div>
  );
};

export default App;
