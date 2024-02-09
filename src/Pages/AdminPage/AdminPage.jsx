import { createContext, useState } from "react"
import AdminPageFeature from "../../features/AdminPageFeature/AdminPageFeature"

export const adminContext = createContext({
    action:"",
    setAction:()=>{},
    crumbs:[],
    setCrumbs:()=>{},
});

const AdminPage = () => {

    const [action,setAction] = useState("");
    const [crumbs,setCrumbs] = useState([]);

  return (
    <adminContext.Provider value={{action,setAction,crumbs,setCrumbs}}>
        <main>
            <AdminPageFeature/>
        </main>
    </adminContext.Provider>
  )
}

export default AdminPage