import { legacy_createStore as createStore } from '@reduxjs/toolkit';
import reducer from './reducers';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// 存储配置
const storageConfig = {
  key: 'root', // 必须有的
  storage: storage, // 缓存机制
  blacklist: [], // reducer 里不持久化的数据,除此外均为持久化数据
}

const rootReducer = persistReducer(storageConfig, reducer);
const stores = createStore(rootReducer);
const persistor = persistStore(stores);

export {persistor, stores} 