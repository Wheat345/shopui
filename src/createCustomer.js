import React from 'react';
import { render } from 'react-dom';

class CreateCustomer extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };
    this.onSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    fetch('http://localhost:8080/rest/create', {
        method: 'POST',
        mode: 'cors',
        headers:{
        'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },


        body: JSON.stringify({
          customerFirstName: self.refs.name.value,
          customerLastName: self.refs.email.value,
        }),

      })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        window.location.href = '/listCustomers';
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="Name" ref="name"/><br />
        <input type="text" placeholder="Email" ref="email"/><br />
        <input type="submit" />
      </form>
    );
  }
}

export default CreateCustomer;
