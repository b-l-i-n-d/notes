import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }
    return req;
});

export const fetchNotes = () =>
    API.get(`/notes/${JSON.parse(localStorage.getItem('profile')).result._id}`);
export const createNote = (newNote) => API.post('/notes', newNote);
export const updateNote = (id, updatedNote) => API.patch(`/notes/${id}`, updatedNote);
export const deleteNote = (id) => API.delete(`/notes/${id}`);

export const googleUserInfo = (accessToken) =>
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
export const googleTokenInfo = (accessToken) =>
    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);

export const logIn = (logInFormData) => API.post('./users/login', logInFormData);
export const signUp = (signUpFormData) => API.post('./users/signup', signUpFormData);
