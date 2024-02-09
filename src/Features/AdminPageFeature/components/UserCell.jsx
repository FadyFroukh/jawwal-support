import {TableCell} from "@mui/material"
import { useContext } from "react"
import { adminContext } from "../../../Pages/AdminPage/AdminPage";

const UserCell = ({entry}) => {

  const {} = useContext(adminContext);

  const getSeverity = (user) => {
    switch (user.Activation) {
        case 0:
            return 'danger';

        case 1:
            return 'success';

        case 2: 
            return 'warning'
        default:
            return null;
    }
};

const getValue = (user)=>{
    switch (user.Activation) {
        case 0:
            return 'Disabled';

        case 1:
            return 'Active';

        case 2: 
            return 'Banned'
        default:
            return null;
    }
}

  return (
    <>
      <TableCell>
        {
          entry.Username
        }
      </TableCell>
      <TableCell>
        {
          entry.Email
        }
      </TableCell>
      <TableCell>
        {
          entry.userID
        }
      </TableCell>
      <TableCell>
        {
          entry.employeeId
        }
      </TableCell>
      <TableCell>
        {
          entry.Role
        }
      </TableCell>
      <TableCell>
        {
          getValue(entry)
        }
      </TableCell>
      <TableCell>
        {
          entry.superUser
        }
      </TableCell>
      <TableCell>
        {
          entry.createdBy
        }
      </TableCell>
      <TableCell>
        {
          entry.creationTime
        }
      </TableCell>
      <TableCell>
        {
          entry.lastLogin
        }
      </TableCell>
    </>

  )
}

export default UserCell;
