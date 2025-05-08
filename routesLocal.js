const serverFunctions = require("./lib/serverFunctions");
const locals = require("./constants/local");

const localId = process.env.NEXT_PUBLIC_LOCAL_ID;
const local = locals["LOCALS"][localId];

const dynamicRoutes = local.routes ? local.routes : null;
