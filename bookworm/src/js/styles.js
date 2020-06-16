import { fade, makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },

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
  SearchRoot: {
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
  SearchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SearchInputRoot: {
    color: 'inherit',
  },
  SearchInputInput: {
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

  Footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },

  ResultCard: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  Media: {
    height: 'min-content',
    width: 'min-content !important',
    display: 'inline-block',
    paddingLeft: '20px'
  },
  CardHeader: {
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  CardTitle: {
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  CardSubheader: {
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  CardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  CardActions: {
    justifyContent: 'end',
  },
  BookContainer: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(8),
  },
  MediaRoot: {
    display: 'flex',
    flexDirection: 'row',
  },
  MediaDescription: {
    flex: 'auto',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  SummaryBox: {
    flex: 'auto',
  },
  MediaSummary: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    '-webkit-line-clamp': 8,
    '-webkit-box-orient': 'vertical',
  },
  DetailsButton: {
    marginTop: 'auto',
  },
  Link: {
    color: theme.palette.text.primary,
  },
  PaperRoot: {
    display: 'flex',
  },
  Paper: {
    padding: theme.spacing(2),
    margin: 'auto',
  },
  ImageRoot: {
    margin: 'auto',
  },
  Image: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  MoreButton: {
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
  DetailsBackButton: {
    marginBottom: '20px !important',
  },
  SearchLoading: {
    color: 'white !important',
    position: 'absolute',
    top: '50%',
    right: '10%',
    marginTop: -16,
    marginLeft: -18,
  },
  TranslateButton: {
    marginRight: '16px !important',
  },
  BookshelvesRoot: {
    position: 'relative',
  },
  BookshelvesLoading: {
    color: 'white !important',
    position: 'absolute',
    top: '50%',
    right: '10%',
    marginTop: -16,
    marginLeft: -18,
  },
  SaveBookBox: {
    marginLeft: 'auto',
  }
}));

export default useStyles;
