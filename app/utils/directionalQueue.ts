type QueueItem<T> = {
    item: T;
    priority: number;
    timestamp: number;
};

export class BiDirectionalPriorityQueue<T> {
    private queue: QueueItem<T>[];

    constructor() {
        this.queue = [];
    }

    enqueue(item: T, priority: number): void {
        this.queue.push({ item, priority, timestamp: Date.now() });
    }

    dequeue(type: 'highest' | 'lowest' | 'oldest' | 'newest'): T | null {
        if (this.queue.length === 0) return null;

        let index = 0;
        switch (type) {
            case 'highest':
                index = this.queue.reduce((maxIdx, curr, i, arr) => curr.priority > arr[maxIdx].priority ? i : maxIdx, 0);
                break;
            case 'lowest':
                index = this.queue.reduce((minIdx, curr, i, arr) => curr.priority < arr[minIdx].priority ? i : minIdx, 0);
                break;
            case 'oldest':
                index = 0;
                break;
            case 'newest':
                index = this.queue.length - 1;
                break;
            default:
                return null;
        }

        const [removed] = this.queue.splice(index, 1);
        return removed.item;
    }

    peek(type: 'highest' | 'lowest' | 'oldest' | 'newest'): T | null {
        if (this.queue.length === 0) return null;

        let sorted: QueueItem<T>[];
        switch (type) {
            case 'highest':
                sorted = [...this.queue].sort((a, b) => b.priority - a.priority);
                return sorted[0].item;
            case 'lowest':
                sorted = [...this.queue].sort((a, b) => a.priority - b.priority);
                return sorted[0].item;
            case 'oldest':
                return this.queue[0].item;
            case 'newest':
                return this.queue[this.queue.length - 1].item;
            default:
                return null;
        }
    }

    getAll(): T[] {
        return this.queue.map(entry => entry.item);
    }

    size(): number {
        return this.queue.length;
    }

    clear(): void {
        this.queue = [];
    }
}