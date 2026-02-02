import { Song } from "../data/types"

export class AudioQueue {
    private items: Song[] = []

    enqueue(song: Song): void {
        this.items.push(song)    
    }

    dequeue(): Song | null {
        return this.items.shift() ?? null
    }

    peek(): Song | null {
        return this.items[0] ?? null
    }

    peekAt(index: number): Song | null {
        if (index < 0 || index >= this.items.length) return null
        return this.items[index]
    }

    removeAt(index: number): Song | null {
        if (index < 0 || index >= this.items.length) return null
        return this.items.splice(index, 1)[0]
    }

    size(): number {
        return this.items.length
    }

    isEmpty(): boolean {
        return (this.items.length === 0)
    }

    clear(): void {
        this.items = []        
    }

    toArray(): Song[] {
        return [...this.items]
    }
}