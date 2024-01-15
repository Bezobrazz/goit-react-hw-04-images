import React, { useState } from 'react';
import styles from './Searchbar.module.css';

export const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const onSearchChange = e => {
    setQuery(e.target.value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <div className={styles.Searchbar}>
      <form onSubmit={handleSubmit} className={styles.SearchForm}>
        <input
          type="text"
          value={query}
          onChange={onSearchChange}
          className={styles.SearchFormInput}
          placeholder="Search images..."
        />
        <button className={styles.SearchFormButton}>Search</button>
      </form>
    </div>
  );
};
