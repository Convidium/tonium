import { FileService } from '@/app/api/services/FileService';
import path from 'path';
import fs from 'fs/promises';
import os from 'os';

function mockFile(filename: string, content: string): File {
    const blob = new Blob([content]);
    return new File([blob], filename);
}

describe('FileService', () => {
    const tempFolder = path.join(os.tmpdir(), 'tonium-test');
    const service = new FileService(tempFolder);

    it('should save a file and return relative path', async () => {
        const file = mockFile('test.txt', 'hello world');

        const relativePath = await service.save(file, 'testfiles');

        const fullPath = path.join(tempFolder, relativePath);
        const exists = await fs.stat(fullPath).then(() => true).catch(() => false);

        expect(relativePath.startsWith('testfiles/')).toBe(true);
        expect(exists).toBe(true);

        // Clean up
        await service.delete(relativePath);
    });

    it('should delete a file', async () => {
        const file = mockFile('todelete.txt', 'to be removed');

        const relPath = await service.save(file, 'testfiles');
        const fullPath = path.join(tempFolder, relPath);

        await service.delete(relPath);

        const exists = await fs.stat(fullPath).then(() => true).catch(() => false);
        expect(exists).toBe(false);
    });
});