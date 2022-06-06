import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';


export default function RequestPopover({setAnchorEl, anchorEl}) {

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

  const handleClose = () => {
    setAnchorEl(!anchorEl);
  };

  const open = Boolean(anchorEl);


  return (
      <Popover
        id="request"
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 3, 
                color:"white",
                fontFamily: "Signika Negative",
                fontSize: "3.5vh",
                letterSpacing: 1,
                fontWeight: 900,
                textAlign:"center",
                backgroundColor:"orange",
                }}
                 >Yay! request sent!</Typography>
      </Popover>
  );
}
