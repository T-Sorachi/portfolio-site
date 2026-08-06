import { useState } from 'react'
import { Link } from 'react-router-dom'
import works from '../data/works'

const filters = ['All', 'Project', 'Design']

const matchesFilter = (work, filter) => {
  if (filter === 'All') return true
  if (filter === 'Project') return work.category.toLowerCase() === 'project'
  return work.category.toLowerCase().includes('design')
}

function WorksPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const filteredWorks = works.filter((work) => matchesFilter(work, activeFilter))

  return (
    <main className="works-page">
      <section className="works-page__inner">
        <div className="works-page__heading">
          <h1>WORKS</h1>
        </div>

        <div className="works-filter" aria-label="作品の分類">
          {filters.map((filter) => (
            <button
              type="button"
              className={`works-filter__button${activeFilter === filter ? ' is-active' : ''}`}
              aria-pressed={activeFilter === filter}
              onClick={() => setActiveFilter(filter)}
              key={filter}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="works-grid">
          {filteredWorks.map((work) => (
            <Link
              to={`/works/${work.id}`}
              className="work-card work-card--works"
              key={work.id}
            >
              <article className="home-work">
                <img
                  src={work.heroImage}
                  alt={`${work.title}の作品画像`}
                  className="home-work__image"
                />

                <div className="home-work__details">
                  <div className="home-work__info">
                    <h2>{work.title}</h2>
                    <p>{work.category}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}

export default WorksPage
