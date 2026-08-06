import { Link } from 'react-router-dom'
import heroImg from '../assets/images/hero.jpg'
import copyImg from '../assets/images/copy.png'
import halfCirclesImg from '../assets/images/halfcircles.png'
import halfCircleAboutImg from '../assets/images/halfcircle-about.png'

function Hero() {
  return (
    <section className="hero hero--full">
      <div className="hero__frame">
        <div className="hero__media">
          <img
            src={heroImg}
            alt="髙橋空知のプロフィール写真"
            className="hero__image--full"
          />

          <div className="hero__overlay" aria-hidden>
            <img src={copyImg} alt="" className="hero__copy-image" />
          </div>
        </div>

        <img
          src={halfCirclesImg}
          alt="装飾的な半円形の背景"
          className="hero__half-circles"
        />

        <div className="hero__about">
          <div className="hero__about-left">
            <p className="hero__name-small">TAKAHASHI SORACHI</p>
            <h2 className="hero__name-large">髙橋 空知</h2>
          </div>

          <div className="hero__about-right">
            <p className="hero__about-copy">
              水が寄り合って、やがて大きな雲になっていく。
              <br />
              そんな大きなコトを生み出すための、
              <br />
              つなぐ力でありたい。
              <br />
              そして、大きな雲をつくれたとき、
              <br />
              私はまたひとつ 
              <span className="hero__about-emphasis"> 空 </span>を
              <span className="hero__about-emphasis"> 知 </span>る。
            </p>

            <Link to="/about" className="hero__about-action">
              <span>more about</span>
              <img
                src={halfCircleAboutImg}
                alt="more about icon"
                className="hero__about-icon"
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
