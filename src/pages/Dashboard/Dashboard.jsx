import React, { useState } from 'react';
import styles from './Dashboard.module.css';

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [albumName, setAlbumName] = useState('');

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log('Album Name:', albumName);

    // Reset form fields
    setAlbumName('');
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.topSection}>
        <button className={styles.toggleButton} onClick={handleToggleForm}>
          {showForm ? 'Hide Form' : 'Add New Album'}
        </button>
        {showForm && (
          <form onSubmit={handleSubmit} className={styles.albumForm}>
            <input
              type="text"
              placeholder="Album Name"
              value={albumName}
              onChange={handleAlbumNameChange}
              required
            />
            <button type="submit">Create Album</button>
          </form>
        )}
      </div>
      <div className={styles.albumGrid}>
        {/* Replace the dummy data with your actual albums */}
        <div className={styles.albumCard}>
          <div className={styles.albumIcon}>
            <img src="https://cdn-icons-png.flaticon.com/128/1379/1379905.png" alt="Folder Icon" />
          </div>
          <div className={styles.albumName}>Album 1</div>
        </div>
        <div className={styles.albumCard}>
          <div className={styles.albumIcon}>
            <img src="https://cdn-icons-png.flaticon.com/128/1379/1379905.png" alt="Folder Icon" />
          </div>
          <div className={styles.albumName}>Album 2</div>
        </div>
        {/* Add more album cards as needed */}
      </div>
    </div>
  );
};

export default Dashboard;
