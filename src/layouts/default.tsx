import LeftDrawer from '@/components/app/drawer/left_drawer'
import { Link } from 'preact-router'

type DefaultLayout = {
  children: JSX.Element | JSX.Element[]
}

const Default = ({ children }: DefaultLayout) => {
  return (
    <div className="h-screen">
      <header className="px-2 py-2 shadow border-b border-gray-200">
        <Link className="text-2xl" href="/">
          Bit Monitor
        </Link>
      </header>

      <div className="md:grid md:grid-cols-[240px,1fr]">
        <LeftDrawer className="hidden md:block h-screen shadow bg-gray-100" />

        {children}
      </div>
    </div>
  )
}

export default Default
