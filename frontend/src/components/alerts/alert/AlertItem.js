import React from 'react';

import './AlertItem.css';

const alertItem = props => (
  <li key={props.alertId} className="alerts__list-item">
    <div>
      <h1>{props.alertId}</h1>
      <h2>
        {props.content}
      </h2>
    </div>
    <div>
      <p>View/Delete Alerts</p>
      <button className="btn" onClick={props.onAlert.bind(this, props.patientId)}>
          View Alerts
      </button>
      <button className="btn" onClick={props.onDelete.bind(this, props.alertId)}>
        Cancel Alert
      </button>
      
    </div>
  </li>
);

export default alertItem;