import { Col } from "react-bootstrap"
import styles from '../../../Styles/utils.module.css';
import { useContext } from "react";
import { adminContext } from "../../../pages/AdminPage/AdminPage";
import { appContext } from "../../../App";

const ChatBox = ({opt}) => {

    const {setAction} = useContext(adminContext)

    const {setEditItem} = useContext(appContext);

    const handleClick = ()=>{
        setAction("userChat");
        setEditItem(opt);
    }

  return (
    <Col lg={3} className={`${styles.admin_option}`} onClick={handleClick}>
        <section className={`${styles.admin_option_body}`}>
            <p className="mt-1">
                <strong>
                    {opt.Username}
                </strong>
            </p>
        </section>
    </Col>
  )
}

export default ChatBox