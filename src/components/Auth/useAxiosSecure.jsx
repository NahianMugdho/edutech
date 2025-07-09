// src/hooks/useAxiosSecure.js
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import AuthContext from './AuthContext';


const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useContext(AuthContext);

  const instance = axios.create({
    baseURL: 'http://localhost:3000', // ✅ বা তোমার সার্ভারের URL
  });

  useEffect(() => {
    instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    instance.interceptors.response.use(
      (response) => response,
      async (error) => {
        const status = error.response?.status;
        if (status === 401 || status === 403) {
          await logOut();
          navigate('/login');
        }
        return Promise.reject(error);
      }
    );
  }, [logOut, navigate]);

  return [instance]; // ✅ যেন destructure করে use করা যায়
};

export default useAxiosSecure;
