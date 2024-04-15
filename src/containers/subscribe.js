import React, { useEffect,useState } from "react";
import { getSubscribes,getDetails,createPackagePayment } from "../services/subscribeService";
import { useQuery,useMutation } from "react-query";
import Loading from "./loading";
import { MetaTags } from "react-meta-tags";
import { userProvider } from "../store/store";
import closeActiveSub from '../assets/closeActiveSub.svg'

function Subscribe(props) {
    const { currentUser, setCurrentUser } = userProvider();
    const [title, setName] = useState("");
    const [phone,setPhone] = useState("");
    const [email,setEmail] = useState("");
    const [gallery,setGallery] = useState("");
  const { isLoading, error, data } = useQuery("subscribes", getSubscribes, {
    refetchOnWindowFocus: false,
  });
  const [activePackage,setActivePackage] = useState(0);
  const [buyPack,setBuyPack] = useState(0);
    
  useEffect(()=>{
        getDetails().then(item=>{
            setActivePackage(item?.data?.package_id)
        })
  },[])
  

  const orderMutation = useMutation(createPackagePayment, {
    onMutate: (variables) => {
      return { id: 1 };
    },
    onError: (error, variables, context) => {
        console.log(error)
    },
    onSuccess: (data, variables, context) => {
      console.log(data)
        window.location.href = "https://api.riabid.com/api/packages/payorder/"+data.data.transaction.id;
    },
    onSettled: (data, error, variables, context) => {
 
    },
  });

  
  if (isLoading) return <Loading></Loading>;

  if (error) return "An error has occurred: " + error.message;



  return (
    <section className='paddingLeft'>
      <MetaTags>
        <title>Art Galleries on Ria Bid</title>
        <meta
          name="description"
          content="Browse digital galleries.Travel digital art."
        />
        <meta
          name="keywords"
          content="art gallery, art online, galleries, sell art, decorative art,Discover Contemporary Artists, contemporary artists from Georgia,georgian contemporary artists,"
        />
      </MetaTags>

      <div className="subscribePage">
        <h1>Subscribe</h1>
        <div className="row">
            <div className="subscribeText col-md-8">
                <p>Enjoy full access to the Georgian art scene. Become a devoted member of Ria Keburia Foundation and get the best privileges for your gallery.</p> 
    <p class='secondText'>Sell, share and admire Georgian art.</p>
            </div>
        </div>
        {data.data && <div className="row subscribeRow">
            {data.data.map(item => { return <div className="col-md-4" key={item.id}>
                <div className={item.id == activePackage ? 'subscribeBox active' : "subscribeBox"}>
                    {buyPack && buyPack != item.id ? <div className="opacityH"></div> : ''}
                    <div className={buyPack && buyPack == item.id ? "padL withoutMarg" : "padL"}>
                        <h2>{item?.title} {buyPack && buyPack == item.id ? <img src={closeActiveSub} className="closeActiveSub" onClick={()=>{setBuyPack(0)}} /> : ""}</h2>

                        {buyPack && buyPack == item.id ? <div className="inputsF">
                            <p>
                            You’re about to submit annual price for this plan is {item.price}$.</p>
                            <p>Please fill out the form, and we'll get in touch with you to confirm the convenient payment method.</p>


                            <div className="subForm">
                                <input placeholder="Name" value={title} onChange={(e) => setName(e.target.value)}/>
                                <input placeholder="Phone"  value={phone} onChange={(e) => setPhone(e.target.value)}/>
                                <input placeholder="Email"  value={email} onChange={(e) => setEmail(e.target.value)}/>
                                <input placeholder="Gallery" value={gallery} onChange={(e) => setGallery(e.target.value)} />
                            </div>

                        </div> : <div className='description' dangerouslySetInnerHTML={{__html: item.description}}>
                            
                        </div>}
                    
                    </div>

                    <div className="price">
                        {buyPack && buyPack == item.id ? '' : <p>Annual</p>}
                        {buyPack && buyPack == item.id ? '' :<span className="price">{item.price}$</span>}

                        {buyPack && buyPack == item.id ? <button className="activeSub" onClick={() => orderMutation.mutate({id:item.id,name:title,phone:phone,email:email,gallery:gallery})}>SUBMIT</button> : <button onClick={()=>{setBuyPack(item.id)}} disabled={item.id == activePackage}>{item.id == activePackage ? "CURRENT PLAN" : "SUBSCRIBE"}</button>}
                    </div>

          

                </div>
            </div> 
        })}
        </div>}
      </div>
    </section>
  );
}

export default Subscribe;
