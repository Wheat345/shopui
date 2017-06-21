import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import {IntlProvider, addLocaleData, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { selectedLocale } from './actions/index';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { user: {},
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
            }
            else {
              window.location.href = '/menu';
            }
          });
        } else {
          console.log("It is not ok");

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
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'email' })} ref="email"/><br />
            <input type="password" className="form-control" placeholder={intl.formatMessage({ id: 'password' })} ref="password"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'register.enabled' })} ref="enabled"/><br />
            <button type="submit" className="btn btn-default">{intl.formatMessage({ id: 'submit' })}</button>
          </div>
        </form>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ selectedLocale }, dispatch);
}
Register.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(connect(null, mapDispatchToProps)(Register));
