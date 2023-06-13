import { Navigate ,Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';



const PrivateRoute=({isAdmin})=> {
    const token = useSelector(state => state.token);
    // authorized so return child components
    return token ?<Outlet/>:<Navigate to='login'/>;
}
export { PrivateRoute };