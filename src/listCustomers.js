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
          <TableHeaderColumn dataField={"customerid"} isKey={true} >customerid</TableHeaderColumn>
          <TableHeaderColumn dataField={"email"}>email</TableHeaderColumn>
          <TableHeaderColumn dataField={"gender"}>gender</TableHeaderColumn>
          <TableHeaderColumn dataField={"location"}>location</TableHeaderColumn>
          <TableHeaderColumn dataField={"status"}>status</TableHeaderColumn>
          <TableHeaderColumn dataField={"type"} >type</TableHeaderColumn>
          <TableHeaderColumn dataField={"description"} >description</TableHeaderColumn>
      </BootstrapTable>
    );
  }
}

export default listCustomers;
