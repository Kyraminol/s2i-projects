import { fade, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },

  navbar: {
    flexWrap: 'wrap',
  },
  navbarTitle: {
    flexGrow: 1,
  },

  landing: {
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  searchRoot: {
    marginTop: theme.spacing(4),
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'min-content',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchInputRoot: {
    color: 'inherit',
  },
  searchInputInput: {
    padding: theme.spacing(1, 1, 1, 0) + ' !important',
    paddingLeft: `calc(1em + ${theme.spacing(4)}px) !important`,
    transition: theme.transitions.create('width'),
    width: '100% !important',
    [theme.breakpoints.up('sm')]: {
      width: '40ch !important',
      '&:focus': {
        width: '100ch !important',
        height: '1.5rem !important',
      },
    },
  },

  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  media: {
    height: 'min-content',
    width: 'min-content !important',
    display: 'inline-block',
    paddingLeft: '20px'
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  cardactions: {
    justifyContent: 'end',
  },
  bookcontainer: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  mediaroot: {
    display: 'flex',
    flexDirection: 'row',
  },
  mediadescription: {
    flex: 'auto',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
  },
  link: {
    color: theme.palette.text.primary,
  },
  roodt: {
    display: 'flex',
  },
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  image: {

  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  morebutton: {
    marginTop: theme.spacing(4),
    position: 'relative',
  },
  MoreButtonLoading: {
    color: 'white !important',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -16,
    marginLeft: -18,
  },

}));

export default useStyles;
