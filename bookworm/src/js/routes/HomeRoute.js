import SearchInput from '../components/Search';
import SearchResults from '../components/SearchResults';

import React from 'react';
import { useParams } from 'react-router-dom';
import useStyles from '../styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';


function HomeRoute(props){
  const [searchResults, setSearchResults] = React.useState({});
  let { query } = useParams();
  const classes = useStyles(props);

  return (
    <HomeComponent
      query={query}
      searchResults={searchResults}
      setSearchResults={setSearchResults}
      classes={classes}
    />
  )
}

class HomeComponent extends React.Component {
  render() {
    let props = this.props;
    let classes = props.classes;
    return (
      <div>
        <div className={classes.landing}>
          <Container maxWidth="sm">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Your cozy companion for searching and wishlisting books.
            </Typography>
          </Container>
          <Container maxWidth="md" align="center">
            <SearchInput
              classes={classes}
              query={props.query}
              setSearchResults={props.setSearchResults}
            />
          </Container>
        </div>
        <Container className={classes.cardGrid} maxWidth="xl">
          <SearchResults
            classes={classes}
            searchResults={props.searchResults}
          />
        </Container>
      </div>
    );
  }
}

export default HomeRoute;
