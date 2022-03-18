const EventEmitter = require('events')

const {
  DEFAULT_LANGUAGE,
  GOOGLE_MAP_API_KEY,
  GOOGLE_TAG_MANAGER_KEY,
  RECAPTCHA_SITE_KEY,
  THEME_NAME,
  URL_API,
  URL_BASE,
} = process.env.CONFIG

module.exports = {
  SITE: URL_BASE,
  API_BASE_URL: `${URL_BASE}/wp-json`,
  API_APP_URL: `${URL_API}/api`,
  VIDEO_STORAGE: `${URL_BASE}/storage/videos`,
  API_CACHE_BASE_URL: `${URL_BASE}/api/wp-json`,
  CURRENT_LANG: DEFAULT_LANGUAGE !== '' ? `/${DEFAULT_LANGUAGE}` : '/',
  LANGUAGES: [],
  PATH: '',
  COOKIE_POLICY_NAME: `user-has-accepted-cookies-${THEME_NAME}`,
  API: {
    BASE_URL: '/wp/v2',
    CF7_FEEDBACK: '/contact-form-7/v1/contact-forms',
    CF7_GET: '/gusto/form',
    CF7_LOG: '/custom-logger/v1/log/add',
    // Custom EndPoint
  },
  CONFIG: {
    THEME_NAME,
    LINK_DELAY: 0,
    CUSTOM_TYPE_PREFIX: '_cty_',
    CUSTOM_TAXONOMY_PREFIX: '_cta_',
    RECAPTCHA_SITE_KEY,
    GOOGLE_MAP_API_KEY,
    GOOGLE_TAG_MANAGER_KEY,
  },
  webgl: {
    PERFORMANCE_DETECT: true,
    GPU_BLACKLIST: ['radeon hd 6970m', 'radeon hd 6770m', 'radeon hd 6490m', 'radeon hd 6630m', 'radeon hd 6750m', 'radeon hd 5750', 'radeon hd 5670', 'radeon hd 4850', 'radeon hd 4870', 'radeon hd 4670', 'geforce 9400m', 'geforce 320m', 'geforce 330m', 'geforce gt 130', 'geforce gt 120', 'geforce gtx 285', 'geforce 8600', 'geforce 9600m', 'geforce 9400m', 'geforce 8800 gs', 'geforce 8800 gt', 'quadro fx 5', 'quadro fx 4', 'radeon hd 2600', 'radeon hd 2400', 'radeon hd 2600', 'radeon r9 200', 'mali-4', 'mali-3', 'mali-2'],
  },
  EMITTER: new EventEmitter(),
  EVENTS: {
    DATALAYER: {
      FORM_ERROR: 'form-error',
    },
  },
  AUTH: {
    username: 'gusto',
    password: 'gusto2021',
  },
}
