import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import StartPage from './components/startPage/startpage';
import { motion } from 'framer-motion';
import UserList from './components/userList/userList';
import "./App.css"
import { RootState } from './store/userStore/userStore';


const App: FC = () => {



  const getTotalUsers :number = useSelector((state: RootState) => state.users.length);


  return (
    <div className="App">
      <motion.div className="TopContainer" initial={{ y: -250 }} animate={{ y: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 150 }} >    
        <div style={{ height: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '10px' }}>
          <h1 className="heading" >Employee Management </h1>
        
        </div>

      </motion.div>

      {getTotalUsers == 0 ? <StartPage/> : <UserList />}
    </div>
  );
}

export default App;
