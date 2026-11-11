<script setup lang="ts">
import { NMenu, NTabs, NTabPane, NSkeleton } from 'naive-ui';
import { navOptions } from '@/pages/Dashboard/config.ts';
import { ref, watch, watchEffect } from 'vue';
import { useRouter, useRoute } from 'vue-router';
const router = useRouter();
const route = useRoute();
const navValue = ref<string>('all');
const dataList = ref<any[]>([]);
const loading = ref<boolean>(false);
const tab = ref<'recommend' | 'latest' | 'follow'>('recommend');
const handleUpdateValue = (value: string) => {
    navValue.value = value;
    router.push({ name: route.name, query: { ...route.query, nav: value } });
};

watch(
    () => route.query,
    () => {
        // navValue.value = route.query.nav as string;
    }
);
</script>

<template>
    <div class="dashboard">
        <section class="nav-bar">
            <NMenu :options="navOptions" :value="navValue" @update:value="handleUpdateValue" />
        </section>
        <section class="list-bar">
            <n-tabs type="line" :value="tab" size="large" @update:value="(value) => (tab = value)">
                <n-tab-pane name="recommend" tab="推荐">
                    <template v-if="tab === 'recommend' && loading">
                        <n-skeleton text :repeat="3" />
                    </template>
                    <template v-else-if="tab === 'recommend' && dataList.length === 0">
                        暂无数据
                    </template>
                    <template v-else>
                        <div v-for="item in dataList" :key="item.id">
                            {{ item.title }}
                        </div>
                    </template>
                </n-tab-pane>
                <n-tab-pane name="latest" tab="最新">Hey Jude</n-tab-pane>
                <n-tab-pane name="follow" tab="关注">七里香</n-tab-pane>
            </n-tabs>
        </section>
    </div>
</template>

<style scoped lang="less">
.dashboard {
    display: flex;
    padding: 20px 20px 0 20px;
    height: 100%;
}
.nav-bar {
    flex: 0 0 200px;
    background-color: #fff;
    border-radius: 10px;
    height: max-content;
    max-height: calc(100% - 20px);
    overflow: auto;
}
.list-bar {
    flex: auto;
    padding: 0 20px 20px 20px;
    background-color: #fff;
    border-radius: 10px;
    margin-left: 20px;
    height: max-content;
}
</style>
