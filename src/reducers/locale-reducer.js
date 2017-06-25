import { ENGLISH_TRANSLATION } from './messages/en';
import { FRENCH_TRANSLATION } from './messages/fr';
import { CHINESE_TRANSLATION } from './messages/zh';

const initialState = {
  lang: ENGLISH_TRANSLATION.lang,
  messages: ENGLISH_TRANSLATION.messages
};
export const localeReducer = (state = initialState, action) => {

  switch (action.type) {
    case 'LOCALE_SELECTED':
    switch (action.locale) {
      case 'fr':
        window.localStorage.setItem('langpersist', JSON.stringify(FRENCH_TRANSLATION.lang));
        window.localStorage.setItem('messagespersist', JSON.stringify(FRENCH_TRANSLATION.messages));
        return { initialState, lang: FRENCH_TRANSLATION.lang, messages: FRENCH_TRANSLATION.messages };
      case 'zh':
        window.localStorage.setItem('langpersist', JSON.stringify(CHINESE_TRANSLATION.lang));
        window.localStorage.setItem('messagespersist', JSON.stringify(CHINESE_TRANSLATION.messages));
        return { initialState, lang: CHINESE_TRANSLATION.lang, messages: CHINESE_TRANSLATION.messages };
      default:
        window.localStorage.setItem('langpersist', JSON.stringify(ENGLISH_TRANSLATION.lang));
        window.localStorage.setItem('messagespersist', JSON.stringify(ENGLISH_TRANSLATION.messages));
        return { initialState, lang: ENGLISH_TRANSLATION.lang, messages: ENGLISH_TRANSLATION.messages };
    }
    default:
      if (window.localStorage.getItem('langpersist') === null) {
        window.localStorage.setItem('langpersist', JSON.stringify(ENGLISH_TRANSLATION.lang));
        window.localStorage.setItem('messagespersist', JSON.stringify(ENGLISH_TRANSLATION.messages));
        return state;
      }else {
          var lang = window.localStorage.getItem('langpersist');
          //var messages = window.localStorage.getItem('messagespersist');
          lang = JSON.parse(lang);
          //messages = JSON.parse(messages);
          if (lang === ENGLISH_TRANSLATION.lang)
            return { initialState, lang: ENGLISH_TRANSLATION.lang, messages: ENGLISH_TRANSLATION.messages };
          else if (lang === CHINESE_TRANSLATION.lang)
              return { initialState, lang: CHINESE_TRANSLATION.lang, messages: CHINESE_TRANSLATION.messages };
          else if(lang === FRENCH_TRANSLATION.lang)
                return { initialState, lang: FRENCH_TRANSLATION.lang, messages: FRENCH_TRANSLATION.messages };

      }
  }
};
