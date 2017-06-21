import React from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { bindActionCreators } from 'redux'
import {IntlProvider, addLocaleData, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { selectedLocale } from './actions/index';

// Set of selected ids to be removing.
var listOfSelectedId = new Set();

class listCustomers extends React.Component {

  constructor(props) {
    super(props);
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
    const { intl, selectedLocale } = this.props;
    return (
      <div>
        <BootstrapTable data={ this.state.data } cellEdit={ cellEditProp } selectRow={ selectRowProp }
                        deleteRow={ true }
                        options={ options }
                        exportCSV={ true }>
            <TableHeaderColumn dataField={"customerid"} isKey={true} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField={"email"}>{intl.formatMessage({ id: 'customer.email' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"gender"}>{intl.formatMessage({ id: 'customer.gender' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"location"}>{intl.formatMessage({ id: 'customer.location' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"status"}>{intl.formatMessage({ id: 'customer.status' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"type"} >{intl.formatMessage({ id: 'customer.type' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"description"} >{intl.formatMessage({ id: 'customer.description' })}</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectedLocale }, dispatch);
}

listCustomers.propTypes = {
  intl: intlShape.isRequired
};

export default injectIntl(connect(null, mapDispatchToProps)(listCustomers));
