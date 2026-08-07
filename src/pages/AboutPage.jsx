import aboutImg from '../assets/images/about.jpg'
import logoImg from '../assets/images/logo.png'

function AboutPage() {
  return (
    <main className="about-page">
      <h1 className="about-page__heading">ABOUT</h1>

      <section className="about-page__inner">
        <div className="about-page__image">
          <img src={aboutImg} alt="髙橋空知のプロフィール写真" decoding="async" />
        </div>

        <div className="about-page__content">
          <div className="about-page__name-line">
            <p className="about-page__name">髙橋 空知</p>
            <p className="about-page__name-roman">
              TAKAHASHI{'\u00A0\u00A0'}SORACHI
            </p>
          </div>

          <p className="about-page__description">
            2008年生まれ。17歳。長野県伊那市出身。
            <br className="about-page__description-break" />
            神山まるごと高専二期生として、現在は徳島県神山町で学んでいます。
            <br className="about-page__description-break" />
            これまでは公立の小学校・中学校で過ごし、
            <br className="about-page__description-break" />
            高専という新しい環境に飛び込むことを選びました。
            <br className="about-page__description-break" />
            デザイン・テクノロジー・起業家精神を軸に、日々さまざまな
            <br className="about-page__description-break" />
            プロジェクトに取り組んでいます。
          </p>

        </div>
      </section>

      <section className="about-page__vision">
        <img
          src={logoImg}
          alt=""
          className="about-page__vision-logo"
          loading="lazy"
          decoding="async"
        />

        <p className="about-page__vision-text">
          ものづくりだけではない。
          <br className="about-page__vision-break" />
          人・技術・物語をつないで大きなコトを生み出せる人になりたいと考えています。
          <br className="about-page__vision-break" />
          ひとつのプロジェクトが動き出す瞬間、その背後には必ず“つなぐ力”がある。
          <br className="about-page__vision-break" />
          そのつなぐ力をこれから育てていきます。
          <br className="about-page__vision-break" />
          まだ見たことのない空を、自分のつくるコトを通して少しずつひらいていく。
          <br className="about-page__vision-break" />
          そんな未来を、自分を、目指して、これからも学び、挑戦を続けていきます。
        </p>
      </section>
    </main>
  )
}

export default AboutPage
