import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";
import CloseIcon from "@material-ui/icons/Close";
function AlertPopUp(props) {
  return (
    <div className="container mx-auto border-1 shadow-md max-w-2xl">
      <Collapse in={props.open}>
        <Alert
        // action={
        //   <IconButton
        //     aria-label="close"
        //     color="inherit"
        //     size="small"
        //     onClick={() => {
        //       props.handleClick();
        //     }}
        //   >
        //     <CloseIcon fontSize="inherit" />
        //   </IconButton>
        // }
        >
          {props.alertText}
        </Alert>
      </Collapse>
    </div>
  );
}

export default AlertPopUp;
