import React, { useState, useEffect } from "react";
import styles from '../styles/ArtistBio.module.scss'
import { Link } from "react-router-dom";
import dashboardIcon from "../assets/icons/dashboard.svg";
import artworksIcon from "../assets/icons/artworks.svg";
import accountIcon from "../assets/icons/account.svg";
import favoritesIcon from "../assets/icons/favorites.svg";
import historyIcon from "../assets/icons/history.svg";
import { useQuery, useMutation } from "react-query";
import { getMyBiography, addBiography, updateBiography } from "../services/dashboardService";
import { toast } from "react-toastify";

import DashboardMenu from "../components/shared/dashboard-menu";

const ArtistBio = () => {
  const { isLoading, error, data } = useQuery("bio", getMyBiography, {refetchOnWindowFocus: false,});
  const [text, setText] = useState('');
  const [image, setImage] = useState(null);
  const [update, setUpdate]= useState(false);

  let name, description, img;
  if (data && data.data) {
    name = data.data.artist_name;
    description = data.data.description;
    img = data.data.image;
  }

  useEffect(()=>{
    if (data && data.data) {
      setText(data.data.description)
    }

  }, [update]) 


  const addMutation = useMutation(addBiography, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark("You successfully added Bio", {
        progress: undefined,
        hideProgressBar: true,
      });
      window.location.reload();
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });
  const updateMutation = useMutation(updateBiography, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark("You successfully updated Bio", {
        progress: undefined,
        hideProgressBar: true,
      });
      window.location.reload();
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  })

  const _handleSubmit = (e) => {
    e.preventDefault();
    console.log(image, text);
    const formData = new FormData();

    formData.append('description', text);
    formData.append('image', image);

    console.log(formData.get('image'))
    if (update) {
      updateMutation.mutate(formData);
      return;
    }

    addMutation.mutate(formData);
  }

  // const containerClasses = `container ${styles.container}`

  return (
    <>
      <section className="container" style={{marginTop: '124px', marginBottom: '100px'}}>
        <div className="dashboard-container">
          <div className="flex column sidebar">
            <DashboardMenu/>
          </div>
          {data && data.data&& !update?
            <>
              <div className={styles.wrapper}>
                <img src={img} className={styles.img}/>
                <div className={styles.textContainer}>
                  <h1>{name}</h1>
                  <div className={styles.description}>{description}</div>
                </div>
              <button className={styles.button} onClick={()=> setUpdate(true)}>Change</button>
              </div>

            </>
            :
            <form onSubmit={_handleSubmit} className={styles.form}>
              <label htmlFor="text">Tell us your story:</label>
              <textarea name="text" placeholder="Add Your Bio" onChange={(e)=> setText(e.target.value)}
                value={text}
              ></textarea>
              <label htmlFor="file">Upload your image preferred image ratio: 16/9 (width/height):</label>
              <input type="file" name="image" onChange={(e)=> setImage(e.target.files && e.target.files[0])}></input>
              <input type="submit" value="Add Bio" className={styles.button}></input>
            </form>
          }
        </div>
      </section>
    </>
  )
}

export default ArtistBio;
