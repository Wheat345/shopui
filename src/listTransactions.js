import React from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';


class ListTransactions extends React.Component {
  constructor() {
    super();


    //set original data
    this.state = {
       data: [],
    }
  }
      componentDidMount() {
        axios.get('http://localhost:8080/transaction/')
          .then(res => {
            const posts = res.data.map(obj => obj.data);
            this.setState({ data: res.data });
          });
      }

  render() {
    return (
      <BootstrapTable data={ this.state.data } >
          <TableHeaderColumn dataField={"transactionId"} isKey={true} >ID</TableHeaderColumn>
          <TableHeaderColumn dataField={"customerId"}>Customer Id</TableHeaderColumn>
          <TableHeaderColumn dataField={"productIds"}>Product Ids</TableHeaderColumn>
          <TableHeaderColumn dataField={"created"}>Created</TableHeaderColumn>
          <TableHeaderColumn dataField={"paymentMethod"}>Payment Method</TableHeaderColumn>
          <TableHeaderColumn dataField={"paymentStatus"} >Payment Status</TableHeaderColumn>
          <TableHeaderColumn dataField={"shippingStatus"} >Shipping Status</TableHeaderColumn>
          <TableHeaderColumn dataField={"note"} >Note</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default ListTransactions;
