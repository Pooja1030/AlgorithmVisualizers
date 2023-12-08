import { Outlet, Link } from "react-router-dom";
import errorillustration from '../404-error-illustration.jpg';

const noPage = () => {
    return (
        <>
        <img src={errorillustration} alt="404" style={{width:"400px"}}/>
        <Link to="/"><h1>Go back to home</h1></Link>
        <Outlet />
    </>
    );
  };
  
  export default noPage;
  