import PropTypes from 'prop-types';
import css from "./ImageGalleryItem.module.css";

export const ImageGalleryItem = ({ url, alt, onClick }) => {
    const handleClick = () => {
        onClick();
    };

    return (
        <li className={css["gallery-item"]} onClick={handleClick}>
            <img className={css["img-item"]} src={url} alt={alt} />
        </li>
    );
};

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired
}