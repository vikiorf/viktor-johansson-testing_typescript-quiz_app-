import store from 'store';

export interface DataOp {
  setValue(key: string, val: string): void;

  getValue(key: string, defaultValue: string): string;

  delValue(key: string): void;
}

class LocalStorageOp implements DataOp {
  delValue(key: string): void {
    localStorage.removeItem(key);
  }

  getValue<T>(key: string, defaultValue?: T): T {
    return store.get(key, defaultValue) as T;
  }

  setValue(key: string, val: any): void {
    store.set(key, val);
  }
}

const local: LocalStorageOp = new LocalStorageOp();
export default local;
