import React from 'react';
import { render } from 'react-dom';

class AddTransaction extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };
    this.onSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    fetch('http://localhost:8080/transaction', {
        method: 'POST',
        mode: 'cors',
        headers:{
        'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },


        body: JSON.stringify({
          customerId: self.refs.customerId.value,
          productIds: [self.refs.productIds.value],
          quantity: self.refs.quantity.value,
          paymentMethod: self.refs.paymentMethod.value,
          paymentStatus: [self.refs.paymentStatus.value],
          shippingStatus: [self.refs.shippingStatus.value],
          note: self.refs.note.value,
        }),

      })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        window.location.href = '/listTransactions';
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="customer Id" ref="customerId"/><br />
        <input type="text" placeholder="product Ids" ref="productIds"/><br />
        <input type="text" placeholder="Quantity" ref="quantity"/><br />
        <input type="text" placeholder="Payment Method" ref="paymentMethod"/><br />
        <input type="text" placeholder="Payment Status" ref="paymentStatus"/><br />
        <input type="text" placeholder="Shipping Status" ref="shippingStatus"/><br />
        <input type="text" placeholder="Note" ref="note"/><br />
        <input type="submit" />
      </form>
    );
  }
}

export default AddTransaction;
