import { Button, Chip, Paper } from "@mui/material";
import { styled } from "@mui/system";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CancelIcon from '@mui/icons-material/Cancel';


const Example=()=>{

  const customStyle={
    width:200,
    backgroundColor:"#F9F8F8",
    display: "flex",
    justifyContent: "space-between",
    "& .MuiChip-label":{
      color:"#0083C6",
      
    },
    "& .MuiChip-icon":{
      order:1,
      marginLeft:6,
      color:"#2EA7E5",
      cursor:"pointer",
      "&:hover":{
        color:"#2EA7E5",
      }
    },
    "& .MuiChip-deleteIcon":{
      order:2,
      color:"#2EA7E5",
      "&:hover":{
        color:"#2EA7E5",
      }
    },
    
    
  }

  const handleDelete=()=>{

  }

  

  return(
  <>
    
    <Chip 
      icon={<ArrowDropDownIcon/>} 
      onDelete={handleDelete}
      deleteIcon={<CancelIcon/>}
      label="MyChip"
      variant="outlined"
      sx={{...customStyle}}
    />
    
  </>
  );
}

export default Example;