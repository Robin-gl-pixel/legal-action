import "@testing-library/jest-dom/vitest";

// Node 22+ ships an experimental `localStorage` global that, when activated
// without `--localstorage-file`, is a no-op stub missing `setItem`/`getItem`/
// `clear`. This stub takes precedence over jsdom's Storage, breaking any test
// that exercises `window.localStorage`. We force a working in-memory Storage
// before tests run.
class MemoryStorage implements Storage {
  private store = new Map<string, string>();

  get length(): number {
    return this.store.size;
  }

  clear(): void {
    this.store.clear();
  }

  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }

  key(index: number): string | null {
    return Array.from(this.store.keys())[index] ?? null;
  }

  removeItem(key: string): void {
    this.store.delete(key);
  }

  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
}

const memoryLocalStorage = new MemoryStorage();
Object.defineProperty(window, "localStorage", {
  configurable: true,
  value: memoryLocalStorage,
});
Object.defineProperty(globalThis, "localStorage", {
  configurable: true,
  value: memoryLocalStorage,
});
