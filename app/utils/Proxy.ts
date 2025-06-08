import { InputAlbumData } from "../types/InputDefinitions";
import { AlbumService } from "../services/AlbumService";

type AuthStrategy = 'API_KEY' | 'JWT'

export class HttpProxy {
    constructor(private baseUrl: string, private authType: AuthStrategy, private token?: string) { };

    private injectAuth(headers: Headers): Headers {
        if (this.authType === 'JWT' && this.token) {
            headers.set('Authorization', `Bearer ${this.token}`);
        }
        if (this.authType === 'API_KEY') {
            headers.set('x-api-key', 'your-api-key');
        }
        return headers;
    }

    async get(endpoint: string, cache: boolean = false) {
        const headers = this.injectAuth(new Headers());
        let response = null;

        if (cache) {
            // TODO: Implement retrieving cached data here 
        }

        if (!response) {
            response = await fetch(`${this.baseUrl}${endpoint}`, { headers });
            // TODO: Implement caching logic here 
        }

        return response;
    }

    async post(endpoint: string, body: any) {
        const headers = this.injectAuth(new Headers({ 'Content-Type': 'application/json' }));
        return fetch(`${this.baseUrl}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(body),
        });
    }
}

export function createLoggingProxy<T extends object>(target: T): T {
    return new Proxy(target, {
        get(target, prop) {
            const orig = target[prop as keyof T];
            if (typeof orig === 'function') {
                return async (...args: any[]) => {
                    console.log(`[Service] Calling ${String(prop)} with:`, args);
                    try {
                        const result = await (orig as Function).apply(target, args);
                        console.log(`[Service] Result from ${String(prop)}:`, result);
                        return result;
                    } catch (e) {
                        console.error(`[Service] Error in ${String(prop)}:`, e);
                        throw e;
                    }
                };
            }
            return orig;
        }
    });
}