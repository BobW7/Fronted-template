<template>
  <div id="userRegisterView">
    <h2 style="margin-bottom: 16px">用户注册</h2>
    <a-form
      :model="form"
      :style="{ width: '600px', margin: '0 auto' }"
      size="large"
      label-align="left"
      auto-label-width
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" tooltip="密码不少于8位" label="密码">
        <a-input
          v-model="form.userPassword"
          password
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item field="checkPassword" label="确认密码">
        <a-input
          v-model="form.checkPassword"
          passowrd
          placeholder="请确认密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button html-type="submit" type="primary" long>注册</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import message from "@arco-design/web-vue/es/message";
import { UserControllerService, UserRegisterRequest } from "../../../generated";
/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const router = useRouter();
const store = useStore();

/**
 * 提交表单，执行注册
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  // 注册成功，跳转到主页
  if (res.code === 0) {
    await store.dispatch("user/getLoginUser");
    message.success("注册成功！");
    router.push({
      path: "/user/login",
      replace: true,
    });
  } else {
    message.error("注册失败," + res.message);
  }
};
</script>
