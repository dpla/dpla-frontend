function wordpressLinks(links) {
  for (let i = 0; i < links.length; i++) {
    const link = links.item(i);
    if (
      !link.classList.contains("btn") &&
      link.href !== "" &&
      !link.hostname.endsWith("dp.la") &&
      link.hostname !== "dpla.wpengine.com" &&
      link.hostname !== "localhost" &&
      link.innerText.trim() !== ""
    ) {
      link.classList.add("external");
    }
  }
}

export default wordpressLinks;
