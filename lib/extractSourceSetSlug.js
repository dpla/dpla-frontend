const extractSourceSetSlug = url =>
  /\/primary-source-sets\/sets\/([-\w]*)/.exec(url)[1];

export default extractSourceSetSlug;
