import { Container, Row } from "react-bootstrap";
import styles from '../../styles/utils.module.css'
import LoginForm from "../../utils/Form/LoginForm";

const LoginPageFeature = () => {

  return (
    <>
        <header className="mb-4">
            <div className={`${styles.login_logo} ${styles.flex} ${styles.items_center} mb-3`}>
                <img src="pics/logo.webp" />
            </div>
            <h4>
                <strong>
                    Sign In to Jawwal Support
                </strong>
            </h4>
        </header>
        <Container>
            <Row className={`${styles.flex} ${styles.items_center}`}>
               <LoginForm/>
            </Row>
        </Container>

    </>
  )
}

export default LoginPageFeature
