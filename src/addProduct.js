import React from 'react';
import { render } from 'react-dom';

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };
    this.onSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    fetch('http://localhost:8080/product', {
        method: 'POST',
        mode: 'cors',
        headers:{
        'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },


        body: JSON.stringify({
          productName: self.refs.name.value,
          productType: self.refs.type.value,
          productSize: self.refs.size.value,
          productCost: self.refs.cost.value,
          productSellPrice: self.refs.sellPrice.value,
          productDescription: self.refs.description.value,
        }),

      })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        window.location.href = '/listProducts';
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="Name" ref="name"/><br />
        <input type="text" placeholder="Type" ref="type"/><br />
        <input type="text" placeholder="Size" ref="size"/><br />
        <input type="text" placeholder="Cost" ref="cost"/><br />
        <input type="text" placeholder="Sell Price" ref="sellPrice"/><br />
        <input type="text" placeholder="Description" ref="description"/><br />
        <input type="text" placeholder="Type" ref="type"/><br />
        <input type="text" placeholder="Note" ref="note"/><br />
        <input type="submit" />
      </form>
    );
  }
}

export default AddProduct;
