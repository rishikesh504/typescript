import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import AddUser from './components/addUser/addUser';
import { RootState } from './store/reducer/rootReducer';
import StartPage from './components/startPage/startpage';
import { motion } from 'framer-motion';
import UserList from './components/userList/userList';
import "./App.css"



const App: FC = () => {

  const numberOfUsers:number = useSelector((state: RootState) => state.userReducer.users.length);


  return (
    <div className="App">
      <motion.div className="TopContainer" initial={{ y: -250 }} animate={{ y: 0 }} transition={{ delay: 0.2, type: 'spring', stiffness: 150 }} >    
       
        <div style={{ height: '50%', display: 'flex', justifyContent: 'center', flexDirection: 'column', marginTop: '10px' }}>
        
          <h1 className="heading">Employee Management </h1>
        
        </div>

      </motion.div>

      {numberOfUsers == 0 ? <StartPage/> : <UserList />}
    </div>
  );
}

export default App;
