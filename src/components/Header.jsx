import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    if (!isMenuOpen) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setIsMenuOpen(false)
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  const handleLogoClick = (event) => {
    event.preventDefault()
    setIsMenuOpen(false)
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className={`header${isMenuOpen ? ' header--menu-open' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="header__logo" onClick={handleLogoClick}>
          TAKAHASHI
          <br />
          SORACHI
        </Link>

        <button
          type="button"
          className="header__menu-button"
          aria-label={isMenuOpen ? 'メニューを閉じる' : 'メニューを開く'}
          aria-expanded={isMenuOpen}
          aria-controls="site-navigation"
          onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className="header__nav" id="site-navigation">
          <Link to="/about" onClick={closeMenu}>ABOUT</Link>
          <Link to="/works" onClick={closeMenu}>WORKS</Link>
          <Link to="/contact" onClick={closeMenu}>CONTACT</Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
