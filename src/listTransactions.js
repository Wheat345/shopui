import React from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { bindActionCreators } from 'redux'
import {IntlProvider, addLocaleData, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { selectedLocale } from './actions/index';

// Set of selected ids to be removing.
var listOfSelectedId = new Set();

class listTransactions extends React.Component {

  constructor(props) {
    super(props);
    //set original data
    this.state = {
       data: [],
    }
  }
  componentDidMount() {
    fetch('http://localhost:8080/rest/listtransactions/',
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
    fetch('http://localhost:8080/rest/updatetransaction', {
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
        window.location.href = '/listTransactions';
      });
  };

  handleRowSelect(row, isSelected, e) {
    if(isSelected) {
      listOfSelectedId.add(row.transactionid);
    }else {
      listOfSelectedId.delete(row.transactionid);
    }
  }

  //remove row action
  onAfterDeleteRow(rowKeys) {
    var listOfSelectedId = new Array();
    listOfSelectedId = rowKeys.toString().split(",");

    for (var v of listOfSelectedId) {
      console.log(v);
      fetch('http://localhost:8080/rest/deletetransaction/'+v,
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
            <TableHeaderColumn dataField={"transactionid"} isKey={true} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField={"customerid"}>{intl.formatMessage({ id: 'transaction.customerid' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"productids"}>{intl.formatMessage({ id: 'transaction.productids' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"created"}>{intl.formatMessage({ id: 'transaction.created' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"paymentmethod"}>{intl.formatMessage({ id: 'transaction.paymentmethod' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"details"} >{intl.formatMessage({ id: 'transaction.details' })}</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectedLocale }, dispatch);
}
listTransactions.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(connect(null, mapDispatchToProps)(listTransactions));
