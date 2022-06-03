/* eslint-disable import/prefer-default-export */
import axios from 'axios';

const url = 'http://localhost:5000/notes';

export const fetchNotes = () => axios.get(url);
export const createNote = (newNote) => axios.post(url, newNote);
export const updateNote = (id, updatedNote) => axios.patch(`${url}/${id}`, updatedNote);
export const deleteNote = (id) => axios.delete(`${url}/${id}`);
export const googleUserInfo = (accessToken) =>
    axios.get(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${accessToken}`);
export const googleTokenInfo = (accessToken) =>
    axios.get(`https://www.googleapis.com/oauth2/v3/tokeninfo?access_token=${accessToken}`);
