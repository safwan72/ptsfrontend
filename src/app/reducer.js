
import * as actions from "./actions";
const initstate = {
    token: null,
    user_details:null,
    user_id: null,
    loading: false,
    authmessage: null,
  };


  const reducer = (state = initstate, action) => {
    switch (action.type) {
      case actions.LOADING:
        return {
          ...state,
          loading: action.payload,
        };
      case actions.LOGOUT:
        return {
          ...state,
          token: null,
          user_details:null,
          user_id: null,
          authloading: false,
          authmessage: null,
        };
      case actions.AUTHSUCCESS:
        return {
          ...state,
          token: action.payload.authtoken,
          user_id: action.payload.authdata.id,
          user_details:{
            ...state.user_details,
            username: action.payload.authdata.username,
            user_email: action.payload.authdata.email,
            token_jti:action.payload.authdata.token_jti,
            isAdmin:action.payload.authdata.isAdmin
          },
        };
    //   case actions.AUTHMESSAGE:
    //     return {
    //       ...state,
    //       authloading: false,
    //       authmessage: action.payload,
    //     };
    //     case actions.SET_MODE:
    //       return {
    //           ...state,
    //           mode: action.payload
    //       }
    //   case actions.SET_COLOR:
    //       return {
    //           ...state,
    //           color: action.payload
    //       }
    //   case actions.set:
    //       return {
    //           ...state,
    //           sidebarShow: action.payload
    //       }
      // case actions.PROFILELOADING:
      //   return {
      //     ...state,
      //     profileloading: action.payload,
      //   };
  
    //   case actions.PROFILELOADINGSUCCESS:
    //     return {
    //       ...state,
    //       user_profile: action.payload,
    //     };
  
      // case actions.PRODUCTLOADING:
      //   return {
      //     ...state,
      //     productloading: action.payload,
      //   };
  
      // case actions.PRODUCTLOADINGSUCCESS:
      //   return {
      //     ...state,
      //     productloading: false,
      //     products: action.payload,
      //   };
  
      default:
        return state;
    }
  };
  
  export default reducer;