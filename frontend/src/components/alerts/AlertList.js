import React from 'react';

import AlertItem from './alert/AlertItem';
import './AlertList.css';

const alertList = props => {
  const alerts = props.alerts.map(alert => {
    return (
      <AlertItem
        key={alert._id}
        alertContent={alert.content}
        patientId={props.patientId}
        onAlert={props.onViewAlert}
        onDelete={props.onDeleteAlert}
      />
    );
  });
  return <ul className="alert__list">{alerts}</ul>;
};
export default alertList;