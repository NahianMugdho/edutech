
import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
  
  });



const AxiosPublic = () => {
    return instance
};

export default AxiosPublic;