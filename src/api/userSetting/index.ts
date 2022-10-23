import AuthAxios from "../../utils/AuthAxios";

const getLinks = () => AuthAxios(`/links`);
const createLinks = (data) => AuthAxios.post(`/links`,data);
const editLinks  = (id) => AuthAxios.delete(`/links/${id}`);
const deleteLinks  = (id) => AuthAxios.delete(`/links/${id}`);

export {
    getLinks,
    createLinks,
    deleteLinks,
    editLinks

}