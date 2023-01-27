import React from "react";
import ActionButtonProps from "./props";
import "./styles.css";


export const ActionButton: React.FC<ActionButtonProps> = ({ action, creditsLeft, onClick }) => {
  return (
      <div className="actionButton-container">
        <button className="actionButton" onClick={e => onClick(action)}>
        {action}
        </button>
        <span>{creditsLeft}</span>
      </div>
  );
};

export default ActionButton;