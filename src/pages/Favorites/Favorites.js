import { useSelector } from "react-redux";
import Device from "../../components/Device/Device";
import classes from "./Favorites.module.scss"

function Favorites(){
    const favDevices = useSelector(state=> state.devices.favorites)
    return(
       <div className={classes.FavoriteDevices}>
           <h2>Обрані <span>товари:</span></h2>
         <div className={classes.AllFavoriteDevices}>
             {favDevices.length ? favDevices.map(device=>
                <Device
                 infavorite
                 key={device.id}
                 device={device}
                />
             ) : <h2 style={{textAlign: "center"}}>Немає <span>обраних</span> товарів <br/>&#128542;</h2>}
         </div>
       </div>
    );
}

export default Favorites