import React from 'react';
import { render } from 'react-dom';

class Example extends React.Component {
  constructor() {
    super();
    this.state = {
       data: "bar"
    }
    //this.onSubmit = this.handleSubmit.bind(this);

  }


  componentWillMount() {

        var component = this;
        fetch('http://localhost:8080/customer/38').then(function(response) {
          // Convert to JSON
          return response.json();
        }).then(function(json) {

          component.setState({
             data: json
          })


          // Yay, `j` is a JavaScript object
          //console.log(json);
          console.log("after set state of data: ");
          console.log(component.state.data);
        });


      };

      // componentDidMount(){
      //     var component = this;
      //     console.log('the init value of data: ');
      //     console.log(component.state.data);
      //
      // }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   var self = this;
  //   fetch('http://localhost:8080/customer/73').then(function(response) {
  //   	// Convert to JSON
  //   	return response.json();
  //   }).then(function(j) {
  //   	// Yay, `j` is a JavaScript object
  //   	console.log(j);
  //   });
  // }
  render() {
    return (
      //<form onSubmit={this.onSubmit}>
        //<input type="text" placeholder={this.state.data.customerId} ref="firstName"/>
        //<input type="text" placeholder="Last Name" ref="lastName"/>
        //<input type="submit" />
      //</form>
      <table class="table">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Type</th>
          <th>Status</th>
          <th>Gender</th>
          <th>Address</th>
        </tr>
        <tr>
          <td>{this.state.data.customerId}</td>
          <td>{this.state.data.customerNickName}</td>
          <td>{this.state.data.customerType}</td>
          <td>{this.state.data.customerStatus}</td>
          <td>{this.state.data.customerGender}</td>
          <td>{this.state.data.customerAddress}</td>
        </tr>
      </table>
    );
  }
}

export default Example;
