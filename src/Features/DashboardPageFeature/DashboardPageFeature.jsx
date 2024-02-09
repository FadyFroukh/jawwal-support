import { Container, Row } from 'react-bootstrap';
import Crumbs from '../../utils/Others/Crumbs';
import { useContext, useEffect, useState } from 'react';
import { dashboardContext } from '../../Pages/DashboardPage/DashboardPage';
import MainHeader from '../MainPageFeature/components/MainHeader';
import WelcomeMessage from '../../utils/Others/WelcomeMessage';
import Posts from './components/Posts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectDashboardPage } from './slice/dashboradPageSlice';
import NoResult from '../../utils/Others/NoResult'
import Loading from '../../utils/Others/Loading';
import OnePost from './components/OnePost';
import SearchForm from '../../utils/Form/SearchForm';
const DashboardPageFeature = () => {

    const dispatch = useDispatch();

    const dashboardPage = useSelector(selectDashboardPage);

    const {action,setCrumbs,crumbs,job} = useContext(dashboardContext);

    const [filteredPosts,setFilteredPosts] = useState([])

    useEffect(()=>{
      action === '' && setCrumbs([]);
      Object.keys(job).length > 0 && setCrumbs([{label:job.problemTitle}]);
    },[action,job]);

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
        <MainHeader/>
        <Container>
            <Row>
                <Crumbs homeLink={'dashboard'} crumbs={crumbs}/>
                <WelcomeMessage/>
                {
                  !job.problemTitle && <section className='mb-3'>
                  <SearchForm
                    entries={dashboardPage.posts}
                    setEntries={setFilteredPosts}
                    searchFunction={searchFunction}
                    placeholder={'Search for a Problem'}
                  />
                </section>
                }
                {
                  job.problemTitle ? <OnePost post={job}/> : 
                  dashboardPage.postsLoading ? <Loading/> : 
                  dashboardPage.posts === undefined ? <NoResult msg='Error Loading Posts'/> : 
                  dashboardPage.posts === 'Collection is null' ? <NoResult msg='No Posts Yet'/> : 
                  <Posts posts={filteredPosts}/>
                }
            </Row>
        </Container>
    </>
  )
}

export default DashboardPageFeature
