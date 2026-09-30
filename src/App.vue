<script setup lang="ts">
import logo from './assets/logo.png';
</script>

<template>
    <div class="layout">
        <section class="header">
            <main class="main">
                <section class="left">
                    <img class="logo" :src="logo" alt="" />
                    <div class="title">卷窝</div>
                </section>
            </main>
        </section>
    </div>
</template>

<style scoped lang="less">
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background-color: #f0f0f0;
    .header {
        height: 60px;
        background-color: #fff;
        width: 100%;
        position: sticky;
        top: 0;
        left: 0;
        .main {
            width: 1200px;
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
                    color: #d39f41;
                }
            }
        }
    }
}
</style>
