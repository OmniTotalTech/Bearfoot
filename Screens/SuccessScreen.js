import React from "react";
import AlertPopUp from "../Components/AlertPopUp";

const SuccessScreen = (props) => {
  const handleClick = () => {
    props.navigation.pop(2);
  };
  return (
    <div
      onClick={() => {
        handleClick();
      }}
      className="container p-4 mx-auto h-screen bg-white"
    >
      <AlertPopUp
        open={true}
        handleClick={handleClick}
        alertText={
          "Your action has been completed. Click anywhere to go pack to the pool screen."
        }
      />
    </div>
  );
};

export default SuccessScreen;
