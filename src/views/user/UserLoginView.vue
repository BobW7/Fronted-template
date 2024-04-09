<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      :model="form"
      :style="{ width: '600px', margin: '0 auto' }"
      label-align="left"
      @submit="handleSubmit"
      size="large"
      auto-label-width
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" size="large" long
          >登录
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button type="outline" @click="goToRegister" size="large" long
          >注册
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import message from "@arco-design/web-vue/es/message";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();
/**
 * 提交表单，执行登录
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  // 登录成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    message.success("登录成功！");
    router.push({
      path: "/",
      replace: true,
    });
  } else {
    message.error("登录失败," + res.message);
  }
};
const goToRegister = () => {
  router.push({
    path: "/user/register",
  });
};
</script>
