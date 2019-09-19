import React from 'react';

const RowHeader = (props) => {
  const {app} = props;
  return (
    <div className="row" style ={{width: '100%', display: 'flex', textAlign: 'center'}}>
      <span className='rowHeader'>Company Name</span>
      <span className='rowHeader'>Email/Contact Info</span>
      <span className='rowHeader'>Application Date</span>
      <span className='rowHeader'>First Email Date</span>
      <span className='rowHeader'>Second Email Date</span>
      <span className='rowHeader'>Next Interview Date</span>
      <span className='rowHeader'>Number of Interviews</span>
    </div>
  );
};

export default RowHeader;