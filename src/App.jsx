import { BrowserRouter, Route, Routes } from "react-router-dom"
import Cookies from "js-cookie"
import { decodeToken } from "react-jwt"
import { createContext, useEffect, useRef, useState } from "react"
import { Toast } from "primereact/toast";
import LoginPage from "./Pages/LoginPage/LoginPage";
import MainPage from "./Pages/MainPage/MainPage";
import DashboardPage from "./Pages/DashboardPage/DashboardPage";
import AdminPage from "./Pages/AdminPage/AdminPage";
import DeletePopup from "./utils/Others/DeletePopup";
import Footer from "./utils/Others/Footer";

export const appContext = createContext({
  toast:{},
  deleteId:"",
  setDeleteId:()=>{},
  editItem:{},
  setEditItem:()=>{},
  deletePopup:false,
  setDeletePopup:()=>{},
  item:"",
  setItem:""
});

function App() {

  const toast = useRef(null);

  const [user,setUser] = useState(false);
  const [userType,setUserType] = useState("");
  const [deleteId,setDeleteId] = useState("");
  const [editItem,setEditItem] = useState(()=>{});
  const [deletePopup,setDeletePopup] = useState(false);
  const [item,setItem] = useState("");

  useEffect(()=>{
    if (Cookies.get("token")){
      setUser(true);
      const token = decodeToken(Cookies.get("token"));
      if (token.superUser){
        setUserType("admin");
      }else{
        setUserType("user")
      }
    }
  },[]);

  return (
    <>
      <appContext.Provider value={{toast,deleteId,setDeleteId,editItem,setEditItem,deletePopup,
        setDeletePopup,item,setItem}}>
        <Toast ref={toast}/>
        {
          deletePopup && <DeletePopup/>
        }
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            {
              user ? 
              <>
              <Route path="*" element={'four o four'}/>
              {
                userType === 'admin' && <Route path="/admin" element={<AdminPage/>}/>
              }
              {
                userType ==='user' && <Route path="/dashboard" element={<DashboardPage/>}/>
              }
              </> : 
              <>
              <Route path="*" element={<LoginPage/>}/>
              
              </>
            }
          </Routes>
        </BrowserRouter>
        <Footer/>
      </appContext.Provider>
    </>
  )
}

export default App
