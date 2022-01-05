import React, { useEffect, useRef, useState } from 'react';
import SearchMenu from './SearchMenu';
import MenuListItem from './MenuListItem';
import { Chip, Menu, Tooltip } from '@mui/material';
import { maxWidth } from '@mui/system';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CancelIcon from '@mui/icons-material/Cancel';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

import useCapsuleStyle from './CapsuleStyle';


// props will store - menu items and other customizable items
const FilterCapsule=({capsuleLabel, columnIdentity, menuItems, 
  selectedMenuItems, styledMenuVisible, updateTableRows, removeCapsule})=> {
  const MAX_LEN=20;
  

  const [currentLabels, setCurrentLabels]=useState(selectedMenuItems);

  

  //const [chipLabel, setChipLabel]=React.useState(props.chipLabel);

  

  let checkboxMenu=Array(menuItems?menuItems.length:0).fill(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const defaultForderRadius={borderRadius:"16px 16px 16px 16px", height:100, marginTop:1};
  const updatedForderRadius={borderRadius:"16px 16px 0 0", border:"none", marginBottom:0, height:100,};
  const [chipRadius, setChipRadius]=useState(defaultForderRadius);
  const open = Boolean(anchorEl);

  let tempChipLabel=capsuleLabel;
  let actualTempChipLabel=capsuleLabel;

  if(selectedMenuItems && selectedMenuItems.length>0){
      selectedMenuItems.map(item=>{
    
      let index=menuItems.indexOf(item);
      checkboxMenu[index]=index>-1?true:checkboxMenu[index];
      //
      if(index>-1){
        let chipLabelList=currentLabels;//
      
        let tempLabel=chipLabelList.join('|');
        tempLabel=`${tempChipLabel}:${tempLabel}`;
        actualTempChipLabel=tempLabel;
        //setActualChipLabel(tempLabel);
  
        if(tempLabel.length>=MAX_LEN){
          tempLabel=`${tempLabel.substring(0, MAX_LEN-3)}...`
          
  
        }    
        //setChipLabel(tempLabel); 
        tempChipLabel=tempLabel;
        //console.log(tempChipLabel);
      }   
      
    });
  
  }
  
  let tempChiplabelMap={};
  if(menuItems && menuItems.length>0){
      menuItems.map((item)=>{
      let index=selectedMenuItems.indexOf(item);
      if(index>-1){
        tempChiplabelMap[item]=true;
      }else{
        tempChiplabelMap[item]=false;
      }
      
  
    });
  }
  

  const [chipLabel, setChipLabel]=React.useState(tempChipLabel);
  const [actualChipLabel, setActualChipLabel]=React.useState(actualTempChipLabel);


  const [menuCheckbox, setMenuCheckbox]=React.useState(checkboxMenu);
  const [lastestMenuCheckbox, setLastestMenuCheckbox]=React.useState(checkboxMenu);
  const [capsuleMenuItems, setCapsuleMenuItems]=React.useState(menuItems);
  const [searchValue, setSearchValue]=useState('');
  const [chipVisible, setChipVisible]=useState(true);
  const [chiplabelMap, setChiplabelMap]=useState(tempChiplabelMap);
  const elementRef=useRef();
  const menuRef=useRef();
  const [checkBoxVisible, setCheckBoxVisible]=useState(true);
  

  //
  const [menuWidth, setMenuWidth]=useState(0);

 

  

  // Onclick , show the menu
  const handleMenuDropDownClick = (event) => {
    
    setAnchorEl(event.currentTarget);
    setChipRadius(updatedForderRadius);
    

  };

  // if clicked somewhere, close the menu
  const handleClose = () => {
    
    setAnchorEl(null);
    setChipRadius(defaultForderRadius);
    setCheckBoxVisible(true);
  };

  const handleDelete=(event)=>{
    setChipVisible(false);
    if(removeCapsule){
      removeCapsule(columnIdentity);
    }
  }

  const capsuleUpdateTableRows=()=>{
    let selectedRows=[]
    for(let item in chiplabelMap){
        if(chiplabelMap[item]){
          selectedRows.push(item);
        }
    }
    //updateTableRows
    console.log('capsuleUpdateTableRows called')
    updateTableRows(columnIdentity, selectedRows);

    //updateTableRows
  }

  const handleMenuCheckBox=(itemName, event, index)=>{

    
    
    menuCheckbox[index]=event.target.checked;
    lastestMenuCheckbox[index]=event.target.checked;
    chiplabelMap[itemName]=event.target.checked

    setChiplabelMap(chiplabelMap);
    setMenuCheckbox(menuCheckbox);
    setLastestMenuCheckbox(lastestMenuCheckbox);

    let chipLabelList=currentLabels;//
    

    if(event.target.checked){
      chipLabelList.push(itemName);
    }else{
      chipLabelList=chipLabelList.filter(item=>item!=itemName);
    }

    setCurrentLabels(chipLabelList);
    let tempLabel=chipLabelList.join('|');
    tempLabel=`${capsuleLabel}:${tempLabel}`;
    setActualChipLabel(tempLabel);

    if(tempLabel.length>=MAX_LEN){
      tempLabel=`${tempLabel.substring(0, MAX_LEN-3)}...`
      

    }    
    setChipLabel(tempLabel); 

    
    capsuleUpdateTableRows();     

  }
  
  let menuListItemProps={
    menuItems: capsuleMenuItems,
    menuCheckbox: lastestMenuCheckbox,
    handleMenuCheckBox: handleMenuCheckBox,
    checkBoxVisible:checkBoxVisible,
  }

  const handleOnChange=(event)=>{
    
    setSearchValue(event.target.value);
  }

  const searchMenuProps={
    handleOnChange:handleOnChange,
    searchValue:searchValue
  }

  // Maintain the values stored in menu checkboxes throughout the rendering process
  
  useEffect(() => {
    
    if(searchValue.length>0){
        
        let tempMenuItems=[]
        let tempMenuCheckbox=[];
        
        for(let item in chiplabelMap){
          
          if(item.toUpperCase().startsWith(searchValue.toUpperCase())){
            tempMenuItems.push(item);
            tempMenuCheckbox.push(chiplabelMap[item]);
          }
          
        }
        if(tempMenuItems.length>0){
          setMenuCheckbox(tempMenuCheckbox);
          setLastestMenuCheckbox(tempMenuCheckbox);
          setCapsuleMenuItems(tempMenuItems);
        }else{
          setCheckBoxVisible(false);
        }
        
        
    }
    
    else{
      
      setCapsuleMenuItems(menuItems);
      let tempMenuCheckBox=[];
      if(menuItems){
        menuItems.map(item=>{
          tempMenuCheckBox.push(chiplabelMap[item]);
        });
      }
      setMenuCheckbox(tempMenuCheckBox);
      setLastestMenuCheckbox(tempMenuCheckBox);
      setCheckBoxVisible(true);
      
    } 
    
    
  }, [searchValue]);
  
  
  const filterMenuProps={
    id:"simple-menu",
        
    elevation:0,
    
    PaperProps:{ 
      style: {  
        width: elementRef.current?elementRef.current.offsetWidth:200 ,
        backgroundColor:"#404040", 
        borderRadius:"0 0 16px 16px",
        borderTop:"none",
        marginTop:4,
        //maxHeight:"25vh",
        //marginLeft:elementRef.current?-(elementRef.current.offsetWidth-46):-120,

      },  
    },
    anchorOrigin:{vertical: "bottom",},
    
  }

  const capsuleClasses = useCapsuleStyle();

  const chipProps={
    "aria-controls":"simple-menu",
    "aria-haspopup":true,
    title: actualChipLabel,
    label: chipLabel,
    ref:elementRef,
    classes:{
      root: capsuleClasses.chipRoot
    },
    sx:chipRadius,
}
  

  //console.log(elementRef);
  //ArrowDropUpIcon
  

  

  return (
    <>
      
        
    
        {
          chipVisible 
          &&
          <Chip
            
            {...chipProps}
            onDelete={handleDelete} //handleDelete
            deleteIcon={<CancelIcon titleAccess={`Remove chip:${capsuleLabel}`}  />}
            icon={styledMenuVisible?<ArrowDropDownIcon titleAccess={`List of items in ${capsuleLabel}`} onClick={(event)=>{handleMenuDropDownClick(event)}} />:null}  
          />
        }
         
        {
        
            styledMenuVisible  //styledMenuVisible

            &&
            <Menu
              {...filterMenuProps}
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              getContentAnchorEl={null}
              ref={menuRef}
              
            >
            
              <SearchMenu {...searchMenuProps}/>
             
              
              <MenuListItem {...menuListItemProps}/>
            
            </Menu>
            
        }
    </>
  );
}



export default FilterCapsule;
