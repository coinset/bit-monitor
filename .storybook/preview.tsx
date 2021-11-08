import type { Parameters } from '@storybook/addons'
import 'uno.css'
import '@unocss/reset/tailwind.css'

export const parameters: Parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
}
