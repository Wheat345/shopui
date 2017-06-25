import React from 'react';
import { render } from 'react-dom';

class Logout extends React.Component {
  constructor() {
    super();


        //set original data
        this.state = {
           data: [],
        }
  }
      componentDidMount() {
        // axios.get('http://localhost:8080/rest/listCustomers/')
        //   .then(res => {
        //     const posts = res.data.map(obj => obj.data);
        //     this.setState({ data: res.data });
        //   });
        //const base64 = require('base-64');
        //var headers = new Headers();
        //headers.append("Authorization", "Basic " + base64.encode("naveen:naveen"));
        fetch('http://localhost:8080/logout/',

          {
               credentials: 'include',
               method: 'GET',
               //headers: myHeaders,
               mode: 'cors',
               //cache: 'default'
               //headers: headers,
               xhrFields: { withCredentials: true },


          })
          .then(response => response.json())
          .then(json => {
            console.log(json);
            this.setState({
              data: json
              //animation: animation(json)
            });
          });
          window.localStorage.clear();//reset default language.
      }

  render() {
    return <h1></h1>;
  }

}

export default Logout;
