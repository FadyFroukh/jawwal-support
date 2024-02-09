import { Col } from "react-bootstrap"
import Post from "./Post"
import styles from '../../../Styles/utils.module.css'
import NoResult from "../../../utils/Others/NoResult"
const Posts = ({posts}) => {

  return (
    <>
      {
        posts?.length === 0 ? <NoResult msg='No Posts Avaliable'/> : 
        posts?.map(post=>(
          <Col lg={4} md={6} xs={12} key={post._id} className={`${styles.job_post} mb-3`}>
            <Post post={post}/>
          </Col>
        ))
      }
    </>
  )
}

export default Posts
