import axios from "axios";

const axiosInstance = axios.create({
  withCredentials: true,
});

// axiosInstance.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const { response } = error;

//     if (response) {
//       if (response?.status === 401 || response?.status === 403) {

//         if (response.status === 401) {
//           console.log("Interceptor: Unauthorized access");
//           window.location.href = '/handleerror';
//         }

//       } else {
//         return Promise.reject(error);
//       }
//     } else {
//       return Promise.reject(error);
//     }
//   }
// );

export default axiosInstance;
