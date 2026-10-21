<script setup lang="ts">
import { ref } from 'vue';
import type { TreeOptions } from 'naive-ui/es/tree/src/interface';
import { NTree } from 'naive-ui';

const kindBarOptions: TreeOptions = [
    {
        label: '综合',
        key: 'all',
        checkboxDisabled: true
    },
    {
        label: '生活圈',
        key: 'life',
        children: [
            {
                label: '婚恋区',
                key: 'love'
            },
            {
                label: '职场区',
                key: 'career'
            }
        ]
    }
];
</script>

<template>
    <section class="kind-bar">
        <NTree
            block-line
            :data="kindBarOptions"
            :default-expanded-keys="['all']"
            expand-on-click
        ></NTree>
    </section>
</template>

<style scoped lang="less">
.kind-bar {
}
</style>
