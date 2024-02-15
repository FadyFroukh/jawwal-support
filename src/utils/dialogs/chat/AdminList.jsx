import { Button, Typography } from '@mui/material';
import React, { useState } from 'react';

const AdminList = ({ admins, onSelectAdmin }) => {
    const [selectedAdmin, setSelectedAdmin] = useState(null);

    const handleSelectAdmin = (adminId) => {
        setSelectedAdmin(adminId);
        onSelectAdmin(adminId);
    };

    return (
        <div>
            <Typography variant='h5' className='mb-3'>
                <strong>
                    Choose an Admin to Chat With
                </strong>
            </Typography>
            <ul>
                {admins.map(admin => (
                    <Button variant='contained' className='me-2' key={admin._id} onClick={() => handleSelectAdmin(admin)}>
                        {admin.Username}
                    </Button>
                ))}
            </ul>
        </div>
    );
};

export default AdminList;