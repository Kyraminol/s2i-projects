import SearchInput from '../components/Search';
import SearchResultsComponent from '../components/SearchResults';

import React from 'react';
import { useParams } from 'react-router-dom';
import useStyles from '../styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {useTranslation} from "react-i18next";


function HomeRoute(props){
  const [searchResults, setSearchResults] = React.useState({});
  let { query } = useParams();
  const classes = useStyles(props);
  const [t,] = useTranslation();

  return (
    <HomeComponent
      query={query}
      searchResults={searchResults}
      setSearchResults={setSearchResults}
      classes={classes}
      t={t}
    />
  )
}

class HomeComponent extends React.Component {
  render() {
    let props = this.props;
    let classes = props.classes;
    return (
      <div>
        <div className={classes.Landing}>
          <Container maxWidth="md">
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              {props.t("landing")}
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
        <Container className={classes.CardGrid} maxWidth="xl">
          <SearchResultsComponent
            classes={classes}
            searchResults={props.searchResults}
          />
        </Container>
      </div>
    );
  }
}

export default HomeRoute;
