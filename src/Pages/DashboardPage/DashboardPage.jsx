import { createContext, useState } from "react"
import DashboardPageFeature from '../../Features/DashboardPageFeature/DashboardPageFeature'
import styles from "../../Styles/utils.module.css"
export const dashboardContext = createContext({
    action:"",
    setAction:()=>{},
    crumbs:[],
    setCrumbs:()=>{},
    job:"",
    setJob:()=>{}
});

const DashboardPage = () => {
    const [action,setAction] = useState("");
    const [crumbs,setCrumbs] = useState([]);
    const [job,setJob] = useState({});
  return (
    <dashboardContext.Provider value={{action,setAction,crumbs,setCrumbs,job,setJob}}>
        <main className={`${styles.h90}`}>
            <DashboardPageFeature/>
        </main>
    </dashboardContext.Provider>
  )
}

export default DashboardPage
