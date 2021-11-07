import clsx from 'clsx'
import { Link } from 'preact-router/match'

type LeftDrawerProps = {
  className?: string
}

const LeftDrawer = ({ className }: LeftDrawerProps) => {
  return (
    <nav className={clsx(className, 'p-2')}>
      <h2 className="text-gray-400">Market</h2>
      <Link href="/coincheck">coincheck</Link>
    </nav>
  )
}

export default LeftDrawer
