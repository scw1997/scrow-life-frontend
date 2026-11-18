<script setup lang="ts"></script>

<template>
    <div class="auth">
        <div class="auth-container">
            <RouterView />
        </div>
    </div>
</template>

<style scoped lang="less">
.auth {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    .auth-container {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 600px;
        min-height: 300px;
        padding: 14px;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}
</style>
