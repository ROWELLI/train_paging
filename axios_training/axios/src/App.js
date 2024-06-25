import React, { useEffect, useState } from "react";
import { deleteUser, getUserData, postUserData } from "./AxiosAPI";
import styled from "styled-components";

const App = () => {
  const [userData, setUserData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // 페이지 번호 상태 추가
  const itemsPerPage = 5; // 한 페이지에 보여줄 항목 수 설정

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getUserData();
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const [newUserData, setNewUserData] = useState(() => initialState);

  const handlePostData = async () => {
    try {
      const response = await postUserData(newUserData);
      const userDataset = await getUserData();
      setUserData(userDataset.data);
      console.log(response);
    } catch (err) {
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
    try {
      const response = await deleteUser(id);
      const userDataset = await getUserData();
      setUserData(userDataset.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 페이지 번호 변경 핸들러 추가
  };

  // 현재 페이지에 표시할 데이터 계산
  const indexOfLastItem = currentPage * itemsPerPage; // 현재 페이지의 마지막 항목 인덱스
  const indexOfFirstItem = indexOfLastItem - itemsPerPage; // 현재 페이지의 첫 번째 항목 인덱스
  const currentItems = userData.slice(indexOfFirstItem, indexOfLastItem); // 현재 페이지에 표시할 항목 추출

  const totalPages = Math.ceil(userData.length / itemsPerPage); // 총 페이지 수 계산

  return (
    <DivContainer>
      <PageTitle>User Data 가져오기</PageTitle>
      <UserDataTable userData={currentItems} handleDeleteData={handleDeleteData} /> {/* currentItems 사용 */}
      <UserDataForm
        newUserData={newUserData}
        handleInputChange={handleInputChange}
        handlePostData={handlePostData}
      />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        handlePageChange={handlePageChange} // Pagination 컴포넌트에 핸들러 전달
      />
    </DivContainer>
  );
};

const initialState = {
  id: null,
  name: "",
  age: null,
  part: "",
  image: "",
};

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

const Pagination = ({ currentPage, totalPages, handlePageChange }) => (
  <PaginationContainer>
    {Array.from({ length: totalPages }, (_, index) => (
      <PaginationButton
        key={index + 1}
        onClick={() => handlePageChange(index + 1)} // 페이지 번호 클릭 핸들러
        active={currentPage === index + 1}
      >
        {index + 1}
      </PaginationButton>
    ))}
  </PaginationContainer>
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

const DeleteButton = styled.button`
  background-color: #ff5858;
  color: #fff;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
`;

const PaginationContainer = styled.div` // Pagination 컨테이너 스타일 추가
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PaginationButton = styled.button` // Pagination 버튼 스타일 추가
  background-color: ${(props) => (props.active ? "#007bff" : "#fff")};
  color: ${(props) => (props.active ? "#fff" : "#000")};
  border: 1px solid #007bff;
  padding: 5px 10px;
  cursor: pointer;
  margin: 0 5px;
`;

export default App;
