import { fetchData } from '@/app/services/fetchService';
import { normalizeEntity } from '@/app/utils/normalizeEntity';

type FetchEntitiesOptions<T> = {
  endpoint: string;
  query?: Record<string, string | number | boolean>;
  fields?: string[];
  defaults: Partial<T>;
};

export async function fetchEntities<T>({
  endpoint,
  query = {},
  fields,
  defaults
}: FetchEntitiesOptions<T>): Promise<T[]> {
  const params = new URLSearchParams();

  if (fields?.length) {
    params.set('fields', fields.join(','));
  }

  Object.entries(query).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      params.set(key, String(value));
    }
  });

  const url = `${endpoint}?${params.toString()}`;

  const response = await fetchData(url);
  const rawData = response?.data || [];

  return rawData.map((item: Partial<T>) => normalizeEntity(item, defaults));
}