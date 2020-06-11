import BookDetails from '../components/BookDetails';

import React from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


function BookDetailsRoute() {
  const [book, setBook] = React.useState({});
  let { id } = useParams();

  if(Object.keys(book).length === 0){
    axios.get('https://www.googleapis.com/books/v1/volumes/' + id).then((r) => {
      if(r.status === 200){
        setBook(r);
      }
    });
  }

  return (
    <BookDetails book={book}/>
  );
}

export default BookDetailsRoute;
