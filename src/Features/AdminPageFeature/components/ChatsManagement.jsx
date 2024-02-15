import { useDispatch, useSelector } from "react-redux"
import { fetchUsers, selectAdminPage } from "../slice/adminPageSlice"
import { useEffect, useState } from "react";
import ChatBox from "./ChatBox";
import { Col } from "react-bootstrap";
import SearchForm from "../../../utils/Form/SearchForm";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";

const ChatsManagement = () => {

    const user = decodeToken(Cookies.get("token"));

    const dispatch = useDispatch();

    const adminPage = useSelector(selectAdminPage);

    const [filterdUsers,setFilteredUsers] = useState([]);

    useEffect(()=>{
        dispatch(fetchUsers())
    },[]);

    useEffect(()=>{
        setFilteredUsers(adminPage.users);
    },[adminPage.users]);

    const searchFunction = (value,entries)=>{
        return entries.filter(entry=>entry.Username.toLowerCase().includes(value.toLowerCase()));
    };
    
  return (
    <>
        <Col xs={12} className="mt-3 mb-3"> 
          <SearchForm
              placeholder='Search for a Chat'
              searchFunction={searchFunction}
              setEntries={setFilteredUsers}
              entries={adminPage?.users}
          />
        </Col>
        {
            filterdUsers?.map(usr=>(
                usr.Username !== user.uid && <ChatBox key={usr._id} opt={usr}/>
            ))
        }
    </>
  )
}

export default ChatsManagement
