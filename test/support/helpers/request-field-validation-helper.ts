export const prepareModifiedRequest = (requestIsAnArray: boolean, modifiedRequest) => {
  return requestIsAnArray ? [modifiedRequest] : modifiedRequest;
};
