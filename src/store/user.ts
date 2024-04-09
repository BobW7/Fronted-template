import { StoreOptions } from "vuex";
import ACCESS_ENUM from "@/access/accessEnum";
import { UserControllerService } from "../../generated";

export default {
  namespaced: true,
  //  state 存储的状态变量，比如用户信息
  state: () => ({
    loginUser: {
      userName: "未登录",
      userRole: ACCESS_ENUM.NOT_LOGIN,
    },
  }),
  // actions 执行异步操作，并且触发mutation的更改（调用mutation）
  actions: {
    /*    getLoginUser({ commit, state }, payload) {
      commit("updateUser", payload);
    },*/
    async getLoginUser({ commit, state }, payload) {
      //真实登录请求后端，从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code === 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  // mutations 定义了更新变量增删改的方法
  mutations: {
    updateUser(state, payload) {
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
