import { Navigate ,Outlet} from 'react-router-dom';
import { useSelector } from 'react-redux';



const PublicRoute=({restricted})=> {
    const token = useSelector(state => state.token);
    return !token && !restricted?<Outlet/>:<Navigate to='home'/>;
}
export { PublicRoute };