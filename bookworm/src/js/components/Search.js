import useStyles from '../styles';

import React from 'react';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';


function search(query, startIndex=0){
  return axios.get('https://www.googleapis.com/books/v1/volumes?maxResults=12&startIndex=' + startIndex + '&q=' + query);
}

function SearchInput(props){
  const [query, setQuery] = React.useState("");
  const [lastQuery, setLastQuery] = React.useState("");

  if(query === "" && props.query){
    setQuery(props.query);
  }

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(typeof query === 'string'){
        if(query.length > 0){
          if(query !== lastQuery){
            setLastQuery(query);
            search(query).then((r) => {
              if(r.status === 200){
                props.setSearchResults(r);
              }
            });
          }
        } else {
          props.setSearchResults({});
        }
      }
    }, 250);
    return () => clearTimeout(timeOutId);
  }, [query, props, lastQuery]);
  const classes = useStyles(props);

  return (
    <div className={classes.searchRoot}>
      <div className={classes.searchIcon}>
        <SearchIcon/>
      </div>
      <InputBase
        placeholder="Search for books you love"
        classes={{
          root: classes.searchInputRoot,
          input: classes.searchInputInput,
        }}
        id="search-input"
        inputProps={{'aria-label': 'search'}}
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
    </div>
  )
}

export default SearchInput;
export {SearchInput, search}
