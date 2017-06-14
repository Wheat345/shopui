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

    fetch('http://localhost:8080/rest/createtransaction', {
        credentials: 'include',
        method: 'POST',
        mode: 'cors',
        headers:{
        //'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded'
        'Content-Type': 'application/json'
        },


        body: JSON.stringify({
          customerid: self.refs.customerid.value,
          productids: self.refs.productids.value,
          created: self.refs.created.value,
          paymentmethod: self.refs.paymentmethod.value,
          details: self.refs.details.value,
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
      <div>
        <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="customerid" ref="customerid"/><br />
            <input type="text" className="form-control" placeholder="productids" ref="productids"/><br />
            <input type="text" className="form-control" placeholder="created" ref="created"/><br />
            <input type="text" className="form-control" placeholder="paymentmethod" ref="paymentmethod"/><br />
            <input type="text" className="form-control" placeholder="details" ref="details"/><br />
            <input type="submit" className="btn btn-default"/>
          </div>
        </form>
      </div>
    );
  }
}

export default AddTransaction;
