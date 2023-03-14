import React, { useState } from 'react';
import { connect,useDispatch,useSelector } from 'react-redux';
import { Table, TableHead, TableBody, TableRow, TableCell, Button , TableContainer,TableFooter,TablePagination } from '@mui/material';
import { styled } from '@mui/material/styles';
import TablePaginationActions from '../pagination/pagination';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import { filteredresults } from '../utility/function';
import { motion } from 'framer-motion';
import { RootState } from '../../store/reducer/rootReducer';
import User from '../../types/userType';
import AddUser from '../addUser/addUser';
import { deleteUser } from '../../store/actions/actions';
import EditUser from '../editUser/editUser';
import SearchComponent from '../searchComponent/searchUser';





const StyledTable = styled(Table)({
   width:'80%',
   marginLeft:'10%',
   backgroundImage:'https://img.freepik.com/premium-photo/running-businessman-with-briefcase_1401-1787.jpg'
  
  
  });
  
  const StyledTableRow = styled(TableRow)({
    border: '1px solid black',
  });
  const StyledTableRow1 = styled(motion(TableRow))({
   
   
  });

  const StyledTableHeaderCell = styled(motion(TableCell))({
    border: '1px solid black',
    fontWeight:'bold',
    // background:'#79829a',
    background: '#efd99b',
    color:'#fff',
    textAlign:'center',
    fontSize:"18px"
  });

  const StyledTableBodyCell = styled(TableCell)({
    border: '1px solid black',
    textAlign:'center',
    color:'#000'
  });

  const StyledButton = styled(motion(Button))({
  
  });


const UserList = () => {
  const dispatch = useDispatch()
  const totalusers = useSelector((state: RootState) => state.userReducer.users)
  const [editUser, setEditUser] = useState({});
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [searchQuery,setSearchQuery] = useState('')
  const [editingState, setEditingState] = useState(false)

  const users = searchQuery.length !== 0 ? filteredresults(searchQuery,totalusers) : totalusers
  const rows = users

  const onChangeQuery = (query:any) => {
    setSearchQuery(query);
  };
  
  const handleEditUser = (user:User) => {
    setEditUser(user);
  };

  const handleDeleteUser = (user:User) => {
    dispatch(deleteUser(user))
  };

  const handleEditingState = () =>{
    setEditingState(!editingState)
  }

  // const handleUpdateUser = (user) => {
  //   dispatch(updateUser(user))
  //   setEditUser(null);
  // };



  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event:any, newPage:number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div>
      <div style={{display:'flex',width:'80%',justifyContent:'space-between',marginLeft:'10%'}}>
      <AddUser/>
      <SearchComponent  searchQuery={searchQuery}
        onChangeQuery={onChangeQuery}/>
        </div>
      <StyledTable>
        <TableHead >
          <StyledTableRow >
          <StyledTableHeaderCell animate={{x:0}} initial={{x:-100, }} transition={{duration:1.2}} >Name</StyledTableHeaderCell>
            <StyledTableHeaderCell  >Email</StyledTableHeaderCell>
            <StyledTableHeaderCell >Mobile</StyledTableHeaderCell>
            <StyledTableHeaderCell >Country</StyledTableHeaderCell>
            <StyledTableHeaderCell >State</StyledTableHeaderCell>
            <StyledTableHeaderCell >Pincode</StyledTableHeaderCell>
            <StyledTableHeaderCell animate={{x:0}} initial={{x:100}} transition={{duration:1.2}} >Actions</StyledTableHeaderCell>
          </StyledTableRow>
        </TableHead>
        <TableBody>
   
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((user,index) => (
           
            <StyledTableRow1  animate={{x:0,background:'transparent'}} initial={{x:-100 ,background:'green'}} exit={{x:-100 ,background:'red', transition:{duration:0.5}}} transition={{duration:1.2,delay:0.5}}  key={index} >
            <StyledTableBodyCell style={{fontWeight:'bold' }}>{user.personalDetails.name}</StyledTableBodyCell>
              <StyledTableBodyCell>{user.personalDetails.email}</StyledTableBodyCell>
              <StyledTableBodyCell>{user.personalDetails.phone}</StyledTableBodyCell>
              <StyledTableBodyCell>{user.personalDetails.country}</StyledTableBodyCell>
              <StyledTableBodyCell>{user.personalDetails.state}</StyledTableBodyCell>
              <StyledTableBodyCell>{user.personalDetails.pincode}</StyledTableBodyCell>
              <StyledTableBodyCell >
                <div style={{display:'flex' , justifyContent:'center' }}>
                <EditUser  editUser={user} handleEditUser={handleEditUser} editingState={editingState} handleEditingState={handleEditingState}/>
                <StyledButton startIcon={<DeleteIcon/>} whileHover={{scale:1.1,backgroundColor: 'red'}} variant='contained' style={{backgroundColor:'red'}} onClick={() => handleDeleteUser(user)}>Delete</StyledButton>
                </div>
              </StyledTableBodyCell>
            </StyledTableRow1>
          ))}
      
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={7}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: {
                  'aria-label': 'rows per page',
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </StyledTable>
    </div>
  );
};


export default UserList;