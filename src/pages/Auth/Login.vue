<script setup lang="ts">
import { NForm, NFormItem, NInput, NSelect, type FormRules } from 'naive-ui';
import { ref } from 'vue';
const model = ref({
    email: null
});
const rules: FormRules = {
    username: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入用户名'
    },
    password: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入密码'
    },
    confirmPassword: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入确认密码'
    },
    email: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入邮箱'
    }
};
</script>

<template>
    <n-form
        ref="formRef"
        :model="model"
        :rules="rules"
        label-placement="left"
        label-width="auto"
        require-mark-placement="right-hanging"
        size="medium"
        :style="{
            maxWidth: '640px'
        }"
    >
        <n-form-item label="用户名" path="username">
            <n-input v-model="model.username" placeholder="Input" />
        </n-form-item>
        <n-form-item label="邮箱" path="email">
            <n-input v-model="model.email" placeholder="Input" />
        </n-form-item>
        <n-form-item label="密码" path="password">
            <n-input v-model="model.password" placeholder="Input" />
        </n-form-item>
        <n-form-item label="确认密码" path="confirmPassword">
            <n-input v-model="model.confirmPassword" placeholder="Input" />
        </n-form-item>
        <n-button round type="primary" @click="handleValidateButtonClick">验证</n-button>
    </n-form>
</template>

<style scoped lang="less"></style>
