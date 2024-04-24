import { Outlet, Link } from "react-router-dom";
import errorillustration from '../Images/404-error-illustration.jpg';

const noPage = () => {
    return (
        <>
        <div style={{display:"inline-flex",flexDirection:"column", justifyContent:"center"}}>
        <img src={errorillustration} alt="404" style={{width:"600px"}}/>
        <button style={{backgroundColor:"#E8FFAF", border:"#1B2E35 1px solid"}}><Link to="/">Go back to home</Link></button>
        </div>
        <Outlet />
    </>
    );
  };
  
  export default noPage;
  