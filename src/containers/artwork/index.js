import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import cardImg from "../../assets/dummy/bid.png";
import dashboardIcon from "../../assets/icons/dashboard.svg";
import artistsIcon from "../../assets/icons/artists.svg";
import artworksIcon from "../../assets/icons/artworks.svg";
import accountIcon from "../../assets/icons/account.svg";
import favoritesIcon from "../../assets/icons/favorites.svg";
import historyIcon from "../../assets/icons/history.svg";
import plus from "../../assets/icons/plus.svg";
import { useMutation, useQuery } from "react-query";
import { getArtists, getArtWith } from "../../services/artistsService";
import { addArtwork, updateArtwork } from "../../services/dashboardService";
import DashboardMenu from "../../components/shared/dashboard-menu";
import Loading from "../loading";
import { toast } from "react-toastify";
import { getArtwork } from "../../services/artworksService";
import jwt_decode from "jwt-decode";
import { getJwt } from "../../services/authService";
import { useFormik } from "formik";
import { initialValues } from "./initialValues";
import PrimaryInput from "../shared/PrimaryInput";
import { categories, product_types } from "./categories";
import PrimarySelect from "../shared/PrimarySelect";
import { validationSchema } from "./validationSchema";
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

function EditArtwork(props) {
  var { account_type } = jwt_decode(getJwt());
  const { id } = useParams();

  const [selectedFile, setSelectedFile] = useState(null);

  const [imageRef, setImageRef] = useState(null);
  const [preview, setPreview] = useState(null);
  const [last, setLast] = useState(null);
  const [crop, setCrop] = useState({
    unit: 'px',
    aspect:280/270,
    x: 0,
    y: 0,
    width: 280,
    height: 270,
    minWidth:280,
    minHeight:270,
    locked:true
  });



  const handleSubmit = ({
    title,
    artist_id,
    product_type,
    buy_it_now,
    description,
    year,
    category_id,
    request_price,
    depth,
    height,
    medium,
    units,
    width,
  }) => {
    const formData = new FormData();
    

    formData.append("title", title);
    formData.append("artist_id", artist_id);
    formData.append("product_type", product_type);
    formData.append("buy_it_now", buy_it_now * 1.25);
    formData.append("description", description);
    formData.append("year", year);
    formData.append("category_id", category_id);
    formData.append("request_price", request_price);
    formData.append("depth", depth);
    formData.append("height", height);
    formData.append("medium", medium);
    formData.append("units", units);
    formData.append("width", width);
    if (!id) {
      formData.append("image1", selectedFile[0]);
      formData.append("image2", selectedFile[1]);
      formData.append("image3", selectedFile[2]);
      formData.append("image4", selectedFile[3]);
      formData.append("image4", selectedFile[3]);
                          
                        const croppedImageUrl = getCroppedImg(crop,'newFile.jpeg');
             
                          const fileReaderl = new FileReader()
                          fileReaderl.onloadend = () => {
                            setLast(fileReaderl.result)
                          }   
                           
                            fileReaderl.readAsDataURL(croppedImageUrl)
                          
              
                        formData.append("thumbnail",croppedImageUrl);
                
    }
    id
      ? updateMutation.mutate({ id, data: formData })
      : updateMutation.mutate(formData);
  };
  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: handleSubmit,
    validationSchema: validationSchema,
  });


    

  const updateMutation = useMutation(id ? updateArtwork : addArtwork, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
      toast.error(error.context);
    },
    onSuccess: (data, variables, context) => {
      toast.dark(
        id
          ? "You successfully updated artwork"
          : "You successfully added artwork",
        {
          progress: undefined,
          hideProgressBar: true,
        }
      );
      window.location.href = "/store";
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  const { isLoading, error, data } = useQuery(
    "artists" + id,
    async () => await getArtWith(id),
    {
      refetchOnWindowFocus: false,
      enabled: id ? true : false,
    }
  );

  const { isLoading: isLoadingArtists, data: artists } = useQuery(
    "artists",
    getArtists,
    {
      refetchOnWindowFocus: false,
    }
  );

  const dataURLtoFile = (dataurl, filename) => {
    let arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n)
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, { type: mime })
}

