import { createI18n } from "vue-i18n"
import { windowMessageSendAll } from "../common/window";

export function loadLanguages() {
    //@ts-ignore
    const context = import.meta.globEager("./languages/*.ts");

    const languages: AnyObject = {};

    let langs = Object.keys(context);
    for (let key of langs) {
        if (key === "./index.ts") return;
        let lang = context[key].lang;
        let name = key.replace(/(\.\/languages\/|\.ts)/g, '');
        languages[name] = lang
    }

    return languages
}

export function i18nt(key: string) {
    return i18n.global.t(key);
}

export function i18nLocale() { return i18n.global['locale'] }


export const i18n = createI18n({
    locale: 'zh-cn',
    fallbackLocale: 'zh-cn',
    messages: loadLanguages()
})

//修改當前vue實例的語言
export function setLanguage(locale: string) {
    i18n.global.locale = locale
    window.customize.locale = locale
}

//修改所有vue實例的語言
export function setLanguageAll(locale: string) {
    i18n.global.locale = locale
    window.customize.locale = locale
    windowMessageSendAll('renderer-i18n-language-change', locale)
}