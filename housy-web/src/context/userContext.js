import { createContext , useReducer } from "react";
import jwtDecode from "jwt-decode";

export const UserContext = createContext()

const initialState = {
    isLogin: false,
    user: {},
    role: '',
};

const reducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case "USER_SUCCESS":
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", payload.token);
      const role = jwtDecode(payload.token);
      return {
        isLogin: true,
        user: payload,
        role: role.role,
      };
    case "AUTH_ERROR":
    case "LOGOUT":
      localStorage.clear();
      return {
        isLogin: false,
        user: {},
        role:'',
      };
    default:
      throw new Error();
  }
};


export const UserContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // console.log("Context", state)
  
  return (
    <UserContext.Provider value={[state, dispatch]}>
        {children}
      </UserContext.Provider>
    );
  };

