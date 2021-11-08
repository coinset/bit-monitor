import clsx from 'clsx'
import { Link } from 'preact-router/match'

type LeftDrawerProps = {
  className?: string
}

const LeftDrawer = ({ className }: LeftDrawerProps) => {
  return (
    <nav className={clsx(className)}>
      <h2 className="text-gray-400 p-1 text-xs pl-4">MARKET</h2>
      <div>
        <Link
          activeClassName="bg-purple-300"
          className="block p-2 hover:bg-purple-200 transition-colors duration-300"
          href="/coincheck"
        >
          Coincheck
        </Link>
      </div>
    </nav>
  )
}

export default LeftDrawer
