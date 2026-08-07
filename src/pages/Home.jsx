import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import works from '../data/works'
import worksCircleImg from '../assets/images/works-circle.png'
import circleBlackImg from '../assets/images/circle-black.png'
import kumoImg from '../assets/images/kumo2.png'
import ContactForm from '../components/ContactForm'

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
                  loading="lazy"
                  decoding="async"
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

        <ContactForm />
      </section>
    </main>
  )
}

export default Home
