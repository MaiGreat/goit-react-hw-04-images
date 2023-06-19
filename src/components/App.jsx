import React, { Component, useEffect, useState } from "react";
import Searchbar from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchImages } from "./servise/api";
import { Button } from "./Button/Button";
import { Loader } from "./Loader/Loader";
import { Modal } from "./Modal/Modal";

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalHits, setTotalHits] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [error, setError] = useState(null);
  const [modalImg, setModalImg] = useState(null);


  useEffect(() => {
    setImages()
  }, [query, page]
  )
  

  const getImages = async () => {
  setIsLoading(true);
  try {
    const { hits, totalHits } = await fetchImages(query, page);

    if (images.length === 0) {
      setIsEmpty(true);
    }

    setImages(prevImages => [...prevImages, ...hits]);
    setTotalHits(totalHits);
  } catch (error) {
    setError(error.message);
  } finally {
    setIsLoading(false);
  }
};

  const onSubmit = value => {
    setQuery(value);
    setPage(1);
    setImages([]);
    setError(null);
    setIsEmpty(false);
  };

const onLoadMore = () => {
  setPage(prevPage => prevPage + 1);
};

useEffect(() => {
  onLoadMore();
}, []);
  
  const getLargeImageURL = (largeImg, alt) => {
    setModalImg(largeImg);
    // modalAlt: alt
  };

  const  closeModal = () => {
    setModalImg(null);
  };



  return (
    <div>
      <Searchbar onSubmit={onSubmit()} />
      {images.length > 0 && (
        <ImageGallery
          onSubmit={onSubmit}
          images={images}
          onImageClick={getLargeImageURL}
        />
      )}
      {isLoading && <Loader />}
      {totalHits > images.length && (
        <Button onClick={onLoadMore} />
      )}
      {modalImg && <Modal largeImg={modalImg} onClose={closeModal} />}
    </div>
  )
}


// class App extends Component {
//   state = {
//     query: "",
//     images: [],
//     page: 1,
//     totalHits: 0,
//     isLoading: false,
//     isEmpty: false,
//     isVisible: false,
//     error: null,
//     modalImg: null
//   };

//   componentDidUpdate(_, prevState) {
//     const { query, page } = this.state;
//     if (prevState.query !== query || prevState.page !== page) {
//       this.getImages(query, page);
//     }
//   }

//   getImages = async () => {
//     this.setState({ isLoading: true });
//     try {
//       const { hits, totalHits } = await fetchImages(
//         this.state.query,
//         this.state.page
//       );

//       if (this.state.images.length === 0) {
//         this.setState({ isEmpty: true });
//       }

//       this.setState((prevState) => ({
//         images: [...prevState.images, ...hits],
//         totalImages: totalHits
//       }));
//     } catch (error) {
//       this.setState({ error: error.message });
//     } finally {
//       this.setState({ isLoading: false });
//     }
//   };

//   onSubmit = (value) => {
//     this.setState({
//       query: value,
//       page: 1,
//       images: [],
//       error: null,
//       isEmpty: false
//     });
//   };

//   onLoadMore = () => {
//     this.setState((prevState) => ({
//       page: prevState.page + 1
//     }));
//   };

//   getLargeImageURL = (largeImg, alt) => {
//     this.setState({ modalImg: largeImg, modalAlt: alt });
//   };

//   closeModal = () => {
//     this.setState({ modalImg: null });
//   };

//   render() {
//     const { images, totalImages, isLoading, modalImg } = this.state;
//     return (
//       <div>
//         <Searchbar onSubmit={this.onSubmit} />
//         {images.length > 0 && (
//           <ImageGallery
//             onSubmit={this.onSubmit}
//             images={images}
//             onImageClick={this.getLargeImageURL} 
//           />
//         )}
//         {isLoading && <Loader />}
//         {totalImages > images.length && (
//           <Button onClick={this.onLoadMore} />
//         )}
//         {modalImg && <Modal largeImg={modalImg} onClose={this.closeModal} />}
//       </div>
//     );
//   }
// }