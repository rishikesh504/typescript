
import React, {useEffect} from "react";
// import {useDispatch} from "react-redux";
// import { searchUser } from "../../actions/actions";
import {motion} from "framer-motion"
import { Search_User} from "../../store/reducer/reducer";
import { useDispatch } from "react-redux";
import { Update } from "@mui/icons-material";
import User from "../../types/userType";






interface SearchUserProps {
  searchQuery: string;
  onChangeQuery: any;
  users:User[]
}

const SearchComponent = ({ searchQuery, onChangeQuery,users }: SearchUserProps) => {


  useEffect(() => {
  
    let timerId :any ;

    function handleDispatchSearch() {
      console.log("here")
      dispatch(Search_User(searchQuery))   
   
    }

    timerId = setTimeout(handleDispatchSearch, 500);
    return () => clearTimeout(timerId);

  }, [searchQuery,users]);

 






  const dispatch = useDispatch()


  const handleSearch = (event: any) => {
    onChangeQuery(event.target.value);
    
  };


  return (
    <motion.div animate={{x:0}} initial={{x:-100}} transition={{duration:1.2}} className="searchContainer"  style={{marginBottom:'10px'}}>
    {/* <input style={{minHeight:'35px'}} type="search" onChange={(e)=>dispatch(searchUser(e.target.value))}  /> */}
    <input style={{minHeight:'35px'}} type="search" onChange={handleSearch}  />
    </motion.div>
   
  )

}


export default SearchComponent