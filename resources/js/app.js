import '../css/app.css';
import '../css/cosmic-animations.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createApp, h } from 'vue';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import PrimeVue from 'primevue/config';
import Cosmic from './themes/cosmic';
import 'primeicons/primeicons.css';
import { initializeTheme } from './composables/useTheme';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import vuetify from './plugins/vuetify';
import i18n from './i18n';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        ),
    setup({ el, App, props, plugin }) {
        // Initialize theme before mounting
        initializeTheme();
        
        // Set i18n locale from server
        if (props.initialPage.props.locale) {
            i18n.global.locale.value = props.initialPage.props.locale;
        }
        
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(i18n)
            .use(PrimeVue, {
                theme: {
                    preset: Cosmic
                }
            })
            .use(ToastService)
            .use(vuetify)
            .directive('tooltip', Tooltip)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
