import { useSelector } from "react-redux";
import Device from "../../components/Device/Device";
import classes from "./Home.module.scss"
import { useMemo, useState } from "react";

function Home(){
  const [search,setSearch] = useState("");
    const loadingdevices = [<Device key={0} loading = {true}/>,<Device  key={1} loading = {true}/>,<Device  key={2} loading = {true}/>,<Device  key={3} loading = {true}/>,<Device key={4}  loading = {true}/>]
    const devices = useSelector(state => state.devices.devices);
    const searchedQuerry = useMemo(()=>{
        return devices.filter(item=> item.name.toLowerCase().includes(search.toLocaleLowerCase()))
    },[search])
    return(
      <>
          <div className={classes.Slider}>
           </div>
       <div className={classes.AllDevices}>
        <div style={{display: "flex", justifyContent: "space-between"}}>  
           {search.length ? <h2>Результати<span> пошуку:</span> {`"${search}"`}</h2> :<h2>Усі<span> девайси:</span></h2>}
              {devices.length ? 
              <div className={classes.Search}>
                 <div>
                   <input placeholder="Я шукаю..." onChange={(e)=>setSearch(e.target.value)}></input>
                 </div>
             </div> : null}
           </div>
          <div className={classes.AllDevicesBox}>
            { search.length ? 
             searchedQuerry.length ?  
             searchedQuerry.map(device=>
              <Device
               key={device.id}
               device={device}
              />) 
              : 
              <h2>Нічого<span>  не знайдено</span>&#128542;</h2>
            : 
            devices.length ? devices.map(device=>
              <Device
               key={device.id}
               device={device}
              />)
               : loadingdevices

            }
            
            </div>
         </div> 
      </>
    );
}

export default Home