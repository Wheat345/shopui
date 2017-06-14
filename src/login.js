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

    var details = {
      username: self.refs.username.value,
      password: self.refs.password.value,
    };

    var formBody = [];
    for (var property in details) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch('http://localhost:8080/login', {
        credentials: 'include',
        method: 'POST',
        //mode: 'no-cors',
        mode: 'cors',
        headers:{
        //'Access-Control-Allow-Origin':'*',
        'Accept': 'application/json',
        //'Content-Type': 'application/json'
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        //credentials: 'include',
        //credentials: 'same-origin',
        body: formBody
        //body: JSON.stringify({
        //  username: self.refs.username.value,
        //  password: self.refs.password.value,
        //}),

      })
      .then(response=> {

        if (response.ok) {
          console.log("ok");
            console.log("response status : " +response.status );
          //
          //
          // var contentType = response.headers.get("content-type");
          //   console.log("response headers content-type: " +contentType );
          // if(contentType && contentType.indexOf("application/json") !== -1) {
          //   return response.json().then(function(json) {
          //     // process your JSON further
          //     console.log("response json : " +json );
          //
          //     //var headers = response.getAllResponseHeaders().toLowerCase();
          //     //document.cookies = 'JSESSIONID=523E9D99A5B6B208CA8623EE1BF352D4; Path=/';
          //     console.log(response.headers.get('set-cookies'));
          //   });
          // } else {
          //   console.log("Oops, we haven't got JSON!");
          // }
          //return response.json()
          window.location.href = '/menu';
        } else {
          console.log("It is not ok");

          this.setState({
            error : 'Wrong username or password.'
          });

        }
      })
      // .then(function(body) {
      //   window.location.href = '/menu';
      // });
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
            <input type="password" className="form-control" placeholder="Password" ref="password"/><br />
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default Login;
