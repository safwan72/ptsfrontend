import { Navigate ,Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';



const AdminRoutes=({isAdmin})=> {
    const token = useSelector(state => state?.token);
    // authorized so return child components
    return token && isAdmin?<Outlet/>:<Navigate to='/'/>;
}
export { AdminRoutes };