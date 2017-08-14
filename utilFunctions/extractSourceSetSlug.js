const extractSourceSetSlug = url =>
  /https:\/\/dp\.la\/primary-source-sets\/sets\/([-\w]*)/.exec(url)[1];

export default extractSourceSetSlug;
