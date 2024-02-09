import { useDispatch, useSelector } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { fetchUsers, selectAdminPage } from "../slice/adminPageSlice";
import FormButton from "../../../utils/Form/FormButton";
import Users from "./Users";
import { adminContext } from "../../../pages/AdminPage/AdminPage";
import { Col } from "react-bootstrap";
import SearchForm from "../../../utils/Form/SearchForm";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";

const UsersManagement = () => {

    const {setAction} = useContext(adminContext);

    const adminPage = useSelector(selectAdminPage);

    const dispatch = useDispatch();

    const [filterdUsers,setFilteredUsers] = useState([]);

    useEffect(()=>{
      dispatch(fetchUsers());
      setFilteredUsers(adminPage.users);
    },[]);

    useEffect(()=>{
      setFilteredUsers(adminPage.users);
    },[adminPage.users]);

    const searchFunction = (value,entries)=>{
      return entries.filter(entry=>entry.Username.toLowerCase().includes(value.toLowerCase()));
    };

  return (
    <>
        <Col xs={12} lg={6} className="mt-3"> 
          <SearchForm 
              placeholder='Search for a User'
              searchFunction={searchFunction}
              setEntries={setFilteredUsers}
              entries={adminPage?.users}
          />
        </Col>
        <Col xs={12} lg={6} className="mt-3"> 
          <FormButton 
            txt={'Add User'} 
            func={()=>setAction("addUser")}
            icon="pi pi-user-plus"
          />
        </Col>
        <Users users={filterdUsers}/>
    </>
  )
}

export default UsersManagement