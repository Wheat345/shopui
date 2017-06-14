import React from 'react';
import { render } from 'react-dom';

class AddProduct extends React.Component {
  constructor() {
    super();
    this.state = { user: {} };
    this.onSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var self = this;

    fetch('http://localhost:8080/rest/createproduct', {
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
          name: self.refs.name.value,
          catalog: self.refs.catalog.value,
          format: self.refs.format.value,
          cost: self.refs.cost.value,
          sellprice: self.refs.sellprice.value,
          description: self.refs.description.value,
        }),

      })
      .then(function(response) {
        return response.json()
      }).then(function(body) {
        window.location.href = '/listProducts';
      });
  }

  render() {
    return (
      <div>
        <form className="navbar-form navbar-left" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input type="text" className="form-control" placeholder="name" ref="name"/><br />
            <input type="text" className="form-control" placeholder="catalog" ref="catalog"/><br />
            <input type="text" className="form-control" placeholder="format" ref="format"/><br />
            <input type="text" className="form-control" placeholder="cost" ref="cost"/><br />
            <input type="text" className="form-control" placeholder="sellprice" ref="sellprice"/><br />
            <input type="text" className="form-control" placeholder="description" ref="description"/><br />
            <input type="submit" className="btn btn-default"/>
          </div>
        </form>
      </div>
    );
  }
}

export default AddProduct;