const getCroppedImg = (crop, fileName)=>{
  let image = document.getElementById('preview')

  
      const canvas = document.createElement('canvas');
        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext('2d');
    
        canvas.width = crop.width;
        canvas.height = crop.height;
    

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  );
  let croppedImgUrl = canvas.toDataURL('image/jpeg',1)

  let fl = dataURLtoFile(croppedImgUrl, fileName);
  return fl
}

  useEffect(() => {
    if (!isLoading && id)
      formik.setValues({
        ...data.data.artwork,
        buy_it_now: data.data.artwork.artist_price,
      });
  }, [data]);

  if (isLoading || isLoadingArtists) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;


  return (
    <section id="shop" className="container">
      <div className="dashboard-container">
        <div className="flex column sidebar">
          <DashboardMenu />
        </div>
        <div className="flex column  contact-container dashboard">
          <h2 style={{ marginBottom: "1vw" }}>
            {id ? "Edit Artwork" : "Add Artwork"}
          </h2>
          <form
            encType="multipart/form-data"
            onSubmit={formik.handleSubmit}
            className="contact-form dashboard"
          >
            <PrimarySelect
              formik={formik}
              id="artist_id"
              data={artists.data}
              placeholder="Choose Artist"
            />

            <PrimarySelect
              formik={formik}
              id="category_id"
              data={categories}
              placeholder="Choose Category"
            />

            <PrimaryInput formik={formik} id="title" placeholder="Title" />
            <PrimaryInput formik={formik} id="medium" placeholder="Medium" />
            <PrimaryInput
              formik={formik}
              id="height"
              placeholder="Height"
              type="number"
              step="0.01"
            />
            <PrimaryInput
              formik={formik}
              id="width"
              placeholder="Width"
              type="number"
              step="0.01"
            />
            <PrimaryInput
              formik={formik}
              id="depth"
              placeholder="Depth"
              type="number"
              step="0.01"
            />
            <div style={{ position: "relative" }}>
              <PrimaryInput
                formik={formik}
                id="buy_it_now"
                placeholder="Price GEL"
                disabled={formik.values.request_price === 1 ? true : false}
              />

              <p style={{ position: "absolute", right: 0 }}>
                Final Price: {formik.values.buy_it_now * 1.25} GEL
              </p>
              <p>+ Riabid commission 25%</p>
            </div>
            <div
              className="flex"
              style={{
                justifyContent: "flex-start",
                alignItems: "flex-start",
              }}
            >
              {account_type == 3 ? (
                <p style={{ alignSelf: "center" }}>Without Price</p>
              ) : null}

              {account_type == 3 ? (
                <input
                  value={formik.values.request_price}
                  onChange={(e) => {
                    if (e.target.checked) {
                      formik.setFieldValue("buy_it_now", 0);
                      formik.setFieldValue("request_price", 1);
                    } else {
                      formik.setFieldValue("request_price", 0);
                    }
                  }}
                  type="checkbox"
                  name="request_price"
                  placeholder="Request Price"
                  style={{
                    WebkitAppearance: "button",
                    width: "10%",
                  }}
                ></input>
              ) : null}
            </div>
            <PrimaryInput formik={formik} id="year" placeholder="Year" />

            <textarea
              value={formik.values.description}
              onChange={formik.handleChange}
              rows="5"
              type="text"
              name="description"
              placeholder="Description"
            ></textarea>
            <PrimarySelect
              formik={formik}
              id="product_type"
              data={product_types}
              placeholder="Product type"
            />

            {!id && (
              <div class='photos'>
              <input
                onChange={(e) => {
                  setSelectedFile(e.target.files)
                  if(!preview){
                    const file = e.target.files[0]
                    const fileReader = new FileReader()
                    fileReader.onloadend = () => {
                      setPreview(fileReader.result)
                    }   
                    if(file) {         
                        fileReader.readAsDataURL(file)
                    }
                  }
                }}
                type="file"
                name="images[]"
                multiple
                rows="10"
              ></input>
              
               {preview && (<ReactCrop crop={crop} onChange={c => {
                

                let minAspect = 280/270;
                let maxAspect = 280/270;
                  const newCrop = c;
             
                   if (!maxAspect || !minAspect) setCrop(newCrop);
                   else if (c.width / c.height > maxAspect) {
                     setCrop({ ...newCrop, height: newCrop.width / maxAspect });
                   } else if (newCrop.width / newCrop.height < minAspect) {
                     setCrop({ ...newCrop, height: newCrop.width / minAspect });
                   } else setCrop(newCrop);


                   const croppedImageUrl = getCroppedImg(crop,'newFile.jpeg');
             
                   const fileReaderl = new FileReader()
                   fileReaderl.onloadend = () => {
                     setLast(fileReaderl.result)
                   }   
                    
                     fileReaderl.readAsDataURL(croppedImageUrl)

                }}><img src={preview} alt='preview' id='preview'/></ReactCrop>)}






              </div>
            )}
            
            <input
              style={{ cursor: "pointer" }}
              type="submit"
              value={id ? "Update Artwork" : "Add Artwork"}
            ></input>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EditArtwork;
