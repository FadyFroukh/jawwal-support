import {Row} from "react-bootstrap"
import WelcomeMessage from '../../../utils/Others/WelcomeMessage';
import { useContext } from "react";
import { adminContext } from "../../../pages/AdminPage/AdminPage";
import { adminMainOptions } from "../../../Shared";
import DashboardOption from "../../../utils/Others/DashboardOption";
const AdminMain = () => {

  const {setAction} = useContext(adminContext);

  return (
    <>
    <WelcomeMessage/>
    <Row>
        {
            adminMainOptions.map((opt,index)=>(
                <DashboardOption opt={opt} key={index} setAction={setAction}/>
            ))
        }
    </Row>
    </>
  )
}

export default AdminMain;