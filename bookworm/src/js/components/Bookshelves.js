import GoogleContext from './Google';

import React from 'react';
import axios from 'axios';


function Bookshelves() {
  return (
    <BookshelvesComponent/>
  )
}

class BookshelvesComponent extends React.Component {
  static contextType = GoogleContext;

  render() {
    let user = this.context;
    console.log(user);
    if(Object.keys(user).length > 0) {
      axios.get(
        'https://www.googleapis.com/books/v1/mylibrary/bookshelves',
        {
          headers: {
            'Authorization': 'Bearer ' + user.accessToken
          }
        }
      ).then((r) => {
        if (r.status === 200) {
        }
        console.log(r);
      });
    }

    return (
      <div>

      </div>
    )
  }

}

export default Bookshelves;
