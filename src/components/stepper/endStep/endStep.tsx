import React from "react";
import { Card} from "@mui/material";

const EndStep= () => {
   
  return (
    <div>
    <Card sx={{ boxShadow: 2, backgroundColor: 'white', border: 1, borderColor: 'grey.400', borderRadius: '16px', my: 2 }}>
     <img style={{objectFit:'cover',width:'100%'}} src="https://www.commbox.io/wp-content/uploads/2019/10/32-1-1024x597.jpg" alt="thank you"/>
    </Card> 
    </div>
  
  )

}

export default EndStep