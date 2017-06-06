import React from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';


class listProducts extends React.Component {
  constructor() {
    super();


    //set original data
    this.state = {
       data: [],
    }
  }
      componentDidMount() {
        axios.get('http://localhost:8080/product/')
          .then(res => {
            const posts = res.data.map(obj => obj.data);
            this.setState({ data: res.data });
          });
      }

  render() {
    return (
      <BootstrapTable data={ this.state.data } >
          <TableHeaderColumn dataField={"productId"} isKey={true} >ID</TableHeaderColumn>
          <TableHeaderColumn dataField={"productName"}>Name</TableHeaderColumn>
          <TableHeaderColumn dataField={"productType"}>Type</TableHeaderColumn>
          <TableHeaderColumn dataField={"productSize"}>Size</TableHeaderColumn>
          <TableHeaderColumn dataField={"productCost"}>Cost</TableHeaderColumn>
          <TableHeaderColumn dataField={"productSellPrice"} >Sell Price</TableHeaderColumn>
          <TableHeaderColumn dataField={"productDescription"} >Description</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default listProducts;
