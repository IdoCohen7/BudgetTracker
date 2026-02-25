import api from "../api/axiosInstance";

const authService = {
  getUser: (id) => {
    let url = `/api/Auth/${id}`;
    return api.get(url);
  },
  Register: (name, email, password, passwordConfirm) => {
    return api.post("/api/Auth", {
      name,
      email,
      password,
      passwordConfirm,
    });
  },
  Login: (email, password) => {
    return api.post("/api/Auth/Login", {
      email,
      password,
    });
  },
};

export default authService;
