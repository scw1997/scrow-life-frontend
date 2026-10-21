<script setup lang="ts">
import { NButton, NInputGroup, NInput, useMessage } from 'naive-ui';
import logo from '@/assets/logo.png';
import message from '@/utils/message.ts';
window.$message = useMessage();
const handleSearch = async () => {};
</script>

<template>
    <section class="header">
        <main class="main">
            <section class="left">
                <img class="logo" :src="logo" alt="" />
                <div class="title">卷窝</div>
            </section>
            <section class="right">
                <NInputGroup>
                    <NInput round class="input-search" placeholder="请输入搜索内容" />
                    <NButton type="primary" ghost @click="handleSearch">搜索</NButton>
                </NInputGroup>
            </section>
        </main>
    </section>
</template>

<style scoped lang="less">
.header {
    height: 60px;
    background-color: #fff;
    width: 100%;
    position: sticky;
    top: 0;
    left: 0;
    .main {
        width: 1200px;
        padding: 0 20px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        .left {
            flex: auto;
            display: flex;
            align-items: center;
            .logo {
                height: 40px;
                display: flex;
            }
            .title {
                font-size: 20px;
                font-weight: bold;
                padding-left: 10px;
                color: var(--theme-color);
            }
        }
        .right {
            flex: none;
            margin-left: auto;
            .input-search {
                width: 200px;
            }
        }
    }
}
</style>
