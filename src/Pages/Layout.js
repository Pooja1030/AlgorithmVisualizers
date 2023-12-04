import { Outlet, Link } from "react-router-dom";

const Layout = () => {
    return (
        <>
            <nav>
                <Link to="/"><h2> Algorithm Visualizer</h2></Link>
            </nav>

            <Outlet />
        </>
    )
};

export default Layout;