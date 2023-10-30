import classes from "./Device.module.scss"
import MyButton from "../UI/MyButton/MyButton";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/CartSlice";
import { addToFavorites,deleteFromFavorites } from "../../store/DevicesSlice";

function Device({device,loading = false}){
    const dipatch = useDispatch();
    const favoriteItems = useSelector(state=> state.devices.favorites)
    let isFavorite;
    const rootClass = [classes.Device]
    if(loading){
        rootClass.push(classes.loading)
    }
    else{
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
        <div className={rootClass.join(" ")}>
            <div className={classes.LoadingImg}></div>
            <div className={classes.LoadingName}></div>
            <div className={classes.LoadingPrice}></div>
            <MyButton  disable inlinestyle={LoadingMyButtonStyle}></MyButton>
        </div>
         :
         
        <div className={rootClass.join(" ")}>
            {
              <div style={{marginBottom: 10,width: "100%",textAlign: "end",paddingRight: 27}}>
                  <img src={isFavorite ? "/imgs/Ui/Liked.svg" : "/imgs/Ui/Unliked.svg"} style={{ cursor: "pointer"}}alt="Heart" width={24} height={24} onClick={()=> handleFavorite(isFavorite,device)}/>
              </div>
            }
                <img src={device.src} alt="Device" width={153} height={189}/>
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
const LoadingMyButtonStyle ={
    fontSize: 20,
    height: 36,
    width: 216,
    borderRadius: "2px 2px 17px 17px",
}
export default Device