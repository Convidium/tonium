import { createLoggingProxy } from '@/app/utils/Proxy';

describe('createLoggingProxy', () => {
    it('logs method calls and results', async () => {
        const mockService = {
            add: jest.fn(async (a: number, b: number) => a + b),
        };

        const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

        const proxy = createLoggingProxy(mockService);

        const result = await proxy.add(3, 4);

        expect(mockService.add).toHaveBeenCalledWith(3, 4);
        expect(result).toBe(7);

        expect(consoleLogSpy).toHaveBeenCalledWith('[Service] Calling add with:', [3, 4]);
        expect(consoleLogSpy).toHaveBeenCalledWith('[Service] Result from add:', 7);

        consoleLogSpy.mockRestore();
    });
});