import {defineConfig} from 'astro/config';
import starlight from '@astrojs/starlight';
import starlightLinksValidator from '@astrojs/starlight'

// https://astro.build/config
export default defineConfig({
    base: "/",
    redirects: {
        '/': '/zh-cn',
    },
    integrations: [
        starlight({
            title: 'Axum Docs',
            social: {
                github: 'https://github.com/yanlong-li/axum-docs',
            },
            sidebar: [
                {
                    label: 'Start Here',
                    translations: {'zh-CN': '从这里开始'},
                    items: [
                        {
                            label: 'Getting Started',
                            translations: {'zh-CN': '开始使用'},
                            link: '/start/getting-started',
                        },
                        {
                            label: 'Install',
                            translations: {'zh-CN': '安装并运行'},
                            link: '/start/install',
                        },
                        {
                            label: 'Project Structure',
                            translations: {'zh-CN': '项目结构'},
                            link: '/start/structure',
                        },
                        {
                            label: 'Editor setup',
                            translations: {'zh-CN': '编辑器配置'},
                            link: '/start/editor-setup',
                        },
                    ],
                },
                {
                    label: 'Basics',
                    translations: {'zh-CN': '基础教程'},
                    // autogenerate: {directory: 'basics'},
                    items: [
                        {
                            label: 'Routing',
                            translations: {'zh-CN': '路由'},
                            link: '/basics/routing',
                        },
                        {
                            label: 'Handling',
                            translations: {'zh-CN': '处理器'},
                            link: '/basics/handling',
                        },
                        {
                            label: 'Requests',
                            translations: {'zh-CN': '请求'},
                            link: '/basics/requests',
                        },
                        {
                            label: 'Responses',
                            translations: {'zh-CN': '响应'},
                            link: '/basics/responses',
                        },
                        {
                            label: 'State',
                            translations: {'zh-CN': '状态'},
                            link: '/basics/state',
                        },
                        {
                            label: 'Sessions And Cookies',
                            translations: {'zh-CN': 'Session 和 Cookie'},
                            link: '/basics/sessions-cookies',
                        },
                        {
                            label: 'Middlewares',
                            translations: {'zh-CN': '中间件'},
                            link: '/basics/middlewares',
                        },
                        {
                            label: 'Assets',
                            translations: {'zh-CN': '静态资源'},
                            link: '/basics/assets',
                        },
                    ]
                },
                {
                    label: 'Reference',
                    translations: {'zh-CN': '参考'},
                    autogenerate: {directory: 'reference'},
                },
            ],
            // Set English as the default language for this site.
            defaultLocale: 'zh-cn',
            locales: {
                // English docs in `src/content/docs/en/`

                // Simplified Chinese docs in `src/content/docs/zh-cn/`
                'zh-cn': {
                    label: '简体中文',
                    lang: 'zh-CN',
                },
                'zh-tw': {
                    label: '正體中文',
                    lang: 'zh-TW',
                },
                en: {
                    label: 'English',
                },
            },
            plugins: process.env.CHECK_LINKS
                ? [
                    starlightLinksValidator({
                        errorOnFallbackPages: false,
                        errorOnInconsistentLocale: true,
                    }),
                ]
                : [],
        }),
    ],
});
