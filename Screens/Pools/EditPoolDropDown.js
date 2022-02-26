import React, { Component } from "react";
import { render } from "react-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import EditLocationIcon from "@material-ui/icons/EditLocation";
function App(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
    setAnchorEl2(null);
  };

  return (
    <div>
      <Button
        name="el1"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        <EditLocationIcon fontSize="large" />
        Edit Location
      </Button>
      <Menu
        id="simple-menu"
        name="el1"
        className="inline-flex"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => props.handleClick("BasicInfo")}>
          Basic Information
        </MenuItem>
        <MenuItem onClick={() => props.handleClick("Inventory")}>
          Inventory
        </MenuItem>
        <MenuItem onClick={() => props.handleClick("EmpAssignment")}>
          Employee Assignment
        </MenuItem>
      </Menu>
    </div>
  );
}

export default App;
