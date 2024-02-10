import { Col, Container, Image, Row } from 'react-bootstrap';
import styles from '../../../Styles/utils.module.css';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import TypeWriter from '../../../utils/Others/TypeWriter'
import { decodeToken } from 'react-jwt';
import Cookies from 'js-cookie';
import { useEffect, useState } from 'react';
const MainBody = () => {

    const [usr,setUsr] = useState({});

    useEffect(()=>{
        if (Cookies.get("token")){
            setUsr(decodeToken(Cookies.get("token")));
        }
    },[]);

    const handleBtnClick = ()=>{
        document.body.scrollTop = 1000;
        document.documentElement.scrollTop = 1000;
    }

  return (
    <main 
        className=
        {`
            ${styles.h100} 
            ${styles.flex} 
            ${styles.items_center} 
            ${styles.back_color}
            ${styles.main_body}
        `
        }
        >
        <Container>
            <Row>
                <Col lg={6} xs={12} className={`${styles.main_txt} mb-2`}>
                    <Typography variant='h4'>
                        <strong>
                            <TypeWriter text='Welcome to Jawwal Support !'/>
                        </strong>
                    </Typography>
                    <Typography className='text-muted mb-3'>
                        <small>
                            <strong>
                                Here you can have all the support you need
                            </strong>
                        </small>
                    </Typography>
                    <Button variant='contained' color='secondary' size='large' style={{maxWidth:"175px"}}>
                        <Link to={`/${usr ? usr.superUser ? 'admin' : "dashboard" : "login"}`}>
                            <strong>
                                Get Started
                            </strong>
                        </Link>
                    </Button>
                </Col>
                <Col lg={6} xs={12} className={`${styles.main_pic}`}>
                    <Image src='/pics/tech-support.png'/>
                </Col>
                <Col 
                    xs={12} 
                    className={`${styles.flex} ${styles.items_center} ${styles.main_arrow}`}
                    onClick={handleBtnClick}
                >
                    <div>
                        <KeyboardArrowDown style={{fontSize:"4rem"}}/>
                    </div>
                </Col>  
            </Row>
        </Container>
    </main>
  )
}

export default MainBody