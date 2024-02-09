import { Typography } from "@mui/material"
import { Col } from "react-bootstrap"
import styles from '../../../Styles/utils.module.css';
import PostRating from "../../../utils/Others/PostRating";
const OnePost = ({post}) => {
  return (
    <>
        <Col xs={12} lg={12}>
            <header className={`${styles.flex} ${styles.item_between_center} mb-4`}>
                <Typography variant="h5">
                    <strong>
                        {post.problemTitle}
                    </strong>
                </Typography>
                <div>
                    <Typography>
                        Created by: <strong>{post.createdBy}</strong>, On {post.creationTime}
                    </Typography>
                </div>
            </header>
            <PostRating likes={[]}/>
            <Typography className="muted mb-2 mt-3">
                {
                    post.problemDescription
                }
            </Typography>
        </Col>
    </>
  )
}

export default OnePost