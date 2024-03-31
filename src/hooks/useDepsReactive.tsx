// TODO convert to TypeScript
import { useCreation } from 'ahooks';
import { omit } from 'lodash';
import { useState } from 'react';

const proxyMap = new WeakMap();
const rawMap = new WeakMap();

function isObject(val: any) {
  return typeof val === 'object' && val !== null;
}

function observer(initialValues: any, cb: any) {
  const existingProxy = proxyMap.get(initialValues);

  if (existingProxy) {
    return existingProxy;
  }

  if (rawMap.has(initialValues)) {
    return initialValues;
  }

  const proxy: any = new Proxy(initialValues, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return isObject(res) ? observer(res, cb) : Reflect.get(target, key);
    },
    set(target, key, val) {
      const ret = Reflect.set(target, key, val);
      cb();
      return ret;
    },
  });

  proxyMap.set(initialValues, proxy);
  rawMap.set(proxy, initialValues);

  return proxy;
}

function useDepsReactive<T = any>(
  getInitialValues: () => T,
  deps: React.DependencyList = [],
  cb?: (values: any) => void,
): T {
  const [, setFlag] = useState({});

  const state = useCreation(() => {
    const initialValues: any = Object.assign(
      (getInitialValues() as any) || {},
      {
        _self: () => initialValues,
      },
    );

    return observer(initialValues, () => {
      setFlag({});
      cb?.(omit(initialValues, '_self'));
    });
  }, deps);

  return state;
}
export { useDepsReactive };
