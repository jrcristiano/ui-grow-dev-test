import { defineStore } from 'pinia';

const initialState = {};

export const useUserSession = defineStore({
  id: 'userSession',
  state: () => ({
    user: initialState,
  }),
  actions: {
    actionOne() {
      // code...
    },
  }
})
