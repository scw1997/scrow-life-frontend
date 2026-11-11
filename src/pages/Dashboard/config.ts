import type { MenuOption } from 'naive-ui/es/menu/src/interface';
import { h } from 'vue';
import {
    HomeOutline,
    ApertureOutline,
    PodiumOutline,
    GameControllerOutline,
    StarOutline,
    VideocamOutline,
    AnalyticsOutline,
    BookOutline,
    WalkOutline
} from '@vicons/ionicons5';
import { NIcon } from 'naive-ui';

const renderIcon = (icon: any) => {
    return () => h(NIcon, null, { default: () => h(icon) });
};
export const navOptions: MenuOption[] = [
    {
        label: '综合',
        key: 'all',
        icon: renderIcon(HomeOutline)
    },
    {
        label: '生活圈',
        key: 'life',
        icon: renderIcon(PodiumOutline),
        children: [
            {
                label: '家庭婚恋区',
                key: 'family'
            },
            {
                label: '人际职场区',
                key: 'career'
            },
            {
                label: '学习教育区',
                key: 'study'
            },
            {
                label: '健康养生区',
                key: 'leisure'
            }
        ]
    },
    {
        label: '娱乐圈',
        key: 'entertainment',
        icon: renderIcon(StarOutline),
        children: [
            {
                label: '明星区',
                key: 'stars'
            },
            {
                label: '影视区',
                key: 'movies'
            },
            {
                label: '音乐区',
                key: 'music'
            }
        ]
    },
    {
        label: '游戏圈',
        key: 'game',
        icon: renderIcon(GameControllerOutline),
        children: [
            {
                label: '综合游戏区',
                key: 'all-games'
            },
            {
                label: '主机游戏区',
                key: 'console-games'
            },
            {
                label: '手机游戏区',
                key: 'mobile-games'
            },
            {
                label: 'PC网游区',
                key: 'pc-games'
            }
        ]
    },
    {
        label: '体育圈',
        key: 'sport',
        icon: renderIcon(ApertureOutline),
        children: [
            {
                label: '综合体育区',
                key: 'all-sports'
            },

            {
                label: '篮球区',
                key: 'basketball'
            },
            {
                label: '足球区',
                key: 'soccer'
            },
            {
                label: '格斗区',
                key: 'fighting'
            },
            {
                label: '健身区',
                key: 'fitness'
            }
        ]
    },
    {
        label: '科技圈',
        key: 'tech',
        icon: renderIcon(VideocamOutline),
        children: [
            {
                label: '综合科技区',
                key: 'tech'
            },
            {
                label: '手机区',
                key: 'mobile'
            },
            {
                label: '电脑区',
                key: 'computer'
            },
            {
                label: '汽车区',
                key: 'car'
            }
        ]
    },
    {
        label: '股票圈',
        key: 'stock',
        icon: renderIcon(AnalyticsOutline)
    },
    {
        label: '旅游圈',
        key: 'travel',
        icon: renderIcon(WalkOutline)
    },
    {
        label: '文学历史圈',
        key: 'history',
        icon: renderIcon(BookOutline)
    }
];
