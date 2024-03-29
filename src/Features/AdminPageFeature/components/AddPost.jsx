import { Col } from "react-bootstrap"
import PostForm from "./PostForm"

const AddPost = () => {

    const post = {
        problemTitle:"",
        problemDescription:"",
        postSteps:[],
        videoLink:""
    };

  return (
    <>
        <Col xs={12} className="mb-3">
            <h3>
                <strong>
                    Add a Post
                </strong>
            </h3>
        </Col>
        <Col xs={12}>
            <PostForm post={post} type='post'/>
        </Col>
    </>
  )
}

export default AddPost
