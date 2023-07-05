import React, { useEffect, useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchImages } from "./servise/api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";


export const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [modalImg, setModalImg] = useState(null);
  const [modalAlt, setModalAlt] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      setIsLoading(true);
      try {
        const { hits, totalHits } = await fetchImages(query, page);

        if (hits.length === 0) {
          setImages(hits);
        } else {
          setImages((prevImages) => [...prevImages, ...hits]);
        }
        setTotalHits(totalHits);
      } catch (error) {
        setError(error);
        console.error("Error fetching images:", error);
      } finally {
        setIsLoading(false);
      }
    };
    if(query) {
      getImages();
    }
    
  }, [query, page]);

  const onSubmit = (value) => {
    setQuery(value);
    setPage(1);
    setImages([]);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const getLargeImageURL = (largeImg, alt) => {
    setModalImg(largeImg);
    setModalAlt(alt);
  };

  const closeModal = () => {
    setModalImg(null);
    setModalAlt(null);
  };

  return (
    <div>
      <Searchbar onSubmit={onSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} onImageClick={getLargeImageURL} />
      )}
      {error && <p>Error fetching images</p>}
      {isLoading && <Loader />}
      {totalHits > images.length &&!isLoading && images.length > 0 &&<Button onClick={onLoadMore} />}
      {modalImg && <Modal largeImg={modalImg} alt={modalAlt} onClose={closeModal} />}
    </div>
  );
};
