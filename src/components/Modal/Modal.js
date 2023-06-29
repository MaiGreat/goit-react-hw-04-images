import React, { useEffect } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export const Modal = ({ largeImg, alt, onClose }) => {
    useEffect(() => {
        const handleEsc = (event) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);

    const handleClickOnBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className={css.overlay} onClick={handleClickOnBackdrop}>
            <div className={css.modal}>
                <img src={largeImg} alt={alt} />
            </div>
        </div>
    );
};

Modal.propTypes = {
    largeImg: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};


