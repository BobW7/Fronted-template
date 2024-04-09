import router from "@/router";
import store from "@/store";
import ACCESS_ENUM from "@/access/accessEnum";
import checkAccess from "@/access/checkAccess";
//路由监听，读取路由中的meta中的access属性（也是自己定义的）
router.beforeEach(async (to, from, next) => {
  const user = store.state.user;
  let currentUser = user.loginUser;
  console.log("登录用户信息：", currentUser);
  //const loginUser = store.state.user.loginUser;
  // 自动登录,如果之前没登录（以是否有userRole来区分）
  // 前端在调试的时候可以把这段注释掉，并且改写getLoginUser不一直请求后端自动登录
  if (!currentUser || !currentUser.userRole) {
    //加await是为了等用户完成登录之后，在执行后面的代码
    await store.dispatch("user/getLoginUser");
    console.log("我跑到了自动登录的分支里", currentUser);
  }
  currentUser = user.loginUser;
  const needAccess = (to.meta?.access as string) ?? ACCESS_ENUM.NOT_LOGIN;
  // 要跳转的页面需要权限
  if (needAccess !== ACCESS_ENUM.NOT_LOGIN) {
    // 如果没有登录，跳转到登录页面
    if (
      !currentUser ||
      !currentUser.userRole ||
      currentUser.userRole === ACCESS_ENUM.NOT_LOGIN
    ) {
      next(`/user/login?redirect=${to.fullPath}`);
      return;
    }
    //如果已经登录了，但是权限不足，跳转到无权限页面
    if (!checkAccess(currentUser, needAccess)) {
      next("/noAuth");
      return;
    }
  }
  next();
});
router.afterEach(() => {
  console.log("跳转页面后，用户名获取：", store.state.user.loginUser);
});
