import { useContext, useEffect, useState } from "react"
import { appContext } from "../../../App"
import { Col } from "react-bootstrap";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import { Button, Typography } from "@mui/material";
import axios from "axios";
import Messages from "../../../utils/dialogs/chat/Messages";
import { Field, Form, Formik } from "formik";
import InputField from "../../../utils/Form/InputField";

const UserChat = () => {

    const {editItem} = useContext(appContext);

    const admin = decodeToken(Cookies.get("token"));

    const [messages,setMessages] = useState([])

    const initialValues = {
        message:""
    };


    useEffect(() => {
        fetchMessages();
    }, [messages]);

    const fetchMessages = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5001/message/fetch`,{userId:editItem.Username,adminId:admin.uid});
            setMessages(response.data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };


  return (
    <Col>
        <div>
            <Typography variant="h6" className="mb-3">
                <strong>
                    Chatting With {editItem.Username}
                </strong>
            </Typography>
        </div>
        <div>
            <Messages messages={messages}/>
        </div>
        <Formik
            initialValues={initialValues}
            onSubmit={async (values,{resetForm})=>{
                try {
                    await axios.post('http://127.0.0.1:5001/message', { text: values.message, adminId: admin.uid, userId:editItem.Username,sentBy:admin.uid});
                    resetForm({values:""});
                    fetchMessages();
                } catch (error) {
                    console.error('Failed to send message:', error);
                }
            }}
        >
            <Form className="mb-3">
                <Field name='message'>
                    {
                        (props)=>{
                            return <InputField field={props.field} placeholder={'Please input your message'}/>
                        }
                    }
                </Field>
                <Button variant="contained" className="ms-2" type="submit">
                    <strong>
                        Send
                    </strong>
                </Button>
            </Form>
        </Formik>
    </Col>
  )
}

export default UserChat
