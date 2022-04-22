/*
Group 1: Anurag Bhattacharya, Aaishi Sinha, Illah Song, Joseph Volpe, Prajwal Regmi
*/

/*
In this Page, We allow the User... In this case, A Patient User to Add and Delete Emergency Alerts. They would also be able to view the Specific Alert
Joseph Developed This 
*/
import React, { Component } from 'react';

import Setup from '../components/setup/Setup';
import Backdrop from '../components/backdrop/Backdrop';
import AlertList from '../components/alerts/AlertList';
import AuthContext from '../context/Authentication-Context';
import './Pages.css';

class AlertPage extends Component {
  state = {
    creating: false,
    alerts: [],
    isLoading: false,
    selectedAlert: null
  };
  isActive = true;

  static contextType = AuthContext;

  constructor(props) {
    super(props);
    this.alertContentElRef = React.createRef();
    this.alertStatusElRef = React.createRef();
  }

  componentDidMount() {
    this.fetchAlerts();
  }

  startCreateAlertHandler = () => {
    this.setState({ creating: true });
  };

  SetupConfirmHandler = () => {
    this.setState({ creating: false });
    const alertcontent = this.alertContentElRef.current.value;
    const alertstatus = this.alertStatusElRef.current.value;

    if (
        alertcontent.trim().length === 0 ||
        alertstatus.trim().length === 0 
    ) {
      return;
    }

    const alert = { alertstatus, alertcontent};
    console.log(alert);

    const requestBody = {
      query: `
          mutation {
            addAlert(alertInput: {alertcontent: "${alertcontent}", alertstatus:"${alertstatus}"}) {
              alertstatus
              alertcontent
            }
          }
        `
    };

    const token = this.context.token;

    fetch('http://localhost:4000/patient', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedAlert = [...prevState.alerts];
          updatedAlert.push({
            _id: resData.data._id,
            alertcontent: resData.data.alertcontent,
            alertstatus: resData.data.alertstatus,
            patientnumber: {
              patient: this.context.patientnumber
            }
          });
          return { alerts: updatedAlert };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  SetupCancelHandler = () => {
    this.setState({ creating: false, selectedAlert: null });
  };

  fetchAlerts() {
    this.setState({ isLoading: true });
    const requestBody = {
      query: `
          query {
            alerts {
                _id
                alertstatus
                alertcontent
                patient{
                  _id
                  patientnumber
                }
            }
          }
        `
    };

    fetch('http://localhost:4000/patient', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!');
      }
      return res.json();
    })
    .then(resData => {
      const alerts = resData.data.alerts;
      if (this.isActive) {
        this.setState({ alerts: alerts, isLoading: false });
      }
    })
    .catch(err => {
      console.log(err);
      if (this.isActive) {
        this.setState({ isLoading: false });
      }
    });
  }

  showAlertHandler = patientnumber => {
    this.setState(prevState => {
      const selectedAlert = prevState.alerts.find(alerts => alerts.patientnumber === patientnumber);
      return { selectedAlert: selectedAlert };
    });
  };

  alertDeleteHandler = alertId => {
    this.setState({ isLoading: true });
    console.log(alertId)
    const requestBody = {
      query: `
          mutation {
            removeAlert(alertId: "${alertId}") {
              _id
              patient{
                _id
              }
            }
          }
        `
    };

    fetch('http://localhost:4000/patient', {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.context.token
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error('Failed!');
        }
        return res.json();
      })
      .then(resData => {
        this.setState(prevState => {
          const updatedAlert = prevState.alerts.filter(alerts => {
            return alerts._id !== alertId;
          });
          return { alerts: updatedAlert, isLoading: false };
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentWillUnmount() {
    this.isActive = false;
  }

  render() {
    return (
      <React.Fragment>
        {(this.state.creating || this.state.selectedAlert) && <Backdrop />}
        {this.state.creating && (
          <Setup
            title="Send Alert"
            canCancel
            canConfirm
            onCancel={this.SetupCancelHandler}
            onConfirm={this.SetupConfirmHandler}
            confirmText="Confirm"
          >
            <form>
              <div className="form-control">
                <label htmlFor="alertstatus">Alert Severity</label>
                <input type="text" id="alertstatus" ref={this.alertStatusElRef} />
              </div>
           
              <div className="form-control">
                <label htmlFor="alertcontent">Alert Message</label>
                <input type="text" id="alertcontent" ref={this.alertContentElRef} />
              </div>
            </form>
          </Setup>
        )}
        {this.context.token && (
          <div className="alert-control">
            <p>List of your alert</p>
            <button className="btn" onClick={this.startCreateAlertHandler}>
              Add Alert
            </button>
          </div>
        )}
        {this.state.isLoading ? (
          <h6>You dont have any alerts.</h6>
        ):(
          <AlertList
            alerts={this.state.alerts}
            authStudentId={this.context.patientnumber}
            onViewAlerts={this.showAlertHandler}
            onDeleteAlert={this.showAlertHandler && this.alertDeleteHandler}
          />
        )
      }
      </React.Fragment>
    );
  }
}

export default AlertPage;