import { Col } from "react-bootstrap"
import UserForm from "./UserForm"
import { useContext } from "react"
import { appContext } from "../../../App";

const EditUser = () => {

    const {editItem} = useContext(appContext);

  return (
    <>
        <Col xs={12} className="mb-3">
            <h3>
                <strong>
                    Edit a User
                </strong>
            </h3>
        </Col>
        <Col xs={12}>
            <UserForm user={editItem}/>
        </Col>
    </>
  )
}

export default EditUser