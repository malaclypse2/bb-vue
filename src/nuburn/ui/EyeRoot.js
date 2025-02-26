import { css, html, sleep, Vue, VueUse, timeDiff } from '/bb-vue/lib.js'
import { nuStore, nuShutdown } from '/nuburn/lib/globals.js'
import { termRun } from '/nuburn/lib/term.js'

export default {
  name: 'eye-root',
  template: html`
    <main class="__CMP_NAME__" eye-root>
      <!-- Main window -->
      <bbv-win
        no-pad
        :start-open="false"
        start-width="390px"
        start-height="320px"
        title="🧿 Macros"
      >
        <eye-macros />
        <template #actions>
          <span><strong>Uptime:</strong> {{ uptime }}</span>
        </template>
      </bbv-win>

      <!-- Scripts window -->
      <bbv-win no-pad :start-open="true" start-width="40%" title="📃 Scripts">
        <eye-scripts-list />
      </bbv-win>

      <!-- Player window -->
      <bbv-win no-pad :start-open="false" start-width="40%" start-height="50%" title="✨ Player">
        <bbv-object-display :data="store.player" />
      </bbv-win>

      <!-- Servers window -->
      <bbv-win no-pad :start-open="false" start-width="40%" start-height="50%" title="💽 Servers">
        <bbv-object-display :data="store.srv" />
      </bbv-win>

      <!-- Runner window -->
      <bbv-win
        no-pad
        no-scroll
        :start-open="false"
        start-width="40%"
        start-height="50%"
        title="🏃 Runner"
      >
        <eye-runner-list />
      </bbv-win>

      <!-- Add actions to tray -->
      <teleport to="#app-tray">
        <bbv-button title="Shutdown Eye" @click="doShutdown" small>🛑 Eye</bbv-button>
        <bbv-button title="Reboot Eye" @click="doReboot">💫 Eye</bbv-button>
      </teleport>
    </main>
  `,
  setup() {
    const { inject, computed } = Vue()
    const { useTimestamp } = VueUse()

    // Store
    const store = nuStore()

    // Uptime
    const startTime = Date.now()
    const timestamp = useTimestamp({ interval: 1000 })
    const uptime = computed(() => timeDiff(startTime, timestamp.value))

    // Shutdown
    const appShutdown = inject('appShutdown')
    const doShutdown = () => {
      appShutdown()
      nuShutdown()
    }
    const doReboot = async () => {
      doShutdown()
      await sleep(1000)
      await termRun('run /nuburn/start.js')
    }

    return {
      store,
      uptime,
      doShutdown,
      doReboot,
    }
  },
  scss: css`
    .__CMP_NAME__ {
    }
  `,
}
