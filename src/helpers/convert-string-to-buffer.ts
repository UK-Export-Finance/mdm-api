/**
 * Converts a string representation of a buffer to an actual Buffer object.
 *
 * This function takes a string that represents a buffer (e.g., "<Buffer 68 65 6c 6c 6f>")
 * and converts it to a Buffer object. It removes the "<Buffer " and ">" parts of the string,
 * as well as any whitespace, and then creates a Buffer from the resulting hex string.
 *
 * @param data - The string representation of the buffer.
 * @returns A Buffer object created from the hex string.
 */
export const convertStringToBuffer = (data: string): Buffer => {
  // Remove buffer string characters
  const hexString = data.replace('<Buffer ', '').replace('>', '').replace(/\s+/g, '');
  // Convert string to Buffer
  return Buffer.from(hexString, 'hex');
};
