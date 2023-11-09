import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { addToCart,setVisibleCart } from "../../store/CartSlice";
import { addToFavorites,deleteFromFavorites } from "../../store/DevicesSlice";
import MySlider from "../../components/UI/MySlider/MySlider";
import MyButton from "../../components/UI/MyButton/MyButton";
import classes from "./DevicePage.module.scss";

function DevicePage(){
    const {codeddevice} = useParams();
    const dispatch = useDispatch();
    const favoriteItems = useSelector(state=> state.devices.favorites)
    const device = JSON.parse(decodeURIComponent(codeddevice));
    const isFavorite  = favoriteItems.find(item=> item.id === device.id);
    function handleFavorite(action, item){
        if(action)
        dispatch(deleteFromFavorites(item))
         else
         dispatch(addToFavorites(item))
     }
    return(
        <div className={classes.DevicePageBody}>
             <MySlider>
                <img src={device.src} alt="Device"/>
                <img src={device.src} alt="Device"/>
                <img src={device.src} alt="Device"/>
                <img src={device.src} alt="Device"/>
                <img src={device.src} alt="Device"/>
             </MySlider>
             <div className={classes.DiviceDiscription}>
                 <h2>{device.name}</h2>
                 <hr/>
                 <div className={classes.PriceAndButtonsBOX}>
                   <div className={classes.PriceAndFavorite}>
                   <span>{device.price} грн</span>
                   <span style={{cursor: "pointer"}} onClick={()=>handleFavorite(isFavorite,device)}><img  src={isFavorite ? "../imgs/UI/Liked.svg" : "../imgs/UI/Unliked.svg"} alt="Heart" width={24} height={24} style={{marginRight: 5}}/>{!isFavorite && `В oбранe`}</span>
                   </div>
                   <div className={classes.Buttons}>
                        <MyButton handle={()=>{
                            dispatch(addToCart({...device, count: 1}))
                            dispatch(setVisibleCart(true))
                            }}>Купити в один клік</MyButton>
                        <MyButton handle={()=>dispatch(addToCart({...device, count: 1}))}>У кошик</MyButton>
                   </div>
                 </div>
                 <hr/>
                 <div>
                     <div className={classes.BottomDescription}>
                        <h3>Опис товару: </h3>
                        <span>{device.description}</span>
                     </div>
                     <div className={classes.BottomDescription}>
                        <h3>Оплата: </h3>
                        <span>Оплата під час отримання товару, Оплата карткою у відділенні, Картою онлайн, Google Pay, Безготівковими для юридичних осіб, Оплатити онлайн соціальною картою "Пакунок малюка", Безготівковий для фізичних осіб, Apple Pay, Visa, Оплатити онлайн картою "єПідтримка", Mastercard.</span>
                     </div>
                     <div className={classes.BottomDescription}>
                        <h3>Гарантія: </h3>
                        <span>12 місяців Обмін/повернення товару впродовж 14 днів.</span>
                     </div>
                 </div>
             </div>
        </div>
    );
}
export default DevicePage

