export const fetchData = async (query: string): Promise<any> => {
  try {
    const res = await fetch(query);

    if (!res.ok) throw new Error("Failed to fetch data");
    const response = await res.json();

    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};