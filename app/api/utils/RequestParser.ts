import { NextRequest } from 'next/server';

export class RequestParser {
    private searchParams: URLSearchParams;
    private pathname: string;

    constructor(request: NextRequest) {
        const url = new URL(request.url);
        this.searchParams = url.searchParams;
        this.pathname = url.pathname;
    }

    getLimit(defaultValue = 10): number {
        return this.getNumberParam('limit', defaultValue);
    }

    getPage(defaultValue = 1): number {
        return this.getNumberParam('page', defaultValue);
    }

    getQueryParam(): string | null {
        return this.searchParams.get('q');
    }

    getFields(): string[] | null {
        const fieldsParam = this.searchParams.get('fields');
        return fieldsParam ? fieldsParam.split(',') : null;
    }

    getTables(defaultTables: string[] = ["song_files", "records", "artists", "recent_listened_records"]): string[] {
        const tablesParam = this.searchParams.get('table');
        return tablesParam ? tablesParam.split(',') : defaultTables;
    }

    getFilters(): Record<string, string | string[] | number> {
        const filters: Record<string, string | string[] | number> = {};

        this.searchParams.forEach((value, key) => {
            if (!["q", "limit", "page", "tables", "fields"].includes(key)) {
                if (key === "track_number") {
                    const trackNumber = parseInt(value, 10);
                    if (!isNaN(trackNumber)) {
                        filters[key] = trackNumber;
                    } else {
                        filters[key] = value;
                    }
                } else {
                    if (filters[key]) {
                        if (Array.isArray(filters[key])) {
                            (filters[key] as (string | number)[]).push(value);
                        } else {
                            filters[key] = [filters[key] as (string), value];
                        }
                    } else {
                        filters[key] = value;
                    }
                }
            }
        });

        return filters;
    }

    getRecordId(): number | null {
        const parts = this.pathname.split('/');
        const recordsIndex = parts.indexOf('records');

        if (recordsIndex !== -1 && parts.length > recordsIndex + 1) {
            const recordId = parseInt(parts[recordsIndex + 1], 10);
            return isNaN(recordId) ? null : recordId;
        }
        return null;
    }

    getSongId(): number | null {
        const parts = this.pathname.split('/');
        const recordIndex = parts.indexOf("records");

        if (recordIndex !== -1 && parts[recordIndex + 2] === "songs") {
            const songId = parseInt(parts[recordIndex + 3], 10);
            return isNaN(songId) ? null : songId;
        }

        return null;
    }

    getTrackNumber(): number | null {
        const trackNumberParam = this.searchParams.get('track_number');

        if (!trackNumberParam) return null;

        const trackNumber = parseInt(trackNumberParam, 10);
        return isNaN(trackNumber) ? null : trackNumber;
    }

    private getNumberParam(paramName: string, defaultValue: number): number {
        const value = this.searchParams.get(paramName);

        if (!value) return defaultValue;
        const parsedValue = parseInt(value, 10);
        return isNaN(parsedValue) || parsedValue <= 0 ? defaultValue : parsedValue;
    }

    parseQueryParams(): {
        search?: { key: string; value: string };
        filters?: Record<string, string[]>;
        page: number;
        limit: number;
        orderBy?: { key: string; direction: 'asc' | 'desc' };
        fields?: string[];
        table?: string;
    } {
        const filtersRaw = this.searchParams.get('filters');
        const searchKey = this.searchParams.get('searchKey');
        const searchValue = this.searchParams.get('searchValue');
        const orderKey = this.searchParams.get('orderKey');
        const orderRule = this.searchParams.get('orderRule');
        const fieldsRaw = this.searchParams.get('fields');
        const table = this.searchParams.get('table') || 'albums';
        const page = parseInt(this.searchParams.get('page') || '1');
        const limit = parseInt(this.searchParams.get('limit') || '10');

        let filters: Record<string, string[]> = {};
        if (filtersRaw) {
            try {
                const parsed = JSON.parse(filtersRaw);
                if (typeof parsed === 'object' && parsed !== null) {
                    filters = parsed;
                }
            } catch (e) {
                console.warn('Invalid filters JSON:', filtersRaw);
            }
        }

        const result: {
            search?: { key: string; value: string };
            filters?: Record<string, string[]>;
            page: number;
            limit: number;
            orderBy?: { key: string; direction: 'asc' | 'desc' };
            fields?: string[];
            table?: string;
        } = {
            page,
            limit,
            table,
        };

        if (searchKey && searchValue) {
            result.search = { key: searchKey, value: searchValue };
        }

        if (Object.keys(filters).length > 0) {
            result.filters = filters;
        }

        if (orderKey && orderRule && ['asc', 'desc'].includes(orderRule)) {
            result.orderBy = { key: orderKey, direction: orderRule as 'asc' | 'desc' };
        }

        if (fieldsRaw) {
            result.fields = fieldsRaw.split(',').map(f => f.trim()).filter(Boolean);
        }

        return result;
    }

    async extractFiltersFromQueryParams(searchParams: URLSearchParams): Promise<Record<string, string[]>> {
    const filters: Record<string, string[]> = {};
    for (const [key, value] of searchParams.entries()) {
        if (!['q', 'limit', 'page', 'fields', 'orderKey', 'orderRule'].includes(key)) {
            filters[key] = [value];
        }
    }
    return filters;
}
}