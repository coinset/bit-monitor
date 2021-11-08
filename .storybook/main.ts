import { join } from 'path'
import preact from '@preact/preset-vite'
import type { StorybookConfig } from '@storybook/core-common'
import Unocss from 'unocss/vite'

const toPath = (path: string): string => join(process.cwd(), path)

const config: StorybookConfig = {
  stories: ['../src/components/**/*.stories.@(ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials'],
  framework: '@storybook/preact',
  core: {
    builder: 'storybook-builder-vite'
  },
  viteFinal: async (config) => {
    config.plugins = [...config.plugins, preact(), Unocss({})]
    config.resolve.dedupe = ['@storybook/client-api']
    return {
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          '@': toPath('src')
        }
      }
    }
  }
}

export default config
