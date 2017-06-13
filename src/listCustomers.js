import React from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

// Set of selected ids to be removing.
var listOfSelectedId = new Set();

class listCustomers extends React.Component {

  constructor() {
    super();
    //set original data
    this.state = {
       data: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:8080/rest/listCustomers/',
      {
           credentials: 'include',
           method: 'GET',
           mode: 'cors',

      })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({
          data: json
        });
      });
  }

  afterSaveCell(row, cellName, cellValue) {
    fetch('http://localhost:8080/rest/updatecustomer', {
        credentials: 'include',
        method: 'PUT',
        mode: 'cors',
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(row)
      })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        window.location.href = '/listCustomers';
      });
  };

  handleRowSelect(row, isSelected, e) {
    if(isSelected) {
      listOfSelectedId.add(row.customerid);
    }else {
      listOfSelectedId.delete(row.customerid);
    }
  }

  //remove row action
  onAfterDeleteRow(rowKeys) {
    var listOfSelectedId = new Array();
    listOfSelectedId = rowKeys.toString().split(",");

    for (var v of listOfSelectedId) {
      console.log(v);
      fetch('http://localhost:8080/rest/deletecustomer/'+v,
        {
             credentials: 'include',
             method: 'DELETE',
             mode: 'cors',

        })
        .then(response => response.json())
        .then(json => {
          console.log(json);
          this.setState({
            data: json
          });
        });

    }
  }

  // it's a column formatter for exporting
  csvFormatter(cell, row) {
    return `${row.id}: ${cell} USD`;
  }

  render() {
    const selectRowProp = {
      mode: 'checkbox',
      bgColor: 'yellow',
      onSelect: this.handleRowSelect
    };
    const cellEditProp = {
      mode: 'click',
      blurToSave: true,
      afterSaveCell: this.afterSaveCell,
    };
    const options = {
      afterDeleteRow: this.onAfterDeleteRow  // A hook for after droping rows.
    };
    return (
      <div>
        <BootstrapTable data={ this.state.data } cellEdit={ cellEditProp } selectRow={ selectRowProp }
                        deleteRow={ true }
                        options={ options }
                        exportCSV={ true }>
            <TableHeaderColumn dataField={"customerid"} isKey={true} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField={"email"}>email</TableHeaderColumn>
            <TableHeaderColumn dataField={"gender"}>gender</TableHeaderColumn>
            <TableHeaderColumn dataField={"location"}>location</TableHeaderColumn>
            <TableHeaderColumn dataField={"status"}>status</TableHeaderColumn>
            <TableHeaderColumn dataField={"type"} >type</TableHeaderColumn>
            <TableHeaderColumn dataField={"description"} >description</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
export default listCustomers;
