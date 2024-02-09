import { Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { fetchSaved, selectDashboardPage } from "../../Features/DashboardPageFeature/slice/dashboradPageSlice";
import { useEffect } from "react";
import { decodeToken } from "react-jwt";
import Cookies from "js-cookie";
import Loading from "../Others/Loading";

const SavedDialog = () => {

    const usr = decodeToken(Cookies.get("token"));
    
    const dispatch = useDispatch();

    const dashboardPage = useSelector(selectDashboardPage);

    useEffect(()=>{
        dispatch(fetchSaved({id:usr.uid}));
    },[])

  return (
    <Col xs={12}>
        {
            dashboardPage.savedLoading ? <Loading/> : dashboardPage.saved.map(ite=>(
                <div>
                    1
                </div>
            ))
        }
    </Col>
  )
}

export default SavedDialog