import React from "react";
import {motion} from "framer-motion"

interface SearchUserProps {
    searchQuery:string
    onChangeQuery:any
  }






const SearchComponent =({searchQuery,onChangeQuery}:SearchUserProps)=> {

 const handleSearch =(event:any) => {
    onChangeQuery(event.target.value)
  }
// const dispatch = useDispatch()


  return (
    <motion.div animate={{x:0}} initial={{x:-100}} transition={{duration:1.2}} className="searchContainer"  style={{marginBottom:'10px'}}>
    {/* <input style={{minHeight:'35px'}} type="search" onChange={(e)=>dispatch(searchUser(e.target.value))}  /> */}
    <input style={{minHeight:'35px'}} type="search" onChange={handleSearch}  />
    </motion.div>
   
  )

}


export default SearchComponent