import { Button, Typography } from "@mui/material"
import axios from "axios";
import { Field, Form, Formik } from "formik";
import Cookies from "js-cookie";
import { useState , useEffect} from "react";
import { decodeToken } from "react-jwt";
import InputField from "../../Form/InputField";
import Messages from "./Messages";

const AdminChosen = ({selectedAdmin}) => {

    const usr = decodeToken(Cookies.get("token"));

    const [messages, setMessages] = useState([]);

    const initialValues = {
        message:""
    };

    useEffect(() => {
        fetchMessages();
    }, [selectedAdmin,messages]);

    const fetchMessages = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5001/message/fetch`,{userId:usr.uid,adminId:selectedAdmin.Username});
            setMessages(response.data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        }
    };


  return (
    <section>
        <div>
            <Typography variant="h6" className="mb-3">
                <strong>
                    Chatting With {selectedAdmin.Username}
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
                    await axios.post('http://127.0.0.1:5001/message', { text: values.message, adminId: selectedAdmin.Username, userId:usr.uid,sentBy:usr.uid});
                    resetForm({values:""});
                    fetchMessages();
                } catch (error) {
                    console.error('Failed to send message:', error);
                }
            }}
        >
            <Form>
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
        <div/>
    </section>
  )
}

export default AdminChosen
