import { Col } from "react-bootstrap"
import PostForm from "./PostForm"
import { decodeToken } from "react-jwt"
import Cookies from "js-cookie";
import { Button } from "@mui/material";
import { useContext } from "react";
import { appContext } from "../../../App";
const EditPost = ({post}) => {

  const usr = decodeToken(Cookies.get("token"));

  const {setDeletePopup,setDeleteId,setItem} = useContext(appContext);

  const handleDeletePost = ()=>{
    setDeletePopup(true);
    setDeleteId(post._id);
    setItem("post");
  }

  return (
    <>
        {
          usr.superUser && <div className="mb-4" onClick={handleDeletePost}>
              <Button variant="contained" color="error" size="large">
                  <strong>
                      Delete
                  </strong>
              </Button>
          </div>
        }
       <Col xs={12} className="mb-3">
            <h3>
                <strong>
                    Edit a Post
                </strong>
            </h3>
        </Col>
        <Col xs={12}>
            <PostForm post={post}/>
        </Col>
    </>
  )
}

export default EditPost