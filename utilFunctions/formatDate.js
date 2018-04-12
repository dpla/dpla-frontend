const formatDate = dateString => {
  const options = { month: "long", day: "numeric", year: "numeric" };
  const theDate = dateString ? new Date(dateString) : new Date();
  return new Intl.DateTimeFormat("en-US", options).format(theDate);
};

export default formatDate;
