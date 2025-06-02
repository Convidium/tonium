import path from 'path';
import os from 'os';
import fs from 'fs';

export function getDefaultStoragePath(): string {
  let defaultPath: string;
  const appFolderName = 'ToniumData';

  switch (os.platform()) {
    case 'win32':
      // Windows: C:\Users\<username>\Music\ToniumData
      defaultPath = path.join(os.homedir(), 'Music', appFolderName);
      break;
    case 'darwin':
      // macOS: /Users/<username>/Music/ToniumData
      defaultPath = path.join(os.homedir(), 'Music', appFolderName);
      break;
    case 'linux':
      // Linux: /home/<username>/Music/ToniumData
      defaultPath = path.join(os.homedir(), 'Music', appFolderName);
      break;
    default:
      // other OS:
      defaultPath = path.join(os.homedir(), appFolderName + 'Files');
  }

  try {
    if (!fs.existsSync(defaultPath)) {
      fs.mkdirSync(defaultPath, { recursive: true });
      console.log(`Створено дефолтну папку: ${defaultPath}`);
    }
  } catch (error) {
    console.error(`Помилка створення дефолтної папки ${defaultPath}:`, error);
    return os.homedir();
  }

  return defaultPath;
}