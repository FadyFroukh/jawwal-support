import { TableCell } from "@mui/material"
import {Edit,DeleteForever} from '@mui/icons-material/';
import styles from '../../Styles/utils.module.css'
import { useContext } from "react";
import { appContext } from "../../App";
const TableOperations = ({entry,setAction}) => {

    const {setEditItem,setDeleteId,setDeletePopup} = useContext(appContext);

    const handleDeleteEmployee = ()=>{
        setDeleteId(entry._id);
        setDeletePopup(true);
    };
    
      const handleEditEmployee = ()=>{
        setEditItem(entry);
        setAction("editUser");
    }

  return (
    <TableCell className={`${styles.flex}`}>
        <section onClick={handleEditEmployee}>
            <Edit color='success' className={`${styles.pointer}`}/>
        </section>
        <section onClick={handleDeleteEmployee}>
            <DeleteForever sx={{color:"red"}} className={`${styles.pointer}`}/>
        </section>
    </TableCell>
  )
}

export default TableOperations