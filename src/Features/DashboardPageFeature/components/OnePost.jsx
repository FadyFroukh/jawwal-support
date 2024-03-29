import { Typography } from "@mui/material"
import { Col } from "react-bootstrap"
import styles from '../../../Styles/utils.module.css';
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
            <Typography className="muted mb-2 mt-3">
                {
                    post.problemDescription
                }
            </Typography>
            <Typography className="muted mb-2 mt-3">
                Problem Steps:
            </Typography>
            <ul>
                {
                    post?.postSteps.map(step=>(
                        <li key={step}>
                            {step}
                        </li>
                    ))
                }
            </ul>
            <Typography>
                Problem Video:
            </Typography>
            <div className="mt-3 mb-3">
                {
                    post.videoLink ? 
                    <iframe src="https://drive.google.com/file/d/1-wsq-MOcasyGe3kyqghfhC65V-YT_qJ3/preview" width="640" height="480" allow="autoplay"></iframe>
                    : "No Video Added"
                }
            </div>
        </Col>
    </>
  )
}

export default OnePost