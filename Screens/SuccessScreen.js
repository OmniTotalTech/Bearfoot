import React from "react";
import AlertPopUp from "../Components/AlertPopUp";

const SuccessScreen = (props) => {
  const handleClick = () => {
    props.navigation.pop(2);
  };
  return (
    <div className="container p-4 mx-auto">
      <AlertPopUp
        open={true}
        handleClick={handleClick}
        alertText={"Your action has been completed. Close to navigate away"}
      />
    </div>
  );
};

export default SuccessScreen;
