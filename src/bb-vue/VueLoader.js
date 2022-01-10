import { getGlobal, Keys, win } from '/bb-vue/lib.js'

export default class VueLoader {
  /**
   * Retrieve a cached or freshly imported reference to the Vue module.
   * @returns {Promise<Vue>} Vue constructor
   */
  static async Get() {
    let module = getGlobal(Keys.vueModuleKey)
    if (module) return module

    module = await import('https://cdn.jsdelivr.net/npm/vue@3.2.26/dist/vue.esm-browser.js')

    win[Keys.vueModuleKey] = module

    return module
  }
}
