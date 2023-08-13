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
import addArtworkIcon from "../../assets/icons/addArtwork.svg";
import DashboardMenu from "../../components/shared/dashboard-menu";
import DashboardHeader from "../../components/dashboardHeader";
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
import addIcon from "../../assets/icons/addIcon.png";
import axios from "axios";

function EditArtwork(props) {
  var { account_type } = jwt_decode(getJwt());
  const { id } = useParams();

  const [selectedFile, setSelectedFile] = useState([null,null,null,null]);
  const [state, setState] = useState({
    ip: "",
    countryName: "",
    countryCode: "",
    city: "",
    timezone: "",
    country:''
  });


  const getGeoInfo = () => {
    axios
      .get("https://ipapi.co/json/")
      .then((response) => {
        let data = response.data;
        setState({
          ...state,
          ip: data.ip,
          country:data.country,
          countryName: data.country_name,
          countryCode: data.country_calling_code,
          city: data.city,
          timezone: data.timezone
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getGeoInfo();
  }, []);

  const [imageRef, setImageRef] = useState(null);
  const [preview, setPreview] = useState([null,null,null,null]);
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
    formData.append("buy_it_now", buy_it_now * 1.3);
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

  useEffect(() => {
    if (!isLoading && id){
      formik.setValues({
        ...data.data.artwork,
        buy_it_now: data.data.artwork.artist_price,
      });
      let images = JSON.parse(data.data.artwork.images);
      let pr = [...preview];
      for(let i=0;i<images.length;i++){
                    if(images[i].url){                      
                      pr[i] = images[i].url;                     
                    }
                  }
                  setPreview(pr)
                    
    }
  }, [data]);

  if (isLoading || isLoadingArtists) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;


  return (
    <section className='paddingLeft'>
      
      <DashboardHeader></DashboardHeader>

      <div className='row'>
        <div className='col-12'>
          <ul class="trendMenu allMenu inProfile">
            <li className="active"><a href="/dashboard">my artworks</a></li>
            <li  ><a href="/dashboard" >saved</a></li>
            <li ><a href="/dashboard">order history</a></li>
            <li ><a href="/dashboard">details</a></li>
          </ul>
        </div>
      </div>

        <div className="addPage">
            <div className="pics">
                  <div className="picBox">
                    <div className="labelName">Main image</div>
                    <div className="picture">
                    <div className="pics">
                    <a href="#" >
                      <img src={preview[0] ? preview[0] : addArtworkIcon} />
                     
      
              <input
                onChange={(e) => {
                selectedFile[0] = e.target.files[0];
                    setSelectedFile(selectedFile)                        
                    const file = e.target.files[0]
                    const fileReader = new FileReader()
                    fileReader.onloadend = () => {
                      let pr = [...preview];
                      pr[0] = fileReader.result;
                      setPreview(pr)
                    }   
                    if(file) {         
                        fileReader.readAsDataURL(file)
                    }                  
                }}
                type="file"
                name="images"
              />
     
            
                    </a>
                    </div>
                  </div>  
                </div>  

                <div className="picBox addonImages">
                    <div className="labelName">More images</div>
                    <div className="picture">
                      <div className="pics">
                        <a href="#">
                          <img src={preview[1] ? preview[1] : addIcon} />
                          <input
                onChange={(e) => {
                selectedFile[1] = e.target.files[0];
                    setSelectedFile(selectedFile)                        
                    const file = e.target.files[0]
                    const fileReader = new FileReader()
                    fileReader.onloadend = () => {
                      let pr = [...preview];
                      pr[1] = fileReader.result;
                      setPreview(pr)
                    }   
                    if(file) {         
                        fileReader.readAsDataURL(file)
                    }                  
                }}
                type="file"
                name="images"
              />
                        </a>

                        <a href="#">
                          <img src={preview[2] ? preview[2] : addIcon} />
                          <input
                onChange={(e) => {
                selectedFile[2] = e.target.files[0];
                    setSelectedFile(selectedFile)                        
                    const file = e.target.files[0]
                    const fileReader = new FileReader()
                    fileReader.onloadend = () => {
                      let pr = [...preview];
                      pr[2] = fileReader.result;
                      setPreview(pr)
                    }   
                    if(file) {         
                        fileReader.readAsDataURL(file)
                    }                  
                }}
                type="file"
                name="images"
              />
                        </a>

                        <a href="#" className="lastM">
                          <img src={preview[3] ? preview[3] : addIcon} />
                          <input
                onChange={(e) => {
                selectedFile[3] = e.target.files[0];
                    setSelectedFile(selectedFile)                        
                    const file = e.target.files[0]
                    const fileReader = new FileReader()
                    fileReader.onloadend = () => {
                      let pr = [...preview];
                      pr[3] = fileReader.result;
                      setPreview(pr)
                    }   
                    if(file) {         
                        fileReader.readAsDataURL(file)
                    }                  
                }}
                type="file"
                name="images"
              />
                        </a>
                    </div>
                    <div className="labelName smallSize" >Please upload high-quality photos of the work's front and back with no frames.</div>
                  </div>  
                  
                </div>              
            </div>
            <form
            encType="multipart/form-data"
            onSubmit={formik.handleSubmit}
            className="submitArtwork dashboard"
          >
        <div className="firstForm">
          <div className="row">
            <div className='col-md-6'>
              <div className="labelName noMargin">Artist</div>
              <div className="col-md-10">
              <PrimarySelect
                formik={formik}
                id="artist_id"
                data={artists.data}
                placeholder="Choose Artist"
              />
              </div>
          </div>
          <div className='col-md-6'>
             
          </div>


          <div className='col-md-6'>
              <div className="labelName">Artwork</div>
              <div className="col-md-10">
              <PrimaryInput formik={formik} id="title" placeholder="Add title or write Untitled" />
              </div>
          </div>

          <div className='col-md-6'>
              <div className="labelName">Year</div>
              <div className="col-md-12">
              <PrimaryInput formik={formik} id="year" placeholder="Year" />
              </div>
          </div>

          <div className='col-md-12'>
              <div className="labelName">Description</div>
              <div className="col-md-12">
                <textarea
                value={formik.values.description}
                onChange={formik.handleChange}
                rows="5"
                type="text"
                name="description"
                placeholder="Description"
              ></textarea>
              </div>
          </div>


          <div className='col-md-6'>
          <div className="labelName">Category</div>
              <div className="col-md-12">
              <PrimarySelect
              formik={formik}
              id="category_id"
              data={categories}
              placeholder="Choose Category"
            />
              </div>
          </div>
          <div className='col-md-6'>
          <div className="labelName">Materials</div>
              <div className="col-md-12">
              <PrimarySelect
              formik={formik}
              id="product_type"
              data={product_types}
              placeholder="Product type"
            />
              </div>
          </div>


          <div className='col-md-12'>
          <div className="labelName relative">Sizes</div>
          <div className='row'>
              <div className="col-md-3 relative">
              <PrimaryInput
              formik={formik}
              id="width"
              placeholder="Width"
              type="number"
              step="0.01"
            />
            <label className='cm'>cm</label>
              </div>
              <div className="col-md-3 relative">
              <PrimaryInput
              formik={formik}
              id="height"
              placeholder="Height"
              type="number"
              step="0.01"
            />
           <label className='cm'>cm</label>
              </div>
              <div className="col-md-3 relative">
              <PrimaryInput
              formik={formik}
              id="depth"
              placeholder="Depth"
              type="number"
              step="0.01"
            />
            <label className='cm'>cm</label>
              </div>
              <div className="col-md-3 relative">
              <PrimaryInput formik={formik} id="medium" placeholder="Medium" />
              <label className='cm'>cm</label>
              </div>

              </div>
          </div>

          <div className='col-md-12'>
          <div className="labelName">Price</div>
          <div className='row'>
              <div className="col-md-3">
               
                <PrimaryInput
                  formik={formik}
                  id="buy_it_now"
                  placeholder={"Price USD"}
                  disabled={formik.values.request_price === 1 ? true : false}
                />
                 <label className='cm'>USD</label>
               
          </div>
          <div className='col-md-9 relative'>
          <p className='fees'>+30% riabid fees

            <span>{(formik.values.buy_it_now * 1.30).toFixed(2)} USD</span>

            <label className='cm totalText'>Total</label>
          </p>
        
          </div>
        
              </div>
          </div>


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
         

       
            

           
            
          
        </div>
        <button
            className="submitArtworkButton"
              type="submit"
            >{id ? "UPDATE ARTWORK" : "SUBMIT ARTWORK"}</button>
          </form></div>
     
    </section>
  );
}

export default EditArtwork;
