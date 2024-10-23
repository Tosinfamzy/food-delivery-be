import * as fs from 'fs';

export const readFromFile = (filePath: string) => {
  try {
    return JSON.parse(fs.readFileSync(filePath, 'utf8'));
  } catch (error) {
    return [];
  }
};
