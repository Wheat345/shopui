import React from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux'
import {IntlProvider, addLocaleData, FormattedMessage, intlShape, injectIntl, defineMessages } from 'react-intl';
import { connect } from 'react-redux';
import { selectedLocale } from './actions/index';

class AddTransaction extends React.Component {
  constructor(props) {
    super(props);
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
    const { intl, selectedLocale } = this.props;
    return (
      <div>
        <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'transaction.customerid' })} ref="customerid"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'transaction.productids' })} ref="productids"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'transaction.created' })} ref="created"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'transaction.paymentmethod' })} ref="paymentmethod"/><br />
            <input type="text" className="form-control" placeholder={intl.formatMessage({ id: 'transaction.details' })} ref="details"/><br />
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
AddTransaction.propTypes = {
  intl: intlShape.isRequired
};
export default injectIntl(connect(null, mapDispatchToProps)(AddTransaction));
