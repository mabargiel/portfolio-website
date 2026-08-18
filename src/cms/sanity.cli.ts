import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'afeko6yc',
    dataset: 'production'
  },
  // Claims https://mbargiel-portfolio.sanity.studio. The name is global across
  // Sanity and is released if it changes, so it is recorded here rather than
  // answered at a prompt.
  studioHost: 'mbargiel-portfolio',
  deployment: {
    /**
     * Enable auto-updates for studios.
     * Learn more at https://www.sanity.io/docs/studio/latest-version-of-sanity#k47faf43faf56
     */
    autoUpdates: true,
  }
})
