import { useContext, useEffect } from "react";
import { adminContext } from "../../pages/AdminPage/AdminPage";
import AdminMain from "./components/AdminMain";
import { Container, Row } from "react-bootstrap";
import Crumbs from "../../utils/Others/Crumbs";
import MainHeader from "../MainPageFeature/components/MainHeader";
import UsersManagement from "./components/UsersManagement";
import AddUser from "./components/AddUser";
import EditUser from "./components/EditUser";
import PostsManagement from "./components/PostsManagement";
import EditPost from "./components/EditPost";
import { appContext } from "../../App";
import AddPost from './components/AddPost'
const AdminPageFeature = () => {

  const {editItem} = useContext(appContext);

  const {setAction,action,setCrumbs,crumbs} = useContext(adminContext);

  useEffect(()=>{
    action === '' && setCrumbs([]);
    action === 'users' && setCrumbs([{label:"Users Management"}]);
    action === 'addUser' && setCrumbs([{label:"Users Management",command:()=>{setAction("users")}},{label:"Add User"}]);
    action === 'editUser' && setCrumbs([{label:"Users Management",command:()=>{setAction("users")}},{label:"Edit User"}]);
    action === 'posts' && setCrumbs([{label:"Posts Management"}]);
    action === 'addPost' && setCrumbs([{label:"Posts Management",command:()=>{setAction("posts")}},{label:"Add Post"}]);
    action === 'editPost' && setCrumbs([{label:"Posts Management",command:()=>{setAction("posts")}},{label:"Edit Post"}]);
  },[action]);

  return (
    <>
        <MainHeader/>
        <Container>
          <Row>
            <Crumbs homeLink={'admin'} crumbs={crumbs}/>
            {
              action === '' && <AdminMain/>
            }
            {
              action === 'users' && <UsersManagement/>
            }
            {
              action === 'addUser' && <AddUser/>
            }
            {
              action === 'editUser' && <EditUser/>
            }
            {
              action === 'posts'  && <PostsManagement/>
            }
            {
              action === 'addPost' && <AddPost/>
            }
            {
              action === 'editPost' && <EditPost post={editItem}/>
            }
          </Row>
        </Container>
    </>
  )
}

export default AdminPageFeature