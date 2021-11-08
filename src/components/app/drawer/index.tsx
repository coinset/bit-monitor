import clsx from 'clsx'
import { Link } from 'preact-router'

import Svg from '@/assets/svgs/markets/coincheck.svg'
import { ContextIsMinify } from '@/layouts/contexts'
import { useContext, useRef } from 'preact/hooks'
import { useTransitionEffect } from 'react-hookable'

type Props = {
  className?: string
}
const Index = ({ className }: Props) => {
  const [state, { toggle }] = useContext(ContextIsMinify)
  const ref = useRef<HTMLSpanElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  useTransitionEffect(
    {
      show: !state,
      target: ref,
      enterFrom: 'opacity-0',
      enter: 'transition duration-300',
      leave: 'transition duration-200',
      leaveTo: 'opacity-0'
    },
    []
  )

  useTransitionEffect(
    {
      show: !state,
      target: titleRef,
      enterFrom: 'opacity-0',
      enter: 'transition duration-300',
      leave: 'transition duration-200',
      leaveTo: 'opacity-0',
      keepLayout: true
    },
    []
  )
  return (
    <section
      class={clsx(
        className,
        'fixed mt-[54px] whitespace-nowrap transition duration-500 border-r border-gray-200 top-0 bottom-0 overflow-y-scroll hidden md:grid grid-rows-1'
      )}
    >
      <nav>
        <h2 ref={titleRef} class="text-xs font-medium p-2 pl-4 text-gray-400">
          MARKET
        </h2>
        <Link
          class="space-x-4 p-2 block transition duration-300 hover:bg-gray-100"
          activeClassName="bg-amber-200"
          href="/coincheck"
        >
          <Svg className="w-8 h-8 inline" />
          <span ref={ref} class="text-xl">
            Coincheck
          </span>
        </Link>
      </nav>
      <div class={clsx('flex p-2 justify-start')}>
        <button class="w-8 h-8 border rounded-md" onClick={toggle}>
          btn
        </button>
      </div>
    </section>
  )
}

export default Index
