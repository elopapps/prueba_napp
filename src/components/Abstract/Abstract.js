import React from 'react';

import './Abstract.css';

const abstract = (props) => (
    <div>
        <div className="ItemBody">
            <span className="Description">{props.name}</span>
            <span className="Smalltext">{props.gender==="M"?'Man':'Woman'}</span>
            <span className="Smalltext">{props.profession}</span>
        </div>
    </div>
);

export default abstract;