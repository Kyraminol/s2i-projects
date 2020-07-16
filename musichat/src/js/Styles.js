import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles((theme) => ({
  Navbar: {
    flexWrap: 'wrap',
  },
  NavbarTitle: {
    flexGrow: 1,
  },
  Landing: {
    flex: '0',
    backgroundColor: theme.palette.background.paper,
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    marginTop: theme.spacing(1),
  },
  LandingMain: {
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(4),
    display: 'flex !important',
    flexDirection: 'column',
  },
  Footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(2, 0, 0) + ' !important',
  },
  RoomMain: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'end',
  },
  RoomInputRoot: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    marginTop: '1px',
  },
  RoomInputInput: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  RoomInputIcon: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  MessageBubbleRoot: {
    margin: theme.spacing(0.5),
    flex: '0 0 auto',
    display: 'flex !important',
    flexDirection: 'row',
    '&:nth-of-type(1)': {
      marginTop: 'auto',
    }
  },
  Message: {
    wordBreak: 'break-all',
  },
  MessageBubble: {
    width: '90vw',
  },
  MessageBubbleContainer: {
    padding: theme.spacing(2, 2, 0, 2),
  },
  MessageBubbleTimestamp: {
    paddingRight: '5px',
    color: theme.palette.text.hint,
  },
  MessagesContainer: {
    display: 'flex !important',
    flexDirection: 'column',
    overflowY: 'auto',
    maxHeight: '90%',
    height: '90%',
    minHeight: '90%',
    flexBasis: 0,
  }
}));

export default useStyles;
