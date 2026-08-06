import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import works from '../data/works'
import worksCircleImg from '../assets/images/works-circle.png'
import circleBlackImg from '../assets/images/circle-black.png'
import kumoImg from '../assets/images/kumo2.png'

const formatCategory = (category) =>
  category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()

function Home() {
  return (
    <main className="home-page">
      <Hero />

      <section className="home-section home-section--works">
        <div className="home-works-heading">
          <img src={worksCircleImg} alt="" className="home-works-heading__image" />
          <h2>WORKS</h2>
        </div>

        <div className="home-works-grid">
          {works.slice(0, 3).map((work) => (
            <Link to={`/works/${work.id}`} className="work-card work-card--home" key={work.id}>
              <article className="home-work">
                <img
                  src={work.heroImage}
                  alt={`${work.title}の作品画像`}
                  className="home-work__image"
                />

                <div className="home-work__details">
                  <div className="home-work__info">
                    <h2>{work.title}</h2>
                    <p>{formatCategory(work.category)}</p>
                  </div>

                  <div className="home-work__more">
                    <span>more</span>
                    <img src={circleBlackImg} alt="" />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <Link to="/works" className="home-works-view-all">
          view all
        </Link>
      </section>

      <section className="home-section home-section--contact">
        <div className="home-contact-heading">
          <h2>CONTACT</h2>
          <img src={kumoImg} alt="" />
        </div>

        <form className="home-contact-form">
          <label className="home-contact-form__row">
            <span>お名前</span>
            <input type="text" name="name" autoComplete="name" />
          </label>

          <label className="home-contact-form__row">
            <span>メールアドレス</span>
            <input type="email" name="email" autoComplete="email" />
          </label>

          <div className="home-contact-form__row">
            <span>電話番号</span>
            <div className="home-contact-form__phone">
              <input type="tel" name="phone-1" aria-label="電話番号の最初の欄" />
              <i aria-hidden>−</i>
              <input type="tel" name="phone-2" aria-label="電話番号の中央の欄" />
              <i aria-hidden>−</i>
              <input type="tel" name="phone-3" aria-label="電話番号の最後の欄" />
            </div>
          </div>

          <label className="home-contact-form__row home-contact-form__row--message">
            <span>お問い合わせ内容</span>
            <textarea name="message" />
          </label>

          <button type="button" className="home-contact-form__confirm">
            入力内容を確認する
          </button>
        </form>
      </section>
    </main>
  )
}

export default Home
