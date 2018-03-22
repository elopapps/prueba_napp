import React from 'react';

import './Item.css';
import Abstract from '../Abstract/Abstract'

const item = (props) => (
    <div className="Item col-lg-3 col-md-4 col-sm-6 col-xs-6" onClick={props.clicked}>
        <div>
            <img width="100%" src={props.image} alt="Card cap" />
            <Abstract
                name={props.name}
                gender={props.gender}
                profession={props.profession}
            />
{/*             <div className="ItemBody">
                <span className="Description">{props.name}</span>
                <span className="Smalltext">{props.gender==="M"?'Man':'Woman'}</span>
                <span className="Smalltext">{props.profession}</span>
            </div> */}
        </div>
    </div>
);

export default item;