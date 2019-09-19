import React from 'react';

const Row = (props) => {
  const {app, rowNum, update, deleteApp} = props;
  if(app.application) {app.application = app.application.slice(0,10)}
  if(app.firstemail) {app.firstemail = app.firstemail.slice(0,10)}
  if(app.secondemail) {app.secondemail = app.secondemail.slice(0,10)}
  if(app.nextinterview) {app.nextinterview = app.nextinterview.slice(0,10)}
  return (
    <div id="row" style ={{width: '100%', display: 'flex', textAlign: 'center'}}>
      <span className='company' type='text'>{app.company}</span>
      <input className='input' type='text' value={app.email} onChange={(e) => {update(e, rowNum, 'email')}}/>
      <input className='input' type='date' value={app.application} onChange={(e) => {update(e, rowNum, 'application')}}/>
      <input className='input' type='date' value={app.firstemail} onChange={(e) => {update(e, rowNum, 'firstemail')}}/>
      <input className='input' type='date' value={app.secondemail} onChange={(e) => {update(e, rowNum, 'secondemail')}}/>
      <input className='input' type='date' value={app.nextinterview} onChange={(e) => {update(e, rowNum, 'nextinterview')}}/>
      <input className='input' type='text' value={app.interviewcount} onChange={(e) => {update(e, rowNum, 'interviewcount')}}/>
      <span className='delInput'><button onClick={() => {deleteApp(app._id, rowNum)}}>Delete</button></span>
    </div>
  );
};

export default Row;