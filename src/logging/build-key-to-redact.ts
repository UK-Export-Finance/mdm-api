const prefix = `["`;
const suffix = `"]`;
const joinSeparator = `${suffix}${prefix}`;

export const buildKeyToRedact = (parts: string[]): string => {
  if (!parts.length) {
    return '';
  }
  return `${prefix}${parts.join(joinSeparator)}${suffix}`;
};
