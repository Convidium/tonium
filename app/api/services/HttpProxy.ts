type AuthStrategy = 'API_KEY' | 'JWT'

export class HttpProxy {
  constructor(private baseUrl: string, private authType: AuthStrategy, private token?: string) {};

  private injectAuth(headers: Headers): Headers {
    if (this.authType === 'JWT' && this.token) {
      headers.set('Authorization', `Bearer ${this.token}`);
    }
    if (this.authType === 'API_KEY') {
      headers.set('x-api-key', 'your-api-key');
    }
    return headers;
  }

  async get(endpoint: string) {
    const headers = this.injectAuth(new Headers());
    return fetch(`${this.baseUrl}${endpoint}`, { headers });
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