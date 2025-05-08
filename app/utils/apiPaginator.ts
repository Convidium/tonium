type QueryParams = Record<string, string | number | boolean>;

export async function* paginatedFetcher<T>(
    endpoint: string,
    {
      limit = 3,
      searchParams = {},
      transform = (data: any) => data as T[],
    }: {
      limit?: number;
      searchParams?: QueryParams;
      transform?: (data: any) => T[];
    } = {}
  ): AsyncGenerator<T[], void, unknown> {
    let offset = 0;
    let hasMore = true;
  
    while (hasMore) {
      const query = new URLSearchParams({
        ...searchParams,
        limit: limit.toString(),
        offset: offset.toString(),
      });
  
      const response = await fetch(`${endpoint}?${query.toString()}`);
      if (!response.ok) throw new Error("Failed to fetch data");
  
      const result = await response.json();
      const items = transform(result);
  
      yield items;
  
      offset += items.length;
      hasMore = items.length === limit;
    }
  }