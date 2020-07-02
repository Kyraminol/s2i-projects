import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  Navbar: {
    flexWrap: 'wrap',
  },
  NavbarTitle: {
    flexGrow: 1,
  },
  Landing: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  Footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export default useStyles;
