import { Field, Form, Formik } from "formik"
import { Col, FormLabel } from "react-bootstrap";
import { Link } from "react-router-dom";
import { checkUser, selectLoginPage } from "../../Features/LoginPageFeature/slice/loginPageSlice";
import Loading from "../Others/Loading";
import FormButton from "./FormButton";
import InputField from "./InputField";
import FormDiv from "./FormDiv";
import FormSection from "./FormSection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import styles from '../../styles/utils.module.css';
import { operationFailure } from "../../Shared";
const LoginForm = () => {
    const dispatch = useDispatch();

    const loginPage = useSelector(selectLoginPage);

    useEffect(()=>{
        if (loginPage.error){
            operationFailure("An Error Occured");
        }else{
            if (loginPage.user.status === 200){
                if (loginPage.user.data[0].startsWith("Please fill")){
                    operationFailure("Please Fill Your Credentials");
                }else if (loginPage.user.data[0].startsWith("Inc") || loginPage.user.data[0].startsWith("Username")){
                    operationFailure("Username or Password Incorrect");
                }else {
                    if (loginPage.user.data){
                        const token = decodeToken(loginPage.user.data);
                        if (loginPage.user.data[0] === 'Account Disabled'){
                            operationFailure("Account Disabled");
                        }else {
                            Cookies.set("token",loginPage.user.data,{expires:token.exp});
                            if (token.superUser){
                                window.location.href = '/admin'
                             }
                             else{
                                window.location.href = '/dashboard'
                             }
                        }
                    }else{
                        operationFailure("Not Authorized");
                    }
                }
            }else if (loginPage.user.status === 500){
                operationFailure("An Internal Error Occurred");
            }
        }
    },[loginPage.user]);
    const initialValues = {
        Username:"",
        Password:""
    };

  return (
    <Col xs={12} lg={4}>
        <Formik
        initialValues={initialValues}
        onSubmit={(values)=>{
            dispatch(checkUser({Username:values.Username,Password:values.Password}));
        }}
        >
            <Form>
                {
                    loginPage.loading && <Loading/>
                }
                
                <FormSection>
                    <FormDiv>
                        <FormLabel>
                            <strong>
                                Username
                            </strong>
                        </FormLabel>
                        <Field name='Username'>
                            {
                                (props)=>{
                                    return <InputField 
                                        placeholder='Enter your username' 
                                        autoComplete={`false`} 
                                        field={props.field}
                                    />
                                }
                            }
                        </Field>
                    </FormDiv>
                </FormSection>
                <FormSection>
                    <FormDiv>
                        <FormLabel>
                            <strong>
                                Password
                            </strong>
                        </FormLabel>
                        <Field name='Password'>
                            {
                                (props)=>{
                                    return <InputField 
                                        placeholder='Enter your password' 
                                        autoComplete={`false`} 
                                        field={props.field}
                                        type={'password'}
                                    />
                                }
                            }
                        </Field>
                    </FormDiv>
                </FormSection>
                <FormSection>
                    <FormButton txt='Sign In' type='submit' icon='pi pi-angle-left' backColor={'var(--darkBlue)'}/>
                </FormSection>
                <FormSection cls={styles.text_right}>
                    <FormLabel>
                        <Link to='/forgot_password' style={{color:"#B6BBC4"}}>
                            Forgot Password?
                        </Link>
                    </FormLabel>
                </FormSection>
                <section className="text-center">
                    <p>
                        <strong>
                            Don't have an Account ? <Link to='/req_account'>Request One</Link>
                        </strong>
                    </p>
                </section>
            </Form>
        </Formik>
    </Col>
  )
}

export default LoginForm