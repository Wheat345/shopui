import React from 'react';
import { render } from 'react-dom';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';


class listCustomers extends React.Component {
  constructor() {
    super();


    //set original data
    this.state = {
       data: [],
    }
  }
      componentDidMount() {
        // axios.get('http://localhost:8080/customer/')
        //   .then(res => {
        //     const posts = res.data.map(obj => obj.data);
        //     this.setState({ data: res.data });
        //   });


        fetch('http://localhost:8080/rest/listCustomers/',

          {
               credentials: 'include',
               method: 'GET',
               //headers: myHeaders,
               mode: 'cors',
               //cache: 'default'
               //credentials: 'include'
               //credentials: 'same-origin',

          })
          .then(response => response.json())
          .then(json => {
            console.log(json);
            this.setState({
              data: json
              //animation: animation(json)
            });
          });
      }

  render() {
    return (
      <BootstrapTable data={ this.state.data } >
          <TableHeaderColumn dataField={"id"} isKey={true} >ID</TableHeaderColumn>
          <TableHeaderColumn dataField={"customerFirstName"}>First Name</TableHeaderColumn>
          <TableHeaderColumn dataField={"customerLastName"}>Last Name</TableHeaderColumn>
          <TableHeaderColumn dataField={"customerNickName"}>other name</TableHeaderColumn>
          <TableHeaderColumn dataField={"customerAddress"}>where he/she is</TableHeaderColumn>
          <TableHeaderColumn dataField={"customerGender"} >Gender</TableHeaderColumn>
          <TableHeaderColumn dataField={"customerStatus"} >Status</TableHeaderColumn>
          <TableHeaderColumn dataField={"customerType"} >type</TableHeaderColumn>
          <TableHeaderColumn dataField={"customerNote"}>some thing special</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default listCustomers;
