import React from 'react';
import { render } from 'react-dom';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };
    this.onSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    fetch('http://localhost:8080/login', {
        method: 'POST',
        mode: 'no-cors',
        headers:{
        'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        },


        body: JSON.stringify({
          username: self.refs.username.value,
          password: self.refs.password.value,
        }),

      })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        window.location.href = '/menu';
      });
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" placeholder="Username" ref="username"/><br />
        <input type="text" placeholder="Password" ref="password"/><br />
        <input type="submit" />
      </form>
    );
  }
}

export default Login;
