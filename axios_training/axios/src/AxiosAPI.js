import axios from "axios";

export const getUserData = async() => {
    try{
        const response = await axios
        .get("http://localhost:4000/users")
        console.log(response)
        return response;
    }catch(err){
        console.error(err);
    }
};

export const postUserData = async (userData) => {
    try{
        const response =await axios.post("http://localhost:4000/users", userData);
        console.log(response);
    }catch(err){
        console.error(err);
    }
};

export const deleteUser = async (id) => {
    try{
        const response = await axios.delete(`http://localhost:4000/users/${id}`);
        console.log(response);
    }catch(err){
        console.err(err);
    }
};
