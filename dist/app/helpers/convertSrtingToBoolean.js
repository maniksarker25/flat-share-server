"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function convertStringParamsToBoolean(params) {
    const convertedParams = {};
    for (const key in params) {
        if (params.hasOwnProperty(key)) {
            if (typeof params[key] === "string") {
                if (params[key].toLowerCase() === "true") {
                    convertedParams[key] = true;
                }
                else if (params[key].toLowerCase() === "false") {
                    convertedParams[key] = false;
                }
                else {
                    convertedParams[key] = params[key];
                }
            }
            else {
                convertedParams[key] = params[key];
            }
        }
    }
    return convertedParams;
}
exports.default = convertStringParamsToBoolean;
