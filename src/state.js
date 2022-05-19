import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";
const { persistAtom } = recoilPersist();

// recoil로 관리할 변수들..
// uId
export const idState = atom({
  key: "idState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// 지번 주소
export const addrState = atom({
  key: "addrState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 도로명 주소
export const roadAddrState = atom({
  key: "roadAddrState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// x좌표
export const xState = atom({
  key: "xState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// y좌표
export const yState = atom({
  key: "yState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// 은행
export const bankState = atom({
  key: "bankState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 계좌번호
export const accountState = atom({
  key: "accountState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 닉네임
export const nameState = atom({
  key: "nameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 포인트
export const pointState = atom({
  key: "pointState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const buttonState = atom({
  key: "buttonState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});
