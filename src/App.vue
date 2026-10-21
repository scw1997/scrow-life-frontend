<script setup lang="ts">
import { NConfigProvider, NMessageProvider, useMessage, type GlobalThemeOverrides } from 'naive-ui';
import Header from '@/components/Header/Header.vue';
const themeColor = '#e59c18';
// #d39f41
const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: themeColor
    },
    Button: {
        textColor: themeColor
    },
    Select: {
        peers: {
            InternalSelection: {
                textColor: themeColor
            }
        }
    }
};
</script>

<template>
    <NConfigProvider :theme-overrides="themeOverrides">
        <NMessageProvider>
            <div class="layout">
                <Header />
                <div class="router-view">
                    <RouterView />
                </div>
            </div>
        </NMessageProvider>
    </NConfigProvider>
</template>

<style scoped lang="less">
.layout {
    display: flex;
    flex-direction: column;
    height: 100vh;
    width: 100vw;
    overflow: auto;
    background-color: #f0f0f0;
    .router-view {
        width: 1200px;
        margin: 0 auto;
    }
}
</style>
