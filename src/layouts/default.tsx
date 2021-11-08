import { Link } from 'preact-router'
import { useBoolean } from 'react-hookable'
import clsx from 'clsx'

import LeftDrawer from '@/components/app/drawer'
import { ContextIsMinify } from '@/layouts/contexts'

import type { ComponentChildren } from 'preact'

type DefaultLayout = {
  children: ComponentChildren
}

const Default = ({ children }: DefaultLayout) => {
  const [state, updater] = useBoolean()
  return (
    <ContextIsMinify.Provider value={[state, updater]}>
      <div class="relative">
        <header class="fixed flex items-center border-b border-gray-200 bg-white inset-x-0 p-2 top-0 h-[54px]">
          <Link className="text-2xl" href="/">
            Bit Monitor
          </Link>
        </header>

        <LeftDrawer className={clsx(state ? 'md:w-12' : 'md:w-300px')} />

        <div
          class={clsx(
            'mt-[54px] h-full transition duration-300',
            state ? 'md:ml-12' : 'md:ml-300px'
          )}
        >
          {children}
        </div>
      </div>
    </ContextIsMinify.Provider>
  )
}

export default Default
