import React from "react";
import QueueProps from "./props";
import "./styles.css";


export const Queue: React.FC<QueueProps> = ({ queue }) => {
  return (
    <div className="queue-container">
        <span className="label">Queue:</span>
        {queue.map(
            (action, index) => 
            <div className="queue-item" key={index}>{action}</div>
        )}
        {queue.length === 0 || !queue 
            ? <div className="no-queue">Aucune action dans la queue</div> 
            : null
        }
    </div>
  );
};

export default Queue;