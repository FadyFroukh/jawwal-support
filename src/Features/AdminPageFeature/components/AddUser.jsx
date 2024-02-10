import { Col } from "react-bootstrap"
import UserForm from "./UserForm"

const AddUser = () => {

    const user = {
        Username:"",
        Password:"",
        Email:"",
        userID:0,
        employeeId:0,
        Activation:0,
        superUser:0,
    };

  return (
    <>
        <Col xs={12} className="mb-3">
            <h3>
                <strong>
                    Add a User
                </strong>
            </h3>
        </Col>
        <Col xs={12}>
            <UserForm user={user} type={'add'}/>
        </Col>
    </>
  )
}

export default AddUser