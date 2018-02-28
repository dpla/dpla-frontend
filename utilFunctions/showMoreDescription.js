const showMoreDescription = ({
  className,
  descriptionId = "dpla-description",
  showMoreId = "dpla-showmore"
}) => {
  const description = document.getElementById(descriptionId);
  const showmore = document.getElementById(showMoreId);
  description.classList.add(className);
  showmore.remove();
};

export default showMoreDescription;
