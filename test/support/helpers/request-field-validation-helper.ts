/** Helper to wrap request in array if this wrapping is required.
 *
 * @param {boolean} requestIsAnArray - should we wrap request variable.
 * @param {any} modifiedRequest - variable to be wrapped.
 * @returns modifiedRequest or [modifiedRequest]
 */
export const prepareModifiedRequest = (requestIsAnArray: boolean, modifiedRequest: any) => {
  return requestIsAnArray ? [modifiedRequest] : modifiedRequest;
};
