
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Chip, TextField } from '@mui/material';
import { useState } from 'react';
import MultiSelectExample from './MultiSelectExample';

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const ITEM_HEIGHT = 48;

const Example=()=> {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [inputVal, setInputVal]=useState('');
  const [openMenu, setOpenMenu]=useState(false);
  const handleClick = (event) => {
    setOpenMenu(true);
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(false);
  };

  const handleChange=(event)=>{
    setInputVal(event.target.value);
  }

  return (
    <div>
      <Chip
        aria-label="more"
        id="long-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        onClick={handleClick}
        label="Click"
        onDelete={null}
      />
        
      
      {
        openMenu
        &&
        <MultiSelectExample
            id="long-menu"
            MenuListProps={{
            'aria-labelledby': 'long-button',
            }}
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            PaperProps={{
            style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                
            },
            }}
        />
        
      
      }
    </div>
  );
}

export default Example;
