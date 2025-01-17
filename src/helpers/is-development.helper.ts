/**
 * Checks if the current environment is development based on the NODE_ENV environment variable.
 *
 * @returns {boolean} `true` if `NODE_ENV` is set to `'development'`, otherwise `false`.
 */
export const isDevelopment = (): boolean => {
  return process.env.NODE_ENV == 'development' ? true : false;
};
