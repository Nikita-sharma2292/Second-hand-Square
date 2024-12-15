import axiosClient from "./axiosClient";

const backendAPIs = {
    registerUser: (data) => {
        const url = '/register';
        return axiosClient.post(url, data);
    },
    loginUser: (data, params) => {
        const url = '/login';
        return axiosClient.post(url, data, params);
    },
    logoutUser: (token, params) => {
        const url = '/logout';
        return axiosClient.get(url, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    },
    changePassword: (data, token, params) => {
        const url = '/change-password';
        return axiosClient.post(url, data, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    },
    updateProfile: (data, token, params) => {
        const url = '/update-profile';
        return axiosClient.post(url, data, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    },
    deleteAccount: (token, params) => {
        const url = '/delete-account';
        return axiosClient.get(url, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    },
    getMyAdds: (token, params) => {
        const url = '/my-adds';
        return axiosClient.get(url, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    },
    getAllProducts: (params) => {
        const url = '/';
        return axiosClient.get(url, params);
    },
    categoryProducts: (data, params) => {
        const url = '/category/'+data.category+'/'+data.subCategory;
        return axiosClient.get(url, params);
    }, 
    addProduct: (data, token, params) => {
        const url = '/add/'+data.category+'/'+data.subCategory;
        return axiosClient.post(url, data, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }});
    }, 
    getProductById: (id, params) => {
        const url = '/product-details/'+id;
        return axiosClient.get(url, params);
    },
    addToCart: (id, token, params) => {
        const url = '/add-cart';
        return axiosClient.post(url, id, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    },
    deleteFromCart: (id, token, params) => {
        const url = '/delete-cart';
        return axiosClient.post(url, id, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    },
    getCart: (token, params) => {
        const url = '/cart';
        return axiosClient.get(url, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
            }});
    },
    deleteMyAdd: (id, token, params) => {
        const url = '/delete-add';
        return axiosClient.post(url, id, { 
            params, 
            headers: {
                Authorization: `Bearer ${token}`,
        }});
    },
}

export default backendAPIs;
