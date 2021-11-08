import TradeHistory from '@/components/trade_history/trade_history'
import type { TradeHistoryProps } from '@/components/trade_history/trade_history'

import type { Meta, Story } from '@storybook/preact'

const Template: Story<TradeHistoryProps> = (args) => <TradeHistory {...args} />

export const Demo = Template.bind({})

export default {
  title: 'TradeHistory',
  component: TradeHistory,
  args: {
    data: [
      {
        price: 2000,
        amount: 0.2,
        date: new Date('2021/1/1 12:00:01'),
        side: 'sell'
      },
      {
        price: 1000,
        amount: 0.1,
        date: new Date('2021/1/1 12:00:00'),
        side: 'buy'
      }
    ]
  }
} as Meta<typeof TradeHistory>
