import React from "react";
import axios from "axios";
import {useStyles} from "../styles";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";

const GoogleContext = React.createContext({});

function SearchInput(props){
  const [query, setQuery] = React.useState("");
  const [lastQuery, setLastQuery] = React.useState("");

  if(query === "" && props.query){
    setQuery(props.query);
  }

  React.useEffect(() => {
    const timeOutId = setTimeout(() => {
      if(typeof  query === 'string'){
        if(query.length > 2){
          if(query !== lastQuery){
            setLastQuery(query);
            axios.get('https://www.googleapis.com/books/v1/volumes?maxResults=12&q=' + query).then((r) => {
              if(r.status === 200){
                props.setSearchResults(r);
              }
            });
          }
        } else {
          props.setSearchResults({});
        }
      }
    }, 500);
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
        inputProps={{'aria-label': 'search'}}
        value={query}
        onChange={event => setQuery(event.target.value)}
      />
    </div>
  )
}

export { SearchInput, GoogleContext }
