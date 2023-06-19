import { Component } from "react";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

export class Modal extends Component {
    componentDidMount() {
        window.addEventListener("keydown", this.handleEsc);
    }

    componentWillUnmount() {
        window.removeEventListener("keydown", this.handleEsc);
    }

    handleEsc = (e) => {
        if (e.code === "Escape") {
            return this.props.onClose();
        }
    };

    handleClickOnBackdrop = (e) => {
        if (e.target === e.currentTarget) {
            return this.props.onClose();
        }
    };

    render() {
        return (
            <div className={css.overlay} onClick={this.handleClickOnBackdrop}>
                <div className={css.modal}>
                    <img src={this.props.largeImg} alt={this.props.alt}/>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    onClose: PropTypes.func.isRequired,
    largeImg: PropTypes.shape({
        largeImageURL: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired
    }).isRequired
};