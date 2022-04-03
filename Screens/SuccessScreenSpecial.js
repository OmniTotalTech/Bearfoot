import React from "react";
import AlertPopUp from "../Components/AlertPopUp";

const SuccessScreenSpecial = (props) => {
    const handleClick = () => {
        props.navigation.pop(3);
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
                    "Your action has been completed. Click anywhere to go back to your previous screen."
                }
            />
        </div>
    );
};

export default SuccessScreenSpecial;
