function convertStringParamsToBoolean(params: any): any {
  const convertedParams: any = {};
  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      if (typeof params[key] === "string") {
        if (params[key].toLowerCase() === "true") {
          convertedParams[key] = true;
        } else if (params[key].toLowerCase() === "false") {
          convertedParams[key] = false;
        } else {
          convertedParams[key] = params[key];
        }
      } else {
        convertedParams[key] = params[key];
      }
    }
  }
  return convertedParams;
}
export default convertStringParamsToBoolean;
