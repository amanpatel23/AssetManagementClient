import React, { useEffect, useState } from "react";
import AlbumCard from "../../components/AlbumCard/AlbumCard";
import { useNavigate, Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useValue as dashboardContextValue } from "../../contexts/dashboardContext";
import { useValue as userContextValue } from "../../contexts/userContext";
import styles from "./Dashboard.module.css";

function Dashboard() {
  const [showForm, setShowForm] = useState(false);
  const [albumName, setAlbumName] = useState("");

  const { user, logOutHandler } = userContextValue();
  const { albums, setAlbums } = dashboardContextValue();

  const navigate = useNavigate();

  const handleToggleForm = () => {
    setShowForm(!showForm);
  };

  const handleAlbumNameChange = (e) => {
    setAlbumName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "/api/user/addalbum",
        { albumName },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      if (response.status === 200) {
        setAlbums((prevAlbums) => [response.data.album, ...prevAlbums]);
        toast.success("New album added to your dashboard");
      }
    } catch (error) {
      logOutHandler();
      toast.error("Your session expired. Sign in again");
      navigate("/signin");
    }

    setAlbumName("");
  };

  const clickOnCardHandler = () => {
    navigate("images");
  };

  useEffect(() => {
    const getAlbums = async () => {
      try {
        const response = await axios.get("/api/user/albums", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        const albumsArray = response.data.albums;
        setAlbums(albumsArray);
      } catch (error) {
        logOutHandler();
        toast.error("Session expired. SignIn again");
        navigate("/signin");
      }
    };

    getAlbums();
  }, []);

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.topSection}>
          <button className={styles.toggleButton} onClick={handleToggleForm}>
            {showForm ? "Hide Form" : "Add New Album"}
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
          {albums.map((album) => (
            <AlbumCard
              key={album.albumId}
              albumName={album.albumName}
              albumId={album.albumId}
              clickOnCard={clickOnCardHandler}
            />
          ))}
        </div>
      </div>

      <Outlet />
    </>
  );
}

export default Dashboard;
