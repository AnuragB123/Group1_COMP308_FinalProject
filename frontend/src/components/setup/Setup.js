import React from 'react';

import './Setup.css';

const setup = props => (
  <div className="setup">
    <header className="setup__header">
      <h1>{props.title}</h1>
    </header>
    <section className="setup__content">{props.children}</section>
    <section className="setup__actions">
      {props.canCancel && (
        <button className="btn" onClick={props.onCancel}>
          Cancel
        </button>
      )}
      {props.canConfirm && (
        <button className="btn" onClick={props.onConfirm}>
          {props.confirmText}
        </button>
      )}
    </section>
  </div>
);

export default setup;