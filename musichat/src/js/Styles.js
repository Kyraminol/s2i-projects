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
    justifyContent: 'flex-end',
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
    flexGrow: 1,
    display: 'flex !important',
    flexDirection: 'column',
    overflowY: 'auto',
    minHeight: 0,
    flexBasis: 0,
  },
  UsersListUser: {
    padding: theme.spacing(1, 20, 1, 4) + ' !important',
  },
  UsersListTitle: {
    padding: theme.spacing(1, 20, 1, 2) + ' !important',
  },
  IconButtonRoot: {
    borderRadius: '0 !important',
  },
  IconButtonLabel: {
    display: 'flex',
    flexDirection: 'column',
    fontSize: '0.9rem',
  },
}));

export default useStyles;
