import React, { useEffect, useState } from 'react';
import AdminList from './chat/AdminList';
import AdminChosen from './chat/AdminChosen';
import axios from 'axios';

const ChatDialog = () => {
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const handleSelectAdmin = (adminId) => {
        setSelectedAdmin(adminId);
    };

    const [admins,setAdmins] = useState([]);

    useEffect(()=>{
        axios.get(`http://127.0.0.1:5001/user/admins`).then(res=>{
          setAdmins(res.data);
        }).catch(err=>{
          console.log(err);
        })
    },[admins]);

  return (
    <div>
      {selectedAdmin ? (
          <AdminChosen selectedAdmin={selectedAdmin}/>
      ) : (
          <AdminList
              admins={admins}
              onSelectAdmin={handleSelectAdmin}
          />
      )}
    </div>
  )
}

export default ChatDialog