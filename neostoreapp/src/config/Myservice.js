import axios from 'axios';
import { MAIN_URL } from './Url';
let token = localStorage.getItem('_token');
export function getPosts() {
    return axios.get(`${MAIN_URL}posts/fetchpost`);
}

// export function getProducts() {
//     return axios.get(`${MAIN_URL}posts/fetchproducts`);
// }

export function getProducts(data) {
    return axios.post(`${MAIN_URL}posts/fetchproducts`,data);
}


export function getCategories() {
    return axios.get(`${MAIN_URL}posts/fetchcategories`);
}

export function getColors() {
    return axios.get(`${MAIN_URL}posts/fetchcolors`);
}

export function getProductBy(data) {
    return axios.get(`${MAIN_URL}posts/fetchproductby/${data}`);
}

export function addPost(data) {
    return axios.post(`${MAIN_URL}posts/addpost`, data);
}


export function socialLogin(data) {
    return axios.post(`${MAIN_URL}posts/sociallogin`, data);
}

export function login(data) {
    return axios.post(`${MAIN_URL}posts/loginstore`, data);
}

export function emailSendOtp(data) {
    return axios.post(`${MAIN_URL}posts/emailsendotp`, data);
}

export function changePasswordOtp(data) {
    return axios.post(`${MAIN_URL}posts/changepasswordotp`, data);
}

export function changePassworold(data) {
    return axios.post(`${MAIN_URL}posts/changepasswordold`, data);
}

export function getProfileData(data) {
    return axios.get(`${MAIN_URL}posts/fetchprofiledata/${data}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export function updateProfileData(data) {
    return axios.post(`${MAIN_URL}posts/updateprofiledata`, data);
}

export function updateProfileImage(data) {
    return axios.post(`${MAIN_URL}posts/updateprofileimage`, data);
}


export function addAddress(data) {
    return axios.post(`${MAIN_URL}posts/addaddress`,data);
}

export function getAddress(data) {
    return axios.get(`${MAIN_URL}posts/fetchaddress/${data}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}

export function getAddressByID(data) {
    return axios.post(`${MAIN_URL}posts/fetchaddressbyid`, data);
}

export function editAddress(data) {
    return axios.post(`${MAIN_URL}posts/editaddress`, data);
}


export function deleteAddress(data) {
    return axios.post(`${MAIN_URL}posts/deleteaddress`, data);
}

export function cartAdd(data) {
    return axios.post(`${MAIN_URL}posts/cartadd`, data);
}


export function cartRemove(data) {
    return axios.post(`${MAIN_URL}posts/cartremove`, data);
}


export function descProductQty(data) {
    return axios.post(`${MAIN_URL}posts/descproductqty`, data);
}


export function getCartData(data) {
    return axios.get(`${MAIN_URL}posts/fetchcartdata/${data}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}


export function addOrder(data) {
    return axios.post(`${MAIN_URL}posts/addorder`, data);
}


export function getOrders(data) {
    return axios.get(`${MAIN_URL}posts/fetchordersdata/${data}`, {
        headers: { "Authorization": `Bearer ${token}` }
    });
}


export function getOrderByID(data) {
    return axios.post(`${MAIN_URL}posts/fetchorderbyid`, data);
}


export function userRating(data) {
    return axios.post(`${MAIN_URL}posts/userrating`, data);
}
