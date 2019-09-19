import React, { Component } from 'react';
import Row from './Row.jsx';
import RowHeader from './RowHeader.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      applications: [],
      newAppName: "",
    };
    this.update = this.update.bind(this);
    this.deleteApp = this.deleteApp.bind(this);
  }

  componentDidMount() {
    fetch('/api/')
      .then(res => res.json())
      .then(data => {
        return this.setState({applications: data});
      })
      .catch(err => console.log('App.componentDidMount ERROR: ', err));
    }
    
  update(event, row, column) {
    let updatedApp = Object.assign({}, this.state.applications[row]);
    updatedApp[column] = event.target.value;
    this.state.applications[row] = updatedApp;
    this.setState({applications: this.state.applications});
  }
    
  cancelSave() {
    fetch('/api/')
    .then(res => res.json())
    .then(data => {
      document.getElementById('rows').reset();
      this.setState({applications: data});
      })
      .catch(err => console.log('App.cancelSave ERROR: ', err));
  }

  newAppName(event) {
    this.setState({newAppName: event.target.value});
  }

  addNewApp() {
    let appCopy = this.state.applications.slice();
    let newApp = {company: this.state.newAppName};
    appCopy.push(newApp);
    fetch('/api/', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newApp)
    })
    .catch(err => console.log('App.addNewApp ERROR', err));
    this.setState({applications: appCopy});
  }

  deleteApp(id, rowNum) {
    let appCopy = this.state.applications.slice();
    appCopy.splice(rowNum, 1);
    this.setState({applications: appCopy});
    fetch(`/api/${id}`, {
      method: 'DELETE', 
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .catch(err => console.log('App.deleteApp ERROR', err));
  }

  saveApps() {
    fetch('/api/', {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state.applications)
    })
  }


  render() {
    const rows = [];
    for(let i = 0; i < this.state.applications.length; i++) {
      rows.push(<Row deleteApp={this.deleteApp} update={this.update} rowNum={i} app={this.state.applications[i]}/>)
    }
    return (
      <div className='main'>
        <div className='title'><h1>Application Progression</h1></div>
        <div className='centeredBox'>
          <input className='input' type="text" onChange={(e) => {this.newAppName(e)}}/>
          <button onClick={() => {this.addNewApp()}}>Add New App</button>
        </div>
        <br/>
        <RowHeader/>
        <form id='rows'>{rows}</form>
        <div className='centeredBox'>
          <button onClick={() => {this.saveApps()}}>Save</button>
          <button onClick={() => {this.cancelSave()}}>Cancel</button>
        </div>
      </div>
    );
  }
}
  
  export default App;
  