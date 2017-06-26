import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import {IntlProvider, addLocaleData, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { selectedLocale } from './actions/index';

class Login extends React.Component {
  constructor(props) {
    super(props);
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
      })
      .then(response=> {

        if (response.ok) {
          console.log("ok");
            console.log("response status : " +response.status );
          window.location.href = '/listCustomers';
        } else {
          console.log("It is not ok");

          this.setState({
            error : 'Wrong username or password.'
          });

        }
      })
  }

  render() {
    const { intl, selectedLocale } = this.props;
    return (
      <div>
        <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
          <div className="form-group">
            <label >{this.state.error}</label><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'username' })} ref="username"/><br />
            <input type="password" className="form-control" placeholder={intl.formatMessage({ id: 'password' })} ref="password"/><br />
            <button type="submit" className="btn btn-default">{intl.formatMessage({ id: 'login.login' })}</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectedLocale }, dispatch);
}
Login.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(connect(null, mapDispatchToProps)(Login));
