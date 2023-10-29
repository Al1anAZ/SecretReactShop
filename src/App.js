import Header from "./components/Header/Header";
import ShoppingCard from "./components/ShoppingCard/ShoppingCard";
import Device  from "./components/Device/Device";
import MyModal from "./components/UI/MyModal/MyModal";

import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosDevices } from "./store/asyncActions/devices";

import style from "./style.scss";

function App() {
const loadingdevices = [<Device loading = {true}/>,<Device loading = {true}/>,<Device loading = {true}/>,<Device loading = {true}/>,<Device loading = {true}/>]

const dispatch = useDispatch();
const devices = useSelector(state => state.devices.devices);
const [showShoppingCard, setShowShoppingCard] = useState(false);

useEffect(()=>{
  dispatch(axiosDevices())
},[dispatch])

  return (
    <div className="Wrapper">
            <Header 
            handleShoppingCard={setShowShoppingCard}
            visibleShoppingCart={showShoppingCard}/>
            <MyModal setVisible={setShowShoppingCard} visible={showShoppingCard}>
               <ShoppingCard 
               setVisible={setShowShoppingCard} 
               visible={showShoppingCard}
               />
            </MyModal> 
     <div className="Body">
        <div className="Slider">

        </div>
       <div className="AllDevices">
          <div style={{display: "flex", justifyContent: "space-between"}}>  
            <h2>Усі<span> девайси:</span></h2>
          {devices.length > 0 ? <div className="Search">
              <div>
                <input placeholder="Я шукаю..."></input>
              </div>
            </div> : null}
         </div>
        <div className="AllDevicesBox">
        {devices.length>0 ? devices.map(device=>
        <Device
          key={device.id}
          device={device}
         />)
         : loadingdevices
        }
        </div>
        </div> 
     </div>
    </div>
  );
}

export default App;
