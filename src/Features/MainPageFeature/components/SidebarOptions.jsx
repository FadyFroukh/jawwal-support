import { useState } from 'react';
import styles from '../../../styles/utils.module.css';
import { Dialog } from 'primereact/dialog';
import { Container, Row } from 'react-bootstrap';
import SavedDialog from '../../../utils/dialogs/SavedDialog';
import ChatDialog from '../../../utils/dialogs/ChatDialog';

const SidebarOptions = ({options}) => {

    const [visible, setVisible] = useState(false);
    const [option,setOption] = useState({});

    const handleShowDialog = (opt)=>{
        setVisible(true);
        setOption(opt);
    };

  return (
    <>
        <Dialog 
            header={`${option?.name}`} 
            visible={visible} 
            style={{ width: '95%'}} 
            onHide={() => setVisible(false)}
            position='top'
        >
            <Container fluid>
                <Row>
                    {
                        option?.name === 'Saved Problems' && <SavedDialog/>
                    }
                    {
                        option?.name === 'Chat' && <ChatDialog/>
                    }
                </Row>
            </Container>
        </Dialog>
        {
            options.map(opt=>(
                <div key={opt.name} className={`${styles.flex} ${styles.sidebar_option}`} onClick={()=>handleShowDialog(opt)}>
                    <span className='me-3 ms-3'>
                        <opt.icon/>
                    </span>
                    <p className='m-0'>
                        {opt.name}
                    </p>
                </div>
            ))
        }
    </>
  )
}

export default SidebarOptions