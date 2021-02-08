import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const RightsFacets = () => {
  const [state, setState] = React.useState({
    publicDomainMark: true,
    cc0: false,
    ccby: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { publicDomainMark, cc0, ccby } = state;
  const error = [publicDomainMark, cc0, ccby].filter((v) => v).length !== 2;

  return (
    <>
      <Tooltip title="This facet is used to filter by copyright status." aria-label="add">
        <Typography>How do I use it?</Typography>
      </Tooltip>
      {/* {item.active &&
        <img
          src={subtractIcon}
          alt=""
          className={css.subtractIcon}
        />}
      {!item.active &&
        <img src={addIcon} alt="" className={css.addIcon} />} */}
        <FormControl component="fieldset">
        <FormLabel component="legend">Unlimited Re-Use</FormLabel>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox checked={publicDomainMark} onChange={handleChange} name="publicDomainMark" />}
            label="Public Domain Mark"
          />
          <FormControlLabel
            control={<Checkbox checked={cc0} onChange={handleChange} name="cc0" />}
            label="CC0"
          />
          <FormControlLabel
            control={<Checkbox checked={ccby} onChange={handleChange} name="ccby" />}
            label="CC0 BY"
          />
        </FormGroup>
      </FormControl>
    </>
  )
}

export default RightsFacets