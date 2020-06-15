import useStyles from '../styles';

import React from 'react';
import axios from 'axios';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import CircularProgress from '@material-ui/core/CircularProgress';
import {useTranslation} from "react-i18next";


function search(query, startIndex=0){
  return axios.get('https://www.googleapis.com/books/v1/volumes?maxResults=12&startIndex=' + startIndex + '&q=' + query);
}

function SearchInput(props){
  const [query, setQuery] = React.useState("");
  const [lastQuery, setLastQuery] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  if(query === "" && props.query){
    setQuery(props.query);
  }

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(typeof query === 'string'){
        if(query.length > 0){
          if(query !== lastQuery){
            setLastQuery(query);
            setLoading(true);
            search(query).then((r) => {
              if(r.status === 200){
                props.setSearchResults(r);
                setLoading(false);
              }
            });
          }
        } else {
          props.setSearchResults({});
        }
      }
    }, 200);
    return () => {
      clearTimeout(timeOutId);
    };
  }, [query, props, lastQuery, setLoading]);
  const classes = useStyles(props);
  const [t,] = useTranslation();

  return (
    <div className={classes.searchRoot}>
      <div className={classes.searchIcon}>
        <SearchIcon/>
      </div>
      <InputBase
        placeholder={t("search-placeholder")}
        classes={{
          root: classes.searchInputRoot,
          input: classes.searchInputInput,
        }}
        id="search-input"
        inputProps={{'aria-label': 'search'}}
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
      {loading && <CircularProgress size={30} className={classes.SearchLoading}/>}
    </div>
  )
}

export default SearchInput;
export {SearchInput, search}
