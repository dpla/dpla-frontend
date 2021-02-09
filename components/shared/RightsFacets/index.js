const RightsFacets = () => {
  const [state, setState] = React.useState({
    publicDomainMark: false,
    cc0: false,
    ccBy: false,
    ccBySa: false,
    noCopyrightUs: false,
    noKnownCopyright: false
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const { publicDomainMark, cc0, ccBy, ccBySa, noCopyrightUs, noKnownCopyright } = state;
  const error = [publicDomainMark, cc0, ccBy, ccBySa, noCopyrightUs, noKnownCopyright].filter((v) => v).length !== 2;
  const classes = useStyles();

  return (
    <>
      <li>Unlimited Re-Use</li>
      <li>Re-use With Conditions</li>
      <li>Re-use, No Modification</li>
      <li>Permission or Fair Use</li>
      <li>Unspecified Rights Status</li>
    </>
  )
}

export default RightsFacets