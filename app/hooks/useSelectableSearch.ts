import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSearchableSelectProps<TItem> {
    fetchItems: (query: string, offset: number, limit: number, signal: AbortSignal) => Promise<{ items: TItem[]; hasMore: boolean }>;
    createItem?: (name: string) => Promise<TItem>; // Опціонально, якщо створення не завжди потрібне
    initialLoadQuery?: string; // Початковий запит, коли поле пусте
    pageSize?: number;
    debounceTime?: number;
  }
  
  const useSearchableSelect = <TItem,>({
    fetchItems,
    createItem,
    initialLoadQuery = '',
    pageSize = 20,
    debounceTime = 300,
  }: UseSearchableSelectProps<TItem>) => {
    const [items, setItems] = useState<TItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [currentQuery, setCurrentQuery] = useState(initialLoadQuery); // Внутрішній стан запиту
  
    const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const abortControllerRef = useRef<AbortController | null>(null);
  
     // Використовуємо useRef для останнього успішного запиту, щоб довантажувати коректно
    const lastSuccessfulQueryRef = useRef(initialLoadQuery);
  
  
    const loadItems = useCallback(async (query: string, currentOffset: number) => {
      if (loading) return;
  
      setLoading(true);
      setError(null);
  
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      const controller = new AbortController();
      abortControllerRef.current = controller;
      const signal = controller.signal;
  
      try {
        const data = await fetchItems(query, currentOffset, pageSize, signal);
  
        if (currentOffset === 0) {
          setItems(data.items);
        } else {
          setItems(prevItems => [...prevItems, ...data.items]);
        }
  
        setOffset(currentOffset + data.items.length);
        setHasMore(data.items.length === pageSize); // Припустимо, API повертає pageSize, якщо є ще
        lastSuccessfulQueryRef.current = query; // Зберігаємо запит після успіху
  
      } catch (err: any) {
        if (err.name === 'AbortError') {
          console.log('Fetch aborted');
        } else {
          setError(err);
          console.error("Failed to fetch items:", err);
           setHasMore(false); // Зупиняємо довантаження при помилці
        }
      } finally {
        setLoading(false);
        abortControllerRef.current = null;
      }
    }, [loading, fetchItems, pageSize]);
  
  
    // Ефект для debounce та запуску пошуку/початкового завантаження при зміні currentQuery
    useEffect(() => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current);
      }
  
      // Якщо запит порожній, одразу завантажуємо початкові дані
      if (currentQuery.trim() === '') {
         if (abortControllerRef.current) {
             abortControllerRef.current.abort();
         }
         setItems([]);
         setOffset(0);
         setHasMore(true);
         loadItems(initialLoadQuery, 0); // Завантажуємо з початковим запитом
      } else {
          // Інакше - debounce для пошуку
          debounceTimeoutRef.current = setTimeout(() => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
             setItems([]);
             setOffset(0);
             setHasMore(true);
             loadItems(currentQuery.trim(), 0);
          }, debounceTime);
      }
  
  
      return () => {
        if (debounceTimeoutRef.current) {
          clearTimeout(debounceTimeoutRef.current);
        }
         if (abortControllerRef.current) {
          abortControllerRef.current.abort();
         }
      };
    }, [currentQuery, debounceTime, loadItems, initialLoadQuery]); // Залежності для ефекту
  
  
    const handleScroll = useCallback(() => {
       // Цю логіку прив'язуватиме сам компонент UI до контейнера
      // Хук надає лише метод для довантаження
      if (hasMore && !loading) {
         loadItems(lastSuccessfulQueryRef.current, offset); // Використовуємо останній успішний запит
       }
    }, [hasMore, loading, offset, loadItems]);
  
  
     // Функція для обробки створення (якщо передано пропс createItem)
     const createNewItem = useCallback(async (name: string) => {
         if (!createItem || !name.trim()) return null;
  
          setLoading(true); // Можливо, варто мати окремий стан для створення?
          setError(null); // Очищаємо помилки завантаження
          // createError стан можна додати сюди або в компоненті
  
         try {
             const newItem = await createItem(name.trim());
             // Можливо, після створення, скинути запит або перезавантажити початковий список
             // setCurrentQuery('');
             // loadItems(initialLoadQuery, 0);
             return newItem; // Повертаємо створений елемент
         } catch (err: any) {
             setError(err); // Використовуємо той же error стан або окремий
             console.error("Failed to create item:", err);
             throw err; // Перекидаємо помилку для обробки в компоненті
         } finally {
             setLoading(false);
         }
     }, [createItem, loadItems, initialLoadQuery]); // Додаємо залежності
  
    return {
      items,
      loading,
      error,
      hasMore,
      offset, // Повертаємо offset, якщо потрібно компоненту
      currentQuery, // Повертаємо внутрішній запит
      setCurrentQuery, // Метод для зміни запиту (прив'язати до onChange інпута)
      handleScroll, // Обробник скролу для прив'язки до UI
      createNewItem, // Метод для створення нового елемента
      isSearching: currentQuery.trim().length > 0, // Чи активний пошук
    };
  };
  
  export default useSearchableSelect;