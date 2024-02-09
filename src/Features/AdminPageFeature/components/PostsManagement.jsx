import { Col } from "react-bootstrap"
import FormButton from "../../../utils/Form/FormButton"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectAdminPage } from "../slice/adminPageSlice"
import { adminContext } from "../../../Pages/AdminPage/AdminPage"
import SearchForm from "../../../utils/Form/SearchForm"
import { fetchPosts, selectDashboardPage } from "../../DashboardPageFeature/slice/dashboradPageSlice"
import Posts from "../../DashboardPageFeature/components/Posts"

const PostsManagement = () => {

  const dashboardPage = useSelector(selectDashboardPage);

  const dispatch = useDispatch();

  const [filteredPosts,setFilteredPosts] = useState([]);

  const {setAction} = useContext(adminContext);

  useEffect(()=>{
    dispatch(fetchPosts());
  },[]);

  useEffect(()=>{
    setFilteredPosts(dashboardPage?.posts);
  },[dashboardPage.posts]);


  const searchFunction = (value,entries)=>{
    return entries.filter(entry=>entry.problemTitle.toLowerCase().includes(value.toLowerCase()));
  }

  return (
    <>
      <Col xs={12} lg={6} className="mt-3"> 
          <SearchForm 
              placeholder='Search for a Post'
              searchFunction={searchFunction}
              setEntries={setFilteredPosts}
              entries={dashboardPage?.posts}
          />
        </Col>
        <Col xs={12} lg={6} className="mt-3 mb-3"> 
          <FormButton 
            txt={'Add Post'} 
            func={()=>setAction("addPost")}
            icon="pi pi-plus-circle"
          />
      </Col>
      <Posts posts={filteredPosts}/>
    </>
  )
}

export default PostsManagement
