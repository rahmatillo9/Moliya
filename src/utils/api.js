// import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import jwtDecode from "jwt-decode";

// const apiRequest = async (url, options = {}) => {
//   const { token, refreshAccessToken, logout } = useAuth();

//   if (!token) {
//     logout();
//     return;
//   }

//   const decodedToken = jwtDecode(token);
//   const currentTime = Date.now() / 1000;

//   if (decodedToken.exp < currentTime) {
//     await refreshAccessToken();
//   }

//   return axios({
//     url,
//     ...options,
//     headers: { Authorization: `Bearer ${localStorage.getItem("authToken")}` },
//   });
// };

// export default apiRequest;
