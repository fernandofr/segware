import React, {
  createContext,
  useCallback,
  useState,
  useContext,
} from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
}

interface SignInCredentials {
  username: string;
  password: string;
}

interface AuthContextData {
  loading: boolean;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  //const [token, setToken] = useState<AuthState>({} as AuthState);
  const [token, setToken] = useState('');
  const [loading, setLoading] = useState(true);
  
  const signIn = useCallback(async ({ username, password }) => {
    const response = await api.post('sign-in', {
      username,
      password,
    });

    const token = response.data;
    console.log(token)
    api.defaults.headers.authorization = `Bearer ${token}`;

    setToken(token);
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ signIn, loading, token }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };