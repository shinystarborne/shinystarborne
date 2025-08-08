<template>
    <v-menu>
        <template v-slot:activator="{ props }">
            <v-btn
                v-bind="props"
                variant="outlined"
                size="small"
                class="language-switcher"
            >
                <v-icon start>mdi-translate</v-icon>
                {{ currentLanguageLabel }}
            </v-btn>
        </template>
        <v-list>
            <v-list-item
                v-for="lang in languages"
                :key="lang.code"
                @click="changeLanguage(lang.code)"
                :active="currentLocale === lang.code"
            >
                <v-list-item-title>
                    <span :class="{ 'font-weight-bold': currentLocale === lang.code }">
                        {{ lang.flag }} {{ lang.label }}
                    </span>
                </v-list-item-title>
            </v-list-item>
        </v-list>
    </v-menu>
</template>

<script setup>
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { router } from '@inertiajs/vue3';

const { locale } = useI18n();

const languages = [
    { code: 'en', label: 'English', flag: '🇬🇧' },
    { code: 'ru', label: 'Русский', flag: '🇷🇺' },
    { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

// Use locale.value as the primary source since it updates immediately
const currentLocale = computed(() => locale.value);

const currentLanguageLabel = computed(() => {
    const lang = languages.find(l => l.code === locale.value);
    return lang ? lang.label : 'English';
});

const changeLanguage = (langCode) => {
    // Update local storage
    localStorage.setItem('locale', langCode);
    
    // Update Vue i18n locale immediately (this will update the button)
    locale.value = langCode;
    
    // Make request to server to update session
    router.get(route('locale.set', { locale: langCode }), {}, {
        preserveState: true,
        preserveScroll: true,
        onSuccess: () => {
            // Locale is now updated on the server
            // The button has already changed due to locale.value update above
        }
    });
};
</script>

<style scoped>
.language-switcher {
    text-transform: none;
}
</style>