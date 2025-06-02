import path from 'path';
import fs from 'fs/promises';
import { v4 as uuid } from 'uuid';
import { getDefaultStoragePath } from '@/app/api/utils/paths';

export class FileService {
    private baseDir: string;

    constructor(storagePath?: string) {
        this.baseDir = storagePath || getDefaultStoragePath();
    }

    async save(file: File, subFolder: string): Promise<string> {
        const buffer = Buffer.from(await file.arrayBuffer());
        const ext = path.extname(file.name);
        const filename = uuid() + ext;

        const folder = path.join(this.baseDir, subFolder);
        await fs.mkdir(folder, { recursive: true });

        const fullPath = path.join(folder, filename);
        await fs.writeFile(fullPath, buffer);

        const relative = path.relative(this.baseDir, fullPath).replace(/\\/g, '/');
        console.log(`FileService: saved file -> ${relative}`);
        return relative;
    }

    async delete(relativePath: string): Promise<void> {
        const fullPath = path.join(this.baseDir, relativePath);
        await fs.unlink(fullPath).catch(() => {
            console.warn(`FileService: couldn't delete ${relativePath}`);
        });
        console.log(`FileService: deleted the file -> ${relativePath}`);
    }
}