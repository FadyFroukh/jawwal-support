import { Form, Field, Formik } from "formik"
import { Col, Container, FormLabel, Row } from "react-bootstrap"
import FormDiv from '../../../utils/Form/FormDiv'
import InputField from '../../../utils/Form/InputField'
import FormButton from "../../../utils/Form/FormButton"
import { useDispatch, useSelector } from "react-redux";
import { addUser, editUser, selectAdminPage } from "../slice/adminPageSlice";
import { useEffect } from "react";
import { decodeToken } from "react-jwt"
import Cookies from "js-cookie"
import FormSelect from "../../../utils/Form/FormSelect"
import Loading from "../../../utils/Others/Loading"
import { operationSuccess } from "../../../Shared"

const UserForm = ({user,type}) => {

    const adminPage = useSelector(selectAdminPage);

    const dispatch = useDispatch();

    const initialValues = {
        ...user,
    }

    useEffect(()=>{
        adminPage.addUser.msg && operationSuccess("User Added")
        adminPage.editUser.msg && operationSuccess("User Edited")
    },[adminPage.addUser,adminPage.editUser]);

  return (
    <Formik
        initialValues={initialValues}
        onSubmit={(values)=>{
            const {Username,Password,Email,userID,employeeId,Activation,Role,superUser} = values;
            if (type === 'add'){
                dispatch(addUser
                (
                    {
                        Username,Password,Email,userID,employeeId,Activation,Role:"65b6b83dc5d84119c0dcc046",superUser,
                        createdBy:decodeToken(Cookies.get("token")).uid
                    }
                ));
            }else {
                dispatch(editUser
                (
                    {
                        id:values._id,Username,Password,Email,userID,employeeId,Activation,Role:"65b6b83dc5d84119c0dcc046"
                    }
                ));
            }
        }}
    >
      <Form>
        <Container>
            <Row>
                {
                    adminPage.addUserLoading && <Loading/>
                }
                {
                    adminPage.editUserLoading && <Loading/>
                }
                <Col lg={4} xs={12} md={6}>
                    <FormDiv>
                        <FormLabel>
                            <strong>
                                Username
                            </strong>
                        </FormLabel>
                        <Field name='Username'>
                            {
                                (props)=>{
                                    return <InputField field={props.field} placeholder='Insert Username'/>
                                }
                            }
                        </Field>
                    </FormDiv>
                </Col>
                <Col lg={4} xs={12} md={6}>
                    <FormDiv>
                        <FormLabel>
                            <strong>
                                Password
                            </strong>
                        </FormLabel>
                        <Field name='Password'>
                            {
                                (props)=>{
                                    return <InputField field={props.field} placeholder='Insert Password' type={'password'}/>
                                }
                            }
                        </Field>
                    </FormDiv>
                </Col>
                <Col lg={4} xs={12} md={6}>
                    <FormDiv>
                        <FormLabel>
                            <strong>
                                Email
                            </strong>
                        </FormLabel>
                        <Field name='Email'>
                            {
                                (props)=>{
                                    return <InputField field={props.field} placeholder='Insert Email' type={'email'}/>
                                }
                            }
                        </Field>
                    </FormDiv>
                </Col>
                <Col lg={4} xs={12} md={6}>
                    <FormDiv>
                        <FormLabel>
                            <strong>
                                Personal ID
                            </strong>
                        </FormLabel>
                        <Field name='userID'>
                            {
                                (props)=>{
                                    return <InputField field={props.field} placeholder='Insert Personal ID' type={'num'}/>
                                }
                            }
                        </Field>
                    </FormDiv>
                </Col>
                <Col lg={4} xs={12} md={6}>
                    <FormDiv>
                        <FormLabel>
                            <strong>
                                Employee ID
                            </strong>
                        </FormLabel>
                        <Field name='employeeId'>
                            {
                                (props)=>{
                                    return <InputField field={props.field} placeholder='Insert Employee ID' type={'num'}/>
                                }
                            }
                        </Field>
                    </FormDiv>
                </Col>
                <Col lg={4} xs={12} md={6}>
                    <FormDiv>
                        <FormLabel>
                            <strong>
                                Activation
                            </strong>
                        </FormLabel>
                        <Field name='Activation'>
                            {
                                (props)=>{
                                    return <FormSelect field={props.field} items={[0,1]}/>
                                }
                            }
                        </Field>
                    </FormDiv>
                </Col>
                <Col lg={4} xs={12} md={6}>
                    <FormDiv>
                        <FormLabel>
                            <strong>
                                User Type
                            </strong>
                        </FormLabel>
                        <Field name='superUser'>
                            {
                                (props)=>{
                                    return <FormSelect field={props.field} items={[0,1]}/>
                                }
                            }
                        </Field>
                    </FormDiv>
                </Col>
                <Col lg={12} xs={12} md={12} className="mt-4">
                    <FormButton txt={type === 'add' ? 'Add User': "Edit User"} type={'submit'} icon={'pi pi-angle-left'}/>
                </Col>
            </Row>
        </Container>
      </Form>
    </Formik>
  )
}

export default UserForm
