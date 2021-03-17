import { ReactReduxContext } from "react-redux";
import { HTTP_LOGIN_FAILED, HTTP_LOGIN_FETCHING, HTTP_LOGIN_SUCCESS, OK, server, YES } from "../constants";
import { httpClient } from "./../utils/HttpClient"

export const setLoginStateToFetching = () => ({
    type: HTTP_LOGIN_FETCHING
})

export const setLoginStateToSuccess = (payload) => ({
    type: HTTP_LOGIN_SUCCESS,
    payload
})

export const setLoginStateToFailed = () => ({
    type: HTTP_LOGIN_FAILED
})

export const autoLogin = (history) => {
    return () => {    
      if (localStorage.getItem(server.LOGIN_PASSED)  == YES){      
        setTimeout(()=>history.push("/stock"), 100)         
      }
    } 
  }

export const login = (history, credential)=>{
    return async (dispatch, getState)=>{
        dispatch(setLoginStateToFetching());
        let result = await httpClient.post(server.LOGIN_URL, credential);
        if (result.data.result == OK) {
            localStorage.setItem(server.LOGIN_PASSED, YES);
            getState().appReducer.app.forceUpdate();
      
            history.push("/stock");
            dispatch(setLoginStateToSuccess(result));
          } else {
            dispatch(setLoginStateToFailed());
          }
    }
}
