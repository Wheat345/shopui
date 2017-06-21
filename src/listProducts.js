import React from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import { bindActionCreators } from 'redux'
import {IntlProvider, addLocaleData, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { selectedLocale } from './actions/index';
// Set of selected ids to be removing.
var listOfSelectedId = new Set();

class listProducts extends React.Component {

  constructor(props) {
    super(props);
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
    const { intl, selectedLocale } = this.props;
    return (
      <div>
        <BootstrapTable data={ this.state.data } cellEdit={ cellEditProp } selectRow={ selectRowProp }
                        deleteRow={ true }
                        options={ options }
                        exportCSV={ true }>
            <TableHeaderColumn dataField={"productid"} isKey={true} >ID</TableHeaderColumn>
            <TableHeaderColumn dataField={"name"}>{intl.formatMessage({ id: 'prodcut.name' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"catalog"}>{intl.formatMessage({ id: 'prodcut.catalog' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"format"}>{intl.formatMessage({ id: 'prodcut.format' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"cost"}>{intl.formatMessage({ id: 'prodcut.cost' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"sellprice"} >{intl.formatMessage({ id: 'prodcut.sellprice' })}</TableHeaderColumn>
            <TableHeaderColumn dataField={"description"} >{intl.formatMessage({ id: 'prodcut.description' })}</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectedLocale }, dispatch);
}
listProducts.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(connect(null, mapDispatchToProps)(listProducts));
