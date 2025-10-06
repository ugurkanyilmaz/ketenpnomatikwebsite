import { Link, useLocation } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'
import { useEffect } from 'react'

interface ScrollToTopLinkProps extends LinkProps {
  children: React.ReactNode
}

export function ScrollToTopLink({ to, children, ...props }: ScrollToTopLinkProps) {
  const handleClick = () => {
    // Immediate scroll to top without smooth behavior to reset animations
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }, 50)
  }

  return (
    <Link to={to} {...props} onClick={handleClick}>
      {children}
    </Link>
  )
}

// Hook to scroll to top on route change
export function useScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
}