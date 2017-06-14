import React from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

// Set of selected ids to be removing.
var listOfSelectedId = new Set();

class listProducts extends React.Component {

  constructor() {
    super();
    //set original data
    this.state = {
       data: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:8080/rest/listProducts/',
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
    fetch('http://localhost:8080/rest/updateproduct', {
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
        window.location.href = '/listProducts';
      });
  };

  handleRowSelect(row, isSelected, e) {
    if(isSelected) {
      listOfSelectedId.add(row.productid);
    }else {
      listOfSelectedId.delete(row.productid);
    }
  }

  //remove row action
  onAfterDeleteRow(rowKeys) {
    var listOfSelectedId = new Array();
    listOfSelectedId = rowKeys.toString().split(",");

    for (var v of listOfSelectedId) {
      console.log(v);
      fetch('http://localhost:8080/rest/deleteproduct/'+v,
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
            <TableHeaderColumn dataField={"productid"} isKey={true} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField={"name"}>name</TableHeaderColumn>
            <TableHeaderColumn dataField={"catalog"}>catalog</TableHeaderColumn>
            <TableHeaderColumn dataField={"format"}>format</TableHeaderColumn>
            <TableHeaderColumn dataField={"cost"}>cost</TableHeaderColumn>
            <TableHeaderColumn dataField={"sellprice"} >sell price</TableHeaderColumn>
            <TableHeaderColumn dataField={"description"} >description</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
export default listProducts;
