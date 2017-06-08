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

    fetch('http://localhost:8080/rest/createcustomer', {
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
          firstname: self.refs.firstname.value,
          lastname: self.refs.lastname.value,
          email: self.refs.email.value,
          gender: self.refs.gender.value,
          location: self.refs.location.value,
          status: self.refs.status.value,
          type: self.refs.type.value,
          description: self.refs.description.value,
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
        <input type="text" placeholder="firstname" ref="firstname"/><br />
          <input type="text" placeholder="lastname" ref="lastname"/><br />
        <input type="text" placeholder="email" ref="email"/><br />
          <input type="text" placeholder="gender" ref="gender"/><br />
            <input type="text" placeholder="location" ref="location"/><br />
              <input type="text" placeholder="status" ref="status"/><br />
                <input type="text" placeholder="type" ref="type"/><br />
                  <input type="text" placeholder="description" ref="description"/><br />
        <input type="submit" />
      </form>
    );
  }
}

export default CreateCustomer;
