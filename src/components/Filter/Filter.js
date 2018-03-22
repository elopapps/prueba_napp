import React from 'react';

import './Filter.css';
import { Input, FormGroup } from 'reactstrap';

const filter = (props) => (
    <div className="Filter">
       {/*  <input type="text" onChange={props.changed} value={props.query} /> */}
       <FormGroup>
            <img className="Lens" width="15px" src='https://s3.eu-central-1.amazonaws.com/napptilus/level-test/imgs/ic_search.png' alt="Card cap" />
            <input className="Term" type="text" onChange={props.changed} placeholder="Search" value={props.query} /> 
     </FormGroup>
    </div>
);

export default filter;