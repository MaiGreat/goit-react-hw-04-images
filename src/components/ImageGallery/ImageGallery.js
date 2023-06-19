import PropTypes from 'prop-types';
import css from "./ImageGallery.module.css";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";

export const ImageGallery = ({ images, onImageClick }) => {
    return (
        <ul className={css.gallery}>
            {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                    key={id}
                    url={webformatURL}
                    largeImageURL={largeImageURL}
                    alt={tags}
                    onClick={() => onImageClick(largeImageURL, tags)}
                />
            ))}
        </ul>
    );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            tags: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        })
    ).isRequired,
    onImageClick: PropTypes.func.isRequired,
};