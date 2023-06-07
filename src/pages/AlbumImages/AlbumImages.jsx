import React, { useState, useRef } from "react";
import { useValue as useDashboardContextValue } from "../../contexts/dashboardContext";
import { useValue as useUserContextValue } from "../../contexts/userContext";
import axios from "axios";
import styles from "./AlbumImages.module.css";

function AlbumImages() {
  const [showForm, setShowForm] = useState(false);
  const [imageName, setImageName] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const { currAlbum, albumImages } = useDashboardContextValue();
  const { user } = useUserContextValue();

  const fileInputRef = useRef(null);

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleImageNameChange = (e) => {
    setImageName(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("imageName", imageName);

      const response = await axios.post("/api/user/uploadImage", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${user.token}`,
        },
      });

      // Handle the response from the backend

      // Reset form fields
      setImageName("");
      setSelectedImage(null);
      fileInputRef.current.value = "";
    } catch (error) {
      // Handle the error
      console.log(error);
    }
  };

  return (
    <div className={styles.albumImages}>
      <div className={styles.topSection}>
        <button className={styles.toggleButton} onClick={handleToggleForm}>
          {showForm ? "Hide Form" : "Add New Image"}
        </button>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className={styles.imageForm}
            encType="multipart/form-data"
          >
            <input
              type="text"
              placeholder="Image Name"
              value={imageName}
              onChange={handleImageNameChange}
              required
            />
            <label className={styles.browseButton}>
              Browse
              <input
                type="file"
                onChange={handleImageUpload}
                accept="image/*"
                ref={fileInputRef}
                required
              />
            </label>
            {selectedImage && (
              <div className={styles.selectedImageName}>
                {selectedImage.name}
              </div>
            )}
            <button type="submit">Upload Image</button>
          </form>
        )}
      </div>
      <h2 className={styles.albumName}>{currAlbum}</h2>
      <div className={styles.imageGrid}>
        {/* {selectedImage && (
          <div className={styles.imageCard}>
            <img src={selectedImage} alt="Selected Image" />
            <div className={styles.imageName}>{imageName}</div>
          </div>
        )} */}
        {/* Add more image cards for other images in the album */}
      </div>
    </div>
  );
}

export default AlbumImages;
