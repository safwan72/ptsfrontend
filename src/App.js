import React from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import { connect, useSelector } from 'react-redux';
import * as actions from './app/actioncreator';
import RouteElement from './RouteElement';
const mapDispatchToProps = (dispatch)=>{
  return{
      authcheck:()=>dispatch(actions.authcheck())
  }
}
const App = ({authcheck}) => {
  const isAdmin = useSelector(state => state?.user_details?.isAdmin);

  React.useEffect(() => {
    authcheck()
}, [authcheck]);
  return (
    // <Login/>
    <RouteElement isAdmin={isAdmin}/>
  )
}

export default connect(null,mapDispatchToProps)(App);