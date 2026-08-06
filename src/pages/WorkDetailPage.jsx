import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import works from '../data/works'
import arrowLeftImg from '../assets/images/yajirushi_left.svg'
import arrowRightImg from '../assets/images/yajirushi_right.svg'

function WorkDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const transitionTimer = useRef(null)
  const previousId = useRef(id)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const work = works.find((item) => String(item.id) === id)

  useEffect(() => {
    if (previousId.current === id) return undefined
    previousId.current = id
    if (!isTransitioning) return undefined

    const revealTimer = window.setTimeout(() => {
      setIsTransitioning(false)
    }, 120)

    return () => window.clearTimeout(revealTimer)
  }, [id, isTransitioning])

  useEffect(() => () => window.clearTimeout(transitionTimer.current), [])

  if (!work) {
    return (
      <main className="work-detail">
        <div className="work-detail__inner">
          <h1>作品が見つかりません</h1>
          <Link to="/works">WORKSへ戻る</Link>
        </div>
      </main>
    )
  }

  const metaItems = [
    ['期間', work.period],
    ['担当', work.role],
    ['制作ツール', work.tool],
    ['場所', work.location],
    ['プロジェクト規模', work.projectScale],
    ['授業名', work.className],
  ].filter(([, value]) => value)
  const currentIndex = works.findIndex((item) => item.id === work.id)
  const previousWork = works[currentIndex - 1]
  const nextWork = works[currentIndex + 1]
  const moveToWork = (event, workId) => {
    event.preventDefault()
    if (isTransitioning) return

    setIsTransitioning(true)
    transitionTimer.current = window.setTimeout(() => {
      navigate(`/works/${workId}`)
    }, 800)
  }

  return (
    <main className="work-detail">
      <div
        className={`work-detail__transition${isTransitioning ? ' is-active' : ''}`}
        aria-hidden="true"
      />
      <div className="work-detail__inner" key={id}>
        <img
          src={work.heroImage}
          alt={`${work.title}のメイン画像`}
          className="work-detail__hero"
        />

        <div className="work-detail__rule" />

        <h1>{work.title}</h1>

        <div className="work-detail__meta">
          <p>
            {metaItems.map(([label, value]) => (
              <span key={label}>{label}：{value}</span>
            ))}
          </p>
        </div>

        {work.description.length > 0 && (
          <div className="work-detail__description">
            {work.description.map((paragraph, index) => (
              <p key={`${work.id}-description-${index}`}>{paragraph}</p>
            ))}
          </div>
        )}

        {work.detailImages.length > 0 && (
          <div className={`work-detail__images${work.id === 1 ? ' work-detail__images--work-1' : ''}${work.id === 7 ? ' work-detail__images--two-column' : ''}${work.id === 9 ? ' work-detail__images--work-9' : ''}`}>
            {work.detailImages.map((image, index) => (
              <img
                src={image}
                alt={`${work.title} 詳細画像${index + 1}`}
                className={`work-detail__image--${index + 1}`}
                key={image}
              />
            ))}
          </div>
        )}

        <nav className="work-detail__navigation" aria-label="作品ページの移動">
          {previousWork ? (
            <Link
              to={`/works/${previousWork.id}`}
              className="work-detail__pager work-detail__pager--previous"
              aria-label={`前の作品「${previousWork.title}」へ`}
              onClick={(event) => moveToWork(event, previousWork.id)}
            >
              <img src={arrowLeftImg} alt="" className="work-detail__pager-arrow" />
              <span>Prev</span>
            </Link>
          ) : <span />}

          <Link to="/works" className="home-works-view-all work-detail__list-link">
            一覧に戻る
          </Link>

          {nextWork ? (
            <Link
              to={`/works/${nextWork.id}`}
              className="work-detail__pager work-detail__pager--next"
              aria-label={`次の作品「${nextWork.title}」へ`}
              onClick={(event) => moveToWork(event, nextWork.id)}
            >
              <img src={arrowRightImg} alt="" className="work-detail__pager-arrow" />
              <span>Next</span>
            </Link>
          ) : <span />}
        </nav>
      </div>
    </main>
  )
}

export default WorkDetailPage
