import { generateRandomString } from "./generateRandomString";

export const generatePrefixedRandomString = (prefix: string, len: number) => {
  return prefix + generateRandomString(len);
};
