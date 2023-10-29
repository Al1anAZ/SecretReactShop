import classes from "./MyButton.module.scss"

function MyButton({children, inlinestyle,handle, disable = false}){
  const rootClass = [classes.MyButton]
  if(disable){
    rootClass.push(classes.disable)
  }

    return(
      <button className={rootClass.join(" ")} style={inlinestyle} onClick={handle} disabled={disable}>
        {children}
      </button>
    );
}
export default MyButton