import { Card } from 'react-bootstrap';
import styles from '../../../Styles/utils.module.css'
import JobOptions from './PostOptions';
import PostRating from '../../../utils/Others/PostRating'
import { dashboardContext } from '../../../Pages/DashboardPage/DashboardPage';
import { useContext } from 'react';
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import { adminContext } from '../../../Pages/AdminPage/AdminPage';
import { appContext } from '../../../App';
const Post = ({post}) => {

    const usr = decodeToken(Cookies.get("token"));

    const {setJob} = useContext(dashboardContext);

    const {setAction} = useContext(adminContext);

    const {setEditItem} = useContext(appContext);

    const handleChangeJob = ()=>{
        setJob(post);
        setAction("editPost");
        setEditItem(post);
    };

  return (
    <Card style={{ width: '100%', minHeight:"220px" }} onClick={handleChangeJob}>
      <Card.Body>
        <section className={`${styles.flex} ${styles.item_between}`}>
            <Card.Title>
                <p>
                    <strong>
                        {post.problemTitle}
                    </strong>
                </p>
            </Card.Title>
            {
              usr.superUser ? null : <JobOptions post={post}/> 
            }
        </section>
        <PostRating readOnly={true} likes={post.likes}/>
        <Card.Subtitle className="mb-2 text-muted">
            {post.problemDescription}
        </Card.Subtitle>
        <Card.Text>
            Posted on {post.creationTime}, by <strong>{post.createdBy}</strong>
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default Post