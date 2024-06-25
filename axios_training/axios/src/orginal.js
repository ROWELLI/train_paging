import React, { useEffect, useState } from "react";
import { deleteUser, getUserData, postUserData } from "./AxiosAPI";
import styled from "styled-components";

const App = () => {
  // 유저 정보를 저장하는 변수
  const [userData, setUserData] = useState([]);

  // 전체 데이터 불러오기
  useEffect(() => {
    // your code here
    const fetchData = async () =>{
      try{
        const response = await getUserData();
        setUserData(response.data);
        //console.log(userData);
      }catch(error){
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // 추가하려는 유저 정보를 저장하는 변수
  const [newUserData, setNewUserData] = useState(() => initialState);

  // 데이터를 추가하는 핸들러
  const handlePostData = async () => {
    // your code here
    try{
      const response = await postUserData(newUserData);
      const userDataset = await getUserData();
      setUserData(userDataset.data);
      console.log(response);
    }catch(err){
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteData = async (id) => {
    // your code here
    try{
      const response = await deleteUser(id);
      const userDataset = await getUserData();
      setUserData(userDataset.data);
    }catch(err){
      console.log(err);
    }
  };

  const handleApiError = (error, errorMessage) => {
    console.error(errorMessage, error);
  };

  return (
    <DivContainer>
      <PageTitle>User Data 가져오기</PageTitle>
      <UserDataTable userData={userData} handleDeleteData={handleDeleteData} />
      <UserDataForm
        newUserData={newUserData}
        handleInputChange={handleInputChange}
        handlePostData={handlePostData}
      />
    </DivContainer>
  );
};

// 데이처 초기화
const initialState = {
  id: null,
  name: "",
  age: null,
  part: "",
  image: "",
};

// 데이터 수정 컴포넌트
const UserDataForm = ({ newUserData, handleInputChange, handlePostData }) => (
  <div
    style={{
      textAlign: "center",
    }}
  >
    <h1>데이터 추가하기</h1>
    <table width="500px" border="1px solid black">
      <tbody>
        <tr>
          <td width="40%">id:</td>
          <td width="60%">
            <input
              type="number"
              name="id"
              value={newUserData.id || ""}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td width="40%">name:</td>
          <td width="60%">
            <input
              type="text"
              name="name"
              value={newUserData.name || ""}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td width="40%">age:</td>
          <td width="60%">
            <input
              type="number"
              name="age"
              value={newUserData.age || ""}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td width="40%">part:</td>
          <td width="60%">
            <input
              type="text"
              name="part"
              value={newUserData.part || ""}
              onChange={handleInputChange}
            />
          </td>
        </tr>
        <tr>
          <td width="40%">image:</td>
          <td width="60%">
            <input
              type="text"
              name="image"
              value={newUserData.image || ""}
              onChange={handleInputChange}
            />
          </td>
        </tr>
      </tbody>
    </table>
    <UpdateButton onClick={handlePostData}>Update Data</UpdateButton>
  </div>
);

// 유저 정보 컴포넌트
const UserDataTable = ({ userData, handleDeleteData }) => (
  <table border="1px solid black" width="500px">
    <thead>
      <tr>
        <th>id</th>
        <th>name</th>
        <th>age</th>
        <th>part</th>
        <th>image</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {userData.map((data, index) => (
        <tr key={index}>
          <td>{data.id}</td>
          <td>{data.name}</td>
          <td>{data.age}</td>
          <td>{data.part}</td>
          <td>
            <img width="100px" src={data.image} alt={`User ${data.id} image`} />
          </td>
          <td>
            <DeleteButton onClick={() => handleDeleteData(data.id)}>
              Delete
            </DeleteButton>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

const DivContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > table {
    text-align: center;
  }
`;

const PageTitle = styled.p`
  font-size: 40px;
  font-weight: bold;
  margin: 20px 0px;
`;

const UpdateButton = styled.button`
  margin-top: 20px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const DeleteButton = styled.button`
  background-color: #ff5858;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

export default App;

