import fs from 'fs';
import path from 'path';

export default class InputReader {
  static readTxtFile(filePath: string): string {
    const joinedPath = path.join(__dirname, filePath);
    return fs.readFileSync(joinedPath).toString();
  }
}