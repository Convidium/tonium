import parseInclude from "./parseInclude";

export interface BuildPrismaQueryOptions {
    search?: { key: string; value: string };
    filters?: Record<string, string[]>;
    orderBy?: { key: string; direction: 'asc' | 'desc' };
    limit: number;
    page: number;
    fields?: string[];
    include?: string[];
}

export function buildPrismaQuery(options: BuildPrismaQueryOptions) {
    const {
        search,
        filters = {},
        orderBy,
        limit,
        page,
        fields,
        include
    } = options;

    const where: any = { AND: [] };

    // 1. Filters
    for (const [key, values] of Object.entries(filters)) {
        if (!Array.isArray(values) || values.length === 0) continue;

        if (key.includes('.')) {
            const [relation, field] = key.split('.');
            const condition = values.length === 1
                ? { [relation]: { [field]: values[0] } }
                : { [relation]: { [field]: { in: values } } };

            where.AND.push(condition);
        } else {
            const condition = values.length === 1
                ? { [key]: values[0] }
                : { [key]: { in: values } };

            where.AND.push(condition);
        }
    }

    // 2. Search
    if (search?.key && search?.value) {
        if (search.key.includes('.')) {
            const [relation, field] = search.key.split('.');
            where.AND.push({
                [relation]: {
                    [field]: {
                        contains: search.value,
                    },
                },
            });
        } else {
            where.AND.push({
                [search.key]: {
                    contains: search.value,
                },
            });
        }
    }

    // 3. Pagination
    const take = limit;
    const skip = (page - 1) * limit;

    // 4. Sorting
    const sort = orderBy ? { [orderBy.key]: orderBy.direction } : undefined;

    // 5. Select
    const select = fields?.length ? Object.fromEntries(fields.map(field => [field, true])) : undefined;

    // 6. Include
    const includeObj = include?.length ? parseInclude(include) : undefined;

    const query: Record<string, any> = {
        where: where.AND.length > 0 ? where : undefined,
        take,
        skip
    };

    if (sort) query.orderBy = sort;
    if (select) query.select = select;
    if (includeObj) query.include = includeObj;

    return query;
}