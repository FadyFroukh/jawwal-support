import Cookies from 'js-cookie';
import { Avatar } from 'primereact/avatar';
import { Sidebar } from 'primereact/sidebar';
import { useState } from 'react';
import { decodeToken } from 'react-jwt';
import { superSideOption, userSideOptions } from '../../../Shared';
import SidebarOptions from './SidebarOptions';
import styles from '../../../Styles/utils.module.css';
import { Divider } from 'primereact/divider';

const HeaderUser = () => {
    const [visibleRight, setVisibleRight] = useState(false);

    const user = decodeToken(Cookies.get("token"));

    const handleQuit = ()=>{
        Cookies.remove("token");
        window.location.href='/';
    }
    
    return (
        <>
            <Avatar shape='circle' label={`${user?.uid[0]}`} onClick={() => setVisibleRight(true)}/>
            <Sidebar visible={visibleRight} position="right" onHide={() => setVisibleRight(false)}>
                    <section className='ms-3'>
                        <h3 className='mb-3'>Account Settings</h3>
                        <div className='mb-4'>
                            <h5>
                                <span>
                                    <strong>{user?.uid}</strong>
                                    <span> - </span>
                                    <span>
                                        {user?.superUser ? "Super Admin" : "Normal User"}
                                    </span>
                                </span>
                            </h5>
                        </div>
                    </section>
                    <div>
                        {
                            user?.superUser ? <SidebarOptions options={superSideOption}/> : <SidebarOptions options={userSideOptions}/>
                        }
                    </div>
                    <p className='ms-3 mt-3 mb-4'>
                        Last Login : {user?.lastLogin}
                    </p>
                    <Divider/>
                    <section className={`text-center ${styles.sidebar_option}`} onClick={handleQuit}>
                        <strong>
                            Quit
                        </strong>
                    </section>
            </Sidebar>
        </>
    )
}

export default HeaderUser
