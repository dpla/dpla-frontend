const wordpressLinks = links => {
  for (var i = 0; i < links.length; i++) {
    var link = links.item(i);
    if (
      !link.classList.contains("btn") &&
      link.href !== "" &&
      link.hostname !== "dp.la" &&
      link.hostname !== "pro.dp.la" &&
      link.hostname !== "pro-staging.dp.la" &&
      link.hostname !== "ci-test.dp.la" &&
      link.hostname !== "staging.dp.la" &&
      link.hostname !== "localhost"
    )
      link.classList.add("external");
  }
};

export default wordpressLinks;