import { Typography } from '@mui/material'
import React from 'react'
import { Container, Row , Col} from 'react-bootstrap'
import styles from "../../../Styles/utils.module.css"
import { howOptions } from '../../../Shared'
import HowOption from './HowOption'
const HowItWorks = () => {
    
  return (
    <section className={`p-4 ${styles.main_how}`}>
      <Container>
        <Row>
            <Col xs={12} className='mb-3'>
                <Typography variant='h3' className='text-center'>
                    <strong>
                        How it Works
                    </strong>
                </Typography>
            </Col>
            <Row className='mb-3'>
               {
                howOptions.map(opt=>(
                    <HowOption key={opt.name} opt={opt}/>
                ))
               }
            </Row>
        </Row>
      </Container>
    </section>
  )
}

export default HowItWorks
