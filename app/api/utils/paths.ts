import path from 'path';
import os from 'os';
import fs from 'fs';

export function getDefaultStoragePath(): string {
  let defaultPath: string;
  const appFolderName = 'ToniumData';

  const osPlatform = os.platform();
  if (osPlatform === 'win32' || osPlatform === 'darwin' || osPlatform === 'linux') {
      defaultPath = path.join(os.homedir(), 'Music', appFolderName);
  } else {
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