// Styles for every component

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  // General styles
  Root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  Navbar: {
    flexWrap: 'wrap',
  },
  NavbarTitle: {
    flexGrow: 1,
  },
  Main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  Footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default useStyles;
