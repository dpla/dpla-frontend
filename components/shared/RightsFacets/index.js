import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import React from "react"

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const RightsFacets = () => {
  const [state, setState] = React.useState({
    publicDomainMark: false,
    cc0: false,
    ccby: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { publicDomainMark, cc0, ccby } = state;
  const error = [publicDomainMark, cc0, ccby].filter((v) => v).length !== 2;
  const classes = useStyles();

  return (
      <li>
        <label>Public Domain Mark: </label>
        <input type="checkbox" name="publicDomainMark" checked={publicDomainMark} onChange={handleChange}/>
      </li>
  )
}

export default RightsFacets