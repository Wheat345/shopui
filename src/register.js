import React from 'react';
import { render } from 'react-dom';

class Register extends React.Component {
  constructor() {
    super();
    this.state = { user: {},
                   //error: 'hahaha'
                  };
    this.onSubmit = this.handleSubmit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    var details = {
      userName: self.refs.username.value,
      email: self.refs.email.value,
      password: self.refs.password.value,
      enabled: self.refs.enabled.value,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:8080/register', {
        credentials: 'include',
        method: 'POST',
        //mode: 'no-cors',
        mode: 'cors',
        headers:{
        //'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        //'Content-Type': 'application/x-www-form-urlencoded'
        },
        //credentials: 'include',
        //credentials: 'same-origin',
        body: JSON.stringify(details)
        //body: JSON.stringify({
        //  username: self.refs.username.value,
        //  password: self.refs.password.value,
        //}),

      })
      .then(response => {

        if (response.ok) {
          response.json().then(data => {
            console.log(data);
            if(data == 'User already exist, please register by different email address.'){
              this.setState({
                error : 'User already exist, please register by different email address.'
              });
              console.log("user exist");
              //window.location.href = '/register';
            }
            else {
              window.location.href = '/menu';
            }

          });
        } else {
          console.log("It is not ok");

        }
        })
        // .then(function(body) {
        //   window.location.href = '/menu';
        // });
      // }).then(response => response.json())
      //     .then(response => console.log("asfasfasdffdsf.................." +response));
      // .then(function (data) {
      //   console.log('Request succeeded with JSON response', data);
      // })
      // .catch(function (error) {
      //   console.log('Request failed', error);
      // })
      // .then(function(response) {
      //   console.log("response status : " +response.status );
      //   if (response.ok) {
      //     console.log("ok");
      //     return response.json()
      //   } else {
      //     console.log("It is not ok");
      //
      //   }
      // }).then(function(body) {
      //   window.location.href = '/menu';
      // });
  }

  render() {
    return (
      <div>
        <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label >{this.state.error}</label><br />
            <input type="text" className="form-control" placeholder="Username" ref="username"/><br />
            <input type="text" className="form-control" placeholder="Email" ref="email"/><br />
            <input type="password" className="form-control" placeholder="Password" ref="password"/><br />
            <input type="text" className="form-control" placeholder="Enabled" ref="enabled"/><br />
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Register;
