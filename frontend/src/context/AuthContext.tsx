import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { AuthClient } from '@dfinity/auth-client';
import { createActor } from '../service/agent';

export const AuthContext = createContext<any>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [actor, setActor] = useState<any>(null);
  const [authClient, setAuthClient] = useState<any>(null);

  useEffect(() => {
    AuthClient.create().then(async (client) => {
      setAuthClient(client);
      const isAuthenticated = await client.isAuthenticated();
      if (isAuthenticated) {
        handleAuthenticated(client);
      }
    });
  }, []);

  const login = async () => {
    return new Promise<void>(async (resolve, reject) => {
      if (!authClient) return reject('Auth client not initialized');
      await authClient.login({
        identityProvider: `http://localhost:4943/?canisterId=YOUR_INTERNET_IDENTITY_CANISTER_ID`,
        onSuccess: () => {
          handleAuthenticated(authClient);
          resolve();
        },
        onError: reject,
      });
    });
  };

  const handleAuthenticated = (client) => {
    const identity = client.getIdentity();
    const user = identity.getPrincipal();
    setUser(user);
    setIsAuthenticated(true);
    const actor = createActor(identity);
    setActor(actor);
  };

  const logout = async () => {
    if (!authClient) return;
    await authClient.logout();
    setIsAuthenticated(false);
    setUser(null);
    setActor(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, actor }}>
      {children}
    </AuthContext.Provider>
  );
};
