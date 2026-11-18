<script setup lang="ts">
import {
    NForm,
    NFormItem,
    NInput,
    NButton,
    NSpace,
    NInputGroup,
    NCountdown,
    type FormInst,
    type FormRules
} from 'naive-ui';
import { ref, h, onMounted } from 'vue';
import notification from '@/utils/notification.ts';
import { Reg } from '@/utils/tools.ts';
import http from '@/utils/http.ts';
import { user } from '@/api';
import message from '@/utils/message.ts';
const formRef = ref<FormInst | null>(null);

const model = ref({
    email: null,
    username: null,
    password: null,
    confirmPassword: null,
    emailCode: null
});
const countdownActive = ref(false);
const rules: FormRules = {
    username: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入用户名'
    },
    password: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入密码',
        validator: (_, _1) => {
            formRef.value
                ?.validate(() => {}, ['confirmPassword'])
                .catch((e) => {
                    // console.log(e);
                });
            return true;
        }
    },
    confirmPassword: {
        required: true,
        trigger: ['blur', 'input'],
        message: '两次输入的密码不一致',
        validator: (_, value) => {
            return value === model.value.password ? true : new Error('两次输入的密码不一致');
        }
    },
    email: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入正确的邮箱格式',
        validator: (_, value) => {
            return Reg.email.test(value) ? true : new Error('请输入正确的邮箱格式');
        }
    },
    emailCode: {
        required: true,
        trigger: ['blur', 'input'],
        message: '请输入邮箱验证码'
    }
};

const renderCountDown = (props: {
    hours: number;
    minutes: number;
    seconds: number;
    milliseconds: number;
}) => {
    return h(
        NButton,
        { disabled: true, class: 'countdown-button' },
        `${props.minutes === 1 ? 60 : props.seconds}秒后可重新获取`
    );
};

const handleSendCode = async () => {
    const email = model.value.email;
    if (!email) {
        return message.error('请输入邮箱');
    }
    message.loading(true);
    await http.post(user.sendCode, { email: model.value.email });
    message.loading(false);
    countdownActive.value = true;
};
</script>

<template>
    <div>
        <h2 class="title">注册</h2>
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
                <n-input v-model:value="model.username" />
            </n-form-item>
            <n-form-item label="邮箱" path="email">
                <n-input v-model:value="model.email" />
            </n-form-item>
            <n-input-group>
                <n-form-item label="邮箱验证码" path="emailCode">
                    <n-input v-model:value="model.emailCode" />
                </n-form-item>
                <NButton v-if="countdownActive === false" @click="handleSendCode">
                    获取验证码
                </NButton>
                <n-countdown
                    v-else
                    :duration="60000"
                    :active="countdownActive"
                    :render="renderCountDown"
                    @finish="countdownActive = false"
                />
            </n-input-group>

            <n-form-item label="密码" path="password">
                <n-input v-model:value="model.password" />
            </n-form-item>
            <n-form-item label="确认密码" path="confirmPassword">
                <n-input v-model:value="model.confirmPassword" />
            </n-form-item>
            <NSpace size="large" align="center" class="space" justify="center">
                <n-button class="btn-submit" round type="primary">注册</n-button>
                <NButton text type="primary">已有账号，去登录</NButton>
            </NSpace>
        </n-form>
    </div>
</template>

<style scoped lang="less">
.title {
    text-align: center;
}
.space {
    margin: 0 auto;
}
</style>
