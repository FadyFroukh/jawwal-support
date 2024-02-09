import TurnedInNot from '@mui/icons-material/TurnedInNot';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import Block from '@mui/icons-material/Block';
import EmojiFlags from '@mui/icons-material/EmojiFlags';
import {useContext, useEffect, useState} from 'react';
import styles from '../../../styles/utils.module.css'
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt';
import { appContext } from '../../../App';
import { useDispatch, useSelector } from 'react-redux';
import { editPostOptions, selectDashboardPage } from '../slice/dashboradPageSlice';
const JobOptions = ({post}) => {

    const dashboardPage = useSelector(selectDashboardPage);

    const user = decodeToken(Cookies.get("token"))

    const dispatch = useDispatch();

    const [postFound,setPostFound] = useState({});
    const [isSaved,setIsSaved] = useState(false);

    useEffect(()=>{
        setPostFound(post.likes.find(like => like.userId === user.uid));
        postFound?.userId && setIsSaved(true)
    },[postFound,isSaved,dashboardPage]);

    const {toast} = useContext(appContext);

    const checkUserStatus = (job)=>{
        if (Cookies.get("token")){
            if (decodeToken(Cookies.get("token")).superUser){
                toast.current.show({ severity: 'info', summary: 'You are an admin 😂', detail: `You can't do this action` });
            }else {
                if (job === 'save'){
                    //TODO: Setup add and remove saved jobs and remove useStatus
                    if (postFound){
                        dispatch(editPostOptions({id:post._id,userId:postFound.userId,operation:"save"}));
                        toast.current.show({ severity: 'info', summary: 'Problem Removed', detail: 'Check saved problems for more' });
                        setIsSaved(true);
                    }else {
                        dispatch(editPostOptions({id:post._id,userId:user.uid,operation:"save"}));
                        toast.current.show({ severity: 'success', summary: 'Problem Saved', detail: 'Check saved problems for more' });
                        setIsSaved(false)
                    }
                }else if (job === 'block'){
                    // TODO: Setup block job functionailty
                    dispatch(editPostOptions({id:post._id,userId:user.uid,operation:"block"}));
                    toast.current.show({ severity: 'success', summary: 'Problem Blocked', detail: 'We will show less problems like this' });
                }else {
                    //TODO: Setup report job functionailty
                    dispatch(editPostOptions({id:post._id,userId:user.uid,operation:"report"}));
                    toast.current.show({ severity: 'info', summary: 'Problem Reported', detail: 'Thanks for your feedback' });
                }
            }
        }else{
            window.location.href = "/login"
        }
    };

    const handleSaveJob = (e)=>{
        e.stopPropagation();
        checkUserStatus("save");
    };

    const handleBlockJob = (e)=>{
        e.stopPropagation();
        checkUserStatus("block");
    }

    const handleReportJob = (e)=>{
        e.stopPropagation();
        checkUserStatus("report");
    }

  return (
    <div className={`${styles.flex}`}>
        <section onClick={(e)=>handleSaveJob(e)} className={`${styles.pointer}`}>
            {
                isSaved ? <TurnedInIcon/> : <TurnedInNot/> 
            }
        </section>
        <section onClick={(e)=>handleBlockJob(e)} className={`${styles.pointer}`}>
            <Block/> 
        </section>
        <section onClick={(e)=>handleReportJob(e)} className={`${styles.pointer}`}>
            <EmojiFlags/> 
        </section>
    </div>
  )
}

export default JobOptions