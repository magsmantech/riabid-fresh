import React, { useState, useEffect } from "react";
import addIcon from "../assets/icons/addIcon.png";
import { useQuery, useMutation,useQueryClient } from "react-query";
import { getMyBiography, addBiography, updateBiography } from "../services/dashboardService";
import { toast } from "react-toastify";
import Loading from "../containers/loading";

export default function DashboardHeader(){
    const [text, setText] = useState('');
    const [image, setImage] = useState(null);
    const [update, setUpdate] = useState(false);
    const [updated,setUpdated] = useState(true);
    const { isLoading, error, data } = useQuery("bio", getMyBiography, {refetchOnWindowFocus: false,});

    let name, description, img;
    if (data && data.data) {
      name = data.data.artist_name;
      description = data.data.description;
      img = data.data.image;
      if(data.data.description && update == false){
        setUpdate(true);
        if(!text){
          setText(description);
        }
      }
    }

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
          setUpdated(true);
          //window.location.reload();
        },
        onSettled: (data, error, variables, context) => {
          // Error or success... doesn't matter!
        },
      })

      
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
      
      setUpdated(true);
      //window.location.reload();
    },
    onSettled: (data, error, variables, context) => {
      // Error or success... doesn't matter!
    },
  });

  
    useEffect(()=>{
      if (data && data.data) {
        setText(data.data.description)
      }
  
    }, [update]) 

    if (isLoading) return <Loading></Loading>;

    if (error) return "An error has occurred: " + error.message;

  const _handleSubmit = (e) => {
    e.preventDefault();
    
    const formData = new FormData();

    formData.append('description', text);
    formData.append('image', image);

    if (update) {
      updateMutation.mutate(formData);
      return;
    }

    addMutation.mutate(formData);
  }

    return     <form onSubmit={_handleSubmit}>
    <div className="profile">
      <div className="row profileBioUp">
        <div className='col-md-5'>
          <h1>{name}</h1>
        </div>
        <div className='col-md-4'>
        <textarea name="text" placeholder="Add Your Bio" onChange={(e)=> setText(e.target.value)}
                value={text}
              ></textarea>
      </div>
      <div className='offset-md-1 col-md-1'>
      <div className="bUpdate">
        <div className="img plusHover">
        <input type="file" name="image" onChange={(e)=> setImage(e.target.files && e.target.files[0])} />
          <div className="plus">
            <svg viewBox="0 0 110 110" fill="none">
              <rect width="100%" height="100%" fill="none"/>
              <path d="M54.6274 32V77.2549"  stroke-linejoin="round"/>
              <path d="M32 54.6274H77.2548"  stroke-linejoin="round"/>
            </svg>
          </div>          
        </div>

        <button className={updated ? "updateBio active" : "updateBio"}>{updated ? "UPDATED" : "UPDATE INFO"}</button>
        </div>

      </div>
      
      </div>
    </div>
      </form>
}