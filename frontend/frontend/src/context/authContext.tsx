import React, { createContext, useReducer, ReactNode, Dispatch } from 'react';

// Define the shape of the context value
interface AuthContextValue {
  user: User | null;
  dispatch: Dispatch<AuthAction>;
}

// Define the shape of a user (you should define your actual User type)
interface User {
  // Define the properties of your User type
  // Example: id, name, email, etc.
}

// Define the shape of an authentication action
type AuthAction = { type: 'LOGIN'; payload: User } | { type: 'LOGOUT' };

// Create the context with an initial value matching the AuthContextValue interface
export const AuthContext = createContext<AuthContextValue>({
  user: null,
  dispatch: () => {},
});

// Define the reducer function
const authReducer: React.Reducer<AuthContextValue, AuthAction> = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    default:
      return state;
  }
};

interface AuthContextProviderProps {
  children: ReactNode;
}

const initialState: AuthContextValue = {
  user: null,
  dispatch: () => {},
};

// AuthContextProvider component
export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  console.log('AuthContext state: ', state);

  return (
    <AuthContext.Provider value={{ user: state.user, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};