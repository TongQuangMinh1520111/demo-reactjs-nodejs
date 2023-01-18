import { createContext, useReducer } from "react";
export const Auth = createContext();

const initialState = {
  renderPage: false
};


function reducer(state, action)  {
  switch (action.type) {
    case 'CHECK_RENDER_TRUE':
      return {
        ...state,
        renderPage: true,
      };
    case 'CHECK_RENDER_FALSE':
      return {
        ...state,
        renderPage: false,
      };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  return <Auth.Provider value={value}>{children}</Auth.Provider>;
}