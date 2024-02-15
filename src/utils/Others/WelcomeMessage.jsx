import Cookies from "js-cookie"
import { Col } from "react-bootstrap"
import { decodeToken } from "react-jwt"

const WelcomeMessage = () => {
  return (
    <Col xs={12}>
        <h3 className="mb-3">
            <span>Welcome, </span>
            <strong>
                {
                  decodeToken(Cookies.get("token"))?.uid
                }
            </strong>
        </h3>
    </Col>
  )
}

export default WelcomeMessage
