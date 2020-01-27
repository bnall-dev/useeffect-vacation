import React from 'react';

function CreateVacation(props) {
  return (
    <form id="createVacation" onSubmit={props.onSubmit}>
      <div id="startDiv">
        <label htmlFor="startDate">Start Date</label>
        <input id="startDate" type="date"></input>
      </div>
      <div id="endDiv">
        <label htmlFor="endDate">End Date</label>
        <input id="endDate" type="date"></input>
      </div>
      <input id="submit" type="submit" value="Create"></input>
    </form>
  );
}

export default CreateVacation;
