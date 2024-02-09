import { Col } from "react-bootstrap"
import styles from '../../Styles/utils.module.css';

const DashboardOption = ({opt,setAction}) => {

    const handleClick = ()=>{
        setAction(opt.link);
    }

  return (
    <Col lg={3} className={`${styles.admin_option}`} onClick={handleClick}>
        <section className={`${styles.admin_option_body}`}>
            <opt.icon/>
            <p className="mt-1">
                <strong>
                    {opt.name}
                </strong>
            </p>
        </section>
    </Col>
  )
}

export default DashboardOption