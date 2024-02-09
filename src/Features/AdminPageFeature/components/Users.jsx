import {useSelector } from "react-redux"
import {selectAdminPage } from "../slice/adminPageSlice";
import Loading from "../../../utils/Others/Loading";
import NoResult from '../../../utils/Others/NoResult';
import BasicTable from '../../../utils/Tables/BasicTable';
import UserCell from './UserCell';
import { useContext } from "react";
import { adminContext } from "../../../Pages/AdminPage/AdminPage";

const Users = ({users}) => {

    const {setAction} = useContext(adminContext);

    const headers = ['Username','Email','Personal ID','Employee ID',
    'Role','Status','UserType','CreatedBy','Creation Date','Last Login','Operations'];

    const adminPage = useSelector(selectAdminPage);

  return (
    <section className="mt-4">
      {
        adminPage?.usersError ? <NoResult msg='Error Occured While Fetching Users'/> : 
        adminPage?.usersLoading ? <Loading/> :
        adminPage?.users?.length > 0 ? 
        <BasicTable 
            entries={users}
            headers={headers}
            Cell={UserCell}
            setAction={setAction}
        />
        : <NoResult msg='There is no users yet'/>
      }
    </section>
  )
}

export default Users