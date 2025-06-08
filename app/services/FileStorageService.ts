import { writeFile } from 'fs/promises';
import path from 'path';
import { existsSync, mkdirSync } from 'fs';
import prisma from '../utils/prisma';
import { getDefaultStoragePath } from '../utils/paths';

class FileStorageService {
    private baseUploadDir!: string;

    constructor(initialBaseDir?: string) {
        if (initialBaseDir) {
            this.baseUploadDir = initialBaseDir;
            if (!existsSync(this.baseUploadDir)) {
                mkdirSync(this.baseUploadDir, { recursive: true });
            }
        }
    }

    async initialize(): Promise<void> {
        if (this.baseUploadDir) {
            return;
        }

        try {
            const settings = await prisma.settings.findFirst();
            let storagePathFromDb: string | null | undefined = settings?.storagePath;

            if (storagePathFromDb) {
                this.baseUploadDir = storagePathFromDb;
                console.log(`Using DB path: ${this.baseUploadDir}`);
            } else {
                const defaultPath = getDefaultStoragePath();
                this.baseUploadDir = defaultPath;
                console.log(`Using default DB path: ${this.baseUploadDir}`);

                await prisma.settings.upsert({
                    where: { id: 1 },
                    update: { storagePath: defaultPath },
                    create: { id: 1, storagePath: defaultPath },
                });
            }

            if (!existsSync(this.baseUploadDir)) {
                mkdirSync(this.baseUploadDir, { recursive: true });
                console.log(`Created folder: ${this.baseUploadDir}`);
            }

        } catch (error) {
            console.error('Failed to initialize FileStorageService:', error);
            const defaultPath = getDefaultStoragePath();
            this.baseUploadDir = defaultPath;
            console.warn(`Forcefully set the default path: ${this.baseUploadDir}`);
        }
    }

    private ensureInitialized(): void {
        if (!this.baseUploadDir) {
            throw new Error('FileStorageService isn\'t initialized. Call .initialize() before use.');
        }
    }

    async saveImage(file: File, entityName: string, type: 'cover' | 'logo', specificName?: string): Promise<string> {
        this.ensureInitialized();

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const imgDir = path.join(this.baseUploadDir, 'images', type);
        if (!existsSync(imgDir)) mkdirSync(imgDir, { recursive: true });

        const ext = path.extname(file.name);
        const filename = `${entityName.replace(/\s+/g, '_')}_${specificName ? specificName + '_' : ''}${Date.now()}${ext}`;
        const filePath = path.join(imgDir, filename);

        await writeFile(filePath, buffer);
        return path.relative(this.baseUploadDir, filePath);
    }

    async saveAudio(file: File, albumName: string, trackName: string, trackPosition: number): Promise<string> {
        this.ensureInitialized();

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const audioDir = path.join(this.baseUploadDir, 'audio', albumName.replace(/\s+/g, '_'));
        if (!existsSync(audioDir)) mkdirSync(audioDir, { recursive: true });

        const ext = path.extname(file.name);
        const filename = `${trackName.replace(/\s+/g, '_')}_${trackPosition}_${Date.now()}${ext}`;
        const filePath = path.join(audioDir, filename);

        await writeFile(filePath, buffer);
        return path.relative(this.baseUploadDir, filePath);
    }

    getCurrentStoragePath(): string | null {
        return this.baseUploadDir;
    }
}

export { FileStorageService };