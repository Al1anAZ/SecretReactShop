import classes from "./Device.module.scss"
import MyButton from "../UI/MyButton/MyButton";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/CartSlice";
import { addToFavorites,deleteFromFavorites } from "../../store/DevicesSlice";
import ContentLoader from "react-content-loader";

function Device({device,loading = false}){
    const dipatch = useDispatch();
    const favoriteItems = useSelector(state=> state.devices.favorites)
    let isFavorite;
    if(!loading){
        isFavorite = favoriteItems.find(item=> item.id === device.id)
    }
    function handleFavorite(action, item){
       if(action)
          dipatch(deleteFromFavorites(item))
        else
          dipatch(addToFavorites(item))
    }
    return(
        <>
        {loading ? 
        <div className={classes.Device}>
           <ContentLoader 
               speed={2}
               width={270}
               height={357}
               viewBox="0 0 270 357"
               backgroundColor="#f3f3f3"
               foregroundColor="#ecebeb"
            >
          <rect x="40" y="235" rx="5" ry="5" width="190" height="20" /> 
          <rect x="60" y="20" rx="5" ry="5" width="153" height="189" /> 
          <rect x="65" y="275" rx="5" ry="5" width="135" height="20" /> 
          <rect x="27" y="319" rx="5" ry="5" width="216" height="36" />
         </ContentLoader>
        </div>
         :
        <div className={classes.Device}>
              <div className={classes.LikeBox}>
                  <img src={isFavorite ? "../SecretReactShop/imgs/UI/Liked.svg" : "../SecretReactShop/imgs/UI/Unliked.svg"} style={{ cursor: "pointer"}}alt="Heart" width={24} height={24} onClick={()=> handleFavorite(isFavorite,device)}/>
              </div>
                <img src={device.src}alt="Device" width={170} height={189}/>
            <div className={classes.DeviceText}>
             <b>{device.name}</b>
             <hr/>
             <p>{device.price} грн.</p>
            </div>
           <MyButton inlinestyle={MyButtonStyle}
            handle={()=>dipatch(addToCart({...device, count: 1}))}>
                Купити</MyButton>
       </div>}

         </>
    );
}
const MyButtonStyle = {
    fontSize: 20,
    height: 36,
    width: 216,
    borderRadius: "2px 2px 17px 17px"
}
export default Device