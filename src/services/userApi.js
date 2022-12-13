import axiosClient from './axiosClient';

const userApi = {
  login(data) {
    const url = '/auth/login';
    return axiosClient.post(url, data);
  },

  logout(id) {
    const url = `/auth/logout/${id}`;
    return axiosClient.post(url);
  },

  get(id) {
    const url = `/auth/user/${id}`;
    return axiosClient.get(url);
  },
};

export default userApi;
