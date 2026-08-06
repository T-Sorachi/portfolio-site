import kumoFooterImg from '../assets/images/kumo3.png'

function Footer() {
  return (
    <footer className="site-footer">
      <img src={kumoFooterImg} alt="" className="site-footer__cloud" />

      <div className="site-footer__socials">
        <div className="site-footer__social">
          <span className="site-footer__facebook-icon" aria-hidden>f</span>
          <span>facebook</span>
        </div>

        <span className="site-footer__divider" aria-hidden />

        <div className="site-footer__social">
          <svg
            className="site-footer__instagram-icon"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" className="site-footer__instagram-dot" />
          </svg>
          <span>Instagram</span>
        </div>
      </div>

      <p className="site-footer__copyright">© Takahashi Sorachi</p>
    </footer>
  )
}

export default Footer
