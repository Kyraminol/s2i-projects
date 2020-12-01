// Route component for /

// Relative imports
import Header from './components/Header';
import Footer from './components/Footer';
// Module imports
import React from 'react';
import Container from '@material-ui/core/Container';
import useStyles from '../Styles';


const Home = (props) => {
  // Create classes names
  let classes = useStyles(props);

  return (
    <>
      <Header/>
      <Container component="main" className={classes.Main} maxWidth="sm">
        <div/>
      </Container>
      <Footer/>
    </>
  )
}

export default Home;
