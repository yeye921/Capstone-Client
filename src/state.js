import { atom } from 'recoil';

// recoil로 관리할 변수들
export const idState = atom({
  key: 'idState',
  default: '',
});
