import React, { useState } from "react";
import PropTypes from 'prop-types';
import css from './Searchbar.module.css'

export const Searchbar = ({ onSubmit }) => {
    const [query, setQuery] = useState('');

    const handleInput = evt => {
        setQuery(evt.currentTarget.value.toLowerCase().trim());
    }

    const handleOnSubmit = e => {
        e.preventDefault();
        onSubmit(query);
        setQuery('');
    };

    return (
        <header className={css.searchbar}>
            <form className={css.form} onSubmit={handleOnSubmit}>
                <button type="submit" className="button">
                    <span className={css["button-label"]}>Search</span>
                </button>

                <input
                    onChange={handleInput}
                    value={query}
                    className={css.input}
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
