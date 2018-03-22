import React from 'react';

import './Detailed.css';
import Abstract from '../Abstract/Abstract';
import Parser from 'html-react-parser';

const detailed = (props) => (
    <div className="row">
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
            <img width="100%" src={props.image} alt="Card cap" />
        </div>
        <div className="col-sm-6 col-md-6 col-lg-6 col-xs-6">
            <Abstract
                name={props.name}
                gender={props.gender}
                profession={props.profession}
            />
            <p className="Left">{Parser(props.quota)}</p>
        </div>
    </div>
);

export default detailed;