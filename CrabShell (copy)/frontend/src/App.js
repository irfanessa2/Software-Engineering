
import Login from './pages/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Signup from './pages/Signup'
import Employee_Details from './pages/Employee_Details'
import Records from './pages/Records';
import Fisherman from './pages/Fisherman';
import Revenue from './pages/Revenue';
import Header from './Header';
import Footer from './Footer';
import {loggedInEntity, setLoggedIn} from './data/user';
import React from 'react';
import styles from './styles/page.module.css';
import headerStyles from './styles/header.module.css';
import {useNavigate} from 'react-router-dom';
import {selectedEntity, setSelected} from './data/selected'

function App() {
  const navigate = useNavigate();
  
  React.useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('loggedIn') || false);
    setLoggedIn(loggedIn);
  }, []);
  
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerMenuClick = React.useCallback(() => {
    setDrawerOpen(prev => !prev);
  }, [setDrawerOpen]);

  const navigateTo = React.useCallback((url, index) => {
    if (index < 4) {
      setSelected(index)
    } else {
      setSelected(-1)
    }
    navigate(url);
  }, [navigate]);


  const isLoggedIn = loggedInEntity.use();

  const selected = selectedEntity.use();

  const loggedInContent = React.useMemo(() => {
    return [['/Revenue', 'Revenue'], ['/Records', 'Records'], ['/Employee_Details', 'Details'], ['/Fisherman', 'Fisherman'], ['/', 'Logout']].map(([url, label], index) => {
      const classNames = `${headerStyles.link}${index === selected ? ` ${headerStyles.selected}`: ''}`
      console.log(classNames)
      return <div className={classNames} onClick={() => navigateTo(url, index)} key={`${index}${label}`}>{label}</div>
    })
  }, [selected])

  const [windowSize, setWindowSize] = React.useState(window.innerWidth);

  React.useEffect(() => {
    const handleWindowResize = () => {
      setWindowSize(window.innerWidth);
      if(window.innerWidth >= 600) {
        setDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [setWindowSize, setDrawerOpen]);

  return (
    <div style={{position: 'relative'}}>
      <Header handleDrawerMenuClick={handleDrawerMenuClick}/>
      {drawerOpen && isLoggedIn && <div className={headerStyles.drawer}>
        {loggedInContent}
      </div>}
      <div className={styles.mainPage}>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/Signup' element={<Signup/>}></Route>
          <Route path='/Employee_Details' element={<Employee_Details/>}></Route>
          <Route path='/Records' element={<Records/>}></Route>
          <Route path='/Fisherman' element={<Fisherman/>}></Route>
          <Route path='/Revenue' element={<Revenue/>}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default React.memo(App);
