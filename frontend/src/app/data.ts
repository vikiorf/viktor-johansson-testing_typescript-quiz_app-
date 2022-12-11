/*
 * 数据操作
 * */
import store from 'store';

export interface DataOp {
  // eslint-disable-next-line no-unused-vars
  setValue(key: string, val: string): void;

  // eslint-disable-next-line no-unused-vars
  getValue(key: string, defaultValue: string): string;

  // eslint-disable-next-line no-unused-vars
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
