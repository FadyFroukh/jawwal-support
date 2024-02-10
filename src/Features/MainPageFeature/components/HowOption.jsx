import { Col } from "react-bootstrap"
import styles from "../../../Styles/utils.module.css"
import { Typography } from "@mui/material"

const HowOption = ({opt}) => {
  return (
    <Col lg={4} xs={12} md={6} className={`${styles.flex_col} ${styles.items_center} text-center mb-2`}>
        <section className={`${styles.how_logo} ${styles.flex_col} ${styles.items_center} mb-3`}>
            <opt.icon/>
        </section>
        <section className="mb-2">
            <Typography>
                <strong>
                    {opt.name}
                </strong>
            </Typography>
        </section>
        <section>
            <Typography >
                <small className="text-muted">
                    {
                        opt.data
                    }
                </small>
            </Typography>
        </section>
    </Col>
  )
}

export default HowOption
