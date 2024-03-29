import { Field, Form, Formik } from "formik"
import { Col, Container, FormLabel, Row } from "react-bootstrap";
import FormDiv from '../../../utils/Form/FormDiv';
import InputField from '../../../utils/Form/InputField';
import FormButton from "../../../utils/Form/FormButton";
import { useDispatch, useSelector } from "react-redux";
import FormSection from "../../../utils/Form/FormSection";
import { addPost, editPost, selectAdminPage } from "../slice/adminPageSlice";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import Loading from "../../../utils/Others/Loading";
import { useEffect, useState } from "react";
import { operationSuccess } from "../../../Shared";
import NoResult from "../../../utils/Others/NoResult";
import RoundItems from "../../../utils/Others/RoundItems";

const PostForm = ({post,type}) => {

  const adminPage = useSelector(selectAdminPage);

  const usr = decodeToken(Cookies.get("token"));

  const dispatch = useDispatch();

  const [steps,setSteps] = useState(post.postSteps ? post.postSteps : []);

  const initialValues = {
    ...post,
  }

  useEffect(()=>{
    adminPage.addPost.msg && operationSuccess("Problem Added")
    adminPage.editPost.msg && operationSuccess("Problem Edited")
  },[adminPage.addPost.msg]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values)=>{
        const {problemTitle,problemDescription,videoLink} = values;
        if (type === 'post'){
          dispatch(addPost({
            problemTitle,problemDescription,createdBy:usr.uid,postSteps:steps,videoLink
          }));
        }else {
          dispatch(editPost({
            problemTitle,problemDescription,id:values._id,postSteps:steps,videoLink
          }));
        }
      }}
    >
      <Form>
        <Container>
          <Row>
            {
              adminPage.addPostLoading && <Loading/>
            }
            {
              adminPage.editPostLoading && <Loading/>
            } 
            <Col lg={4} xs={12} md={6}>          
                <FormDiv>
                  <FormLabel>
                    <strong>
                       Problem Title
                    </strong>
                  </FormLabel>
                  <Field name='problemTitle'>
                    {
                      (props)=>{
                        return <InputField placeholder={'Insert Problem Title'} field={props.field} required={true}/>
                      }
                    }
                  </Field>
                </FormDiv>    
            </Col>
            <Col lg={4} xs={12} md={6}>          
                <FormDiv>
                  <FormLabel>
                    <strong>
                       Problem Description
                    </strong>
                  </FormLabel>
                  <Field name='problemDescription'>
                    {
                      (props)=>{
                        return <InputField placeholder={'Insert Problem Description'} field={props.field} required={true}/>
                      }
                    }
                  </Field>
                </FormDiv>    
            </Col>
            <Col lg={4} xs={12} md={6}>
                <FormLabel>
                  <strong>
                      Problem Steps
                  </strong>
                </FormLabel>
                <Field>
                    {
                      (props)=>{
                        return <RoundItems items={steps} setItems={setSteps}/>
                      }
                    }
                </Field>
            </Col>
            <Col lg={4} xs={12} md={6}>
                <FormDiv>
                  <FormLabel>
                    <strong>
                        Video Link
                    </strong>
                  </FormLabel>
                  <Field name='videoLink'>
                      {
                        (props)=>{
                          return <InputField placeholder={'Insert Video Link'} field={props.field} required={false}/>
                        }
                      }
                  </Field>
                </FormDiv>
            </Col>
            <FormSection>
              <FormButton 
                txt={'Submit Post'}
                type={'submit'}
              />
            </FormSection>
          </Row>
        </Container>
      </Form>
    </Formik>
  )
}

export default PostForm
