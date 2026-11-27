import assert from 'node:assert/strict'
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import test from 'node:test'
import { loadWorks, normalizeWork } from '../src/data/work-content.js'
import { validateContent } from '../scripts/validate-content.mjs'

test('a CMS entry needs no code imports or manual ID to appear first and link to its images', () => {
  const works = loadWorks({
    '../../content/works/1.json': { title: '既存の作品', heroImage: '/media/works/old.jpg', order: 10 },
    '../../content/works/20261127-123456.json': {
      title: ' 新しい活動 ',
      heroImage: '/media/works/new photo.jpg',
      description: '最初の段落\n段落内の改行\n\n次の段落',
      detailImages: ['/media/works/gallery.png'],
    },
  }, '/portfolio-site/')
  assert.equal(works[0].id, '20261127-123456')
  assert.equal(works[0].title, '新しい活動')
  assert.equal(works[0].category, 'Project')
  assert.equal(works[0].heroImage, '/portfolio-site/media/works/new photo.jpg')
  assert.deepEqual(works[0].detailImages, ['/portfolio-site/media/works/gallery.png'])
  assert.deepEqual(works[0].description, ['最初の段落\n段落内の改行', '次の段落'])
  assert.equal(works[1].id, 1)
})

test('editing display order reorders entries and equal ranks put newer additions first', () => {
  const entry = (title, order) => ({ title, order, heroImage: '/media/works/photo.jpg' })
  const works = loadWorks({
    '9.json': entry('既存', 90),
    '20261127-120000.json': entry('新しい方', 0),
    '20261126-120000.json': entry('前日', 0),
    '2.json': entry('優先表示', 5),
  })
  assert.deepEqual(works.map((work) => work.title), ['新しい方', '前日', '優先表示', '既存'])
})

test('relative build paths work under the existing GitHub Pages URL and optional fields may be empty', () => {
  const work = normalizeWork('5.json', { title: '写真だけの作品', heroImage: '/media/works/photo.jpg', description: null, detailImages: null, order: null }, './')
  assert.equal(work.id, 5)
  assert.equal(work.heroImage, './media/works/photo.jpg')
  assert.deepEqual(work.description, [])
  assert.deepEqual(work.detailImages, [])
  assert.equal(work.role, '')
})

test('new photo-and-text files validate and missing photos or invalid fields stop publication', () => {
  const root = mkdtempSync(join(tmpdir(), 'portfolio-content-'))
  try {
    mkdirSync(join(root, 'content/works'), { recursive: true })
    mkdirSync(join(root, 'public/media/works'), { recursive: true })
    writeFileSync(join(root, 'public/media/works/photo.jpg'), 'fixture')
    const file = join(root, 'content/works/new.json')
    const valid = { title: '追加した作品', heroImage: '/media/works/photo.jpg', description: '説明' }
    writeFileSync(file, JSON.stringify(valid))
    assert.deepEqual(validateContent(root).errors, [])
    writeFileSync(file, JSON.stringify({ ...valid, heroImage: '/media/works/missing.jpg' }))
    assert.match(validateContent(root).errors.join('\n'), /写真が見つかりません/)
    writeFileSync(file, JSON.stringify({ ...valid, title: '', detailImages: 'invalid', order: -1 }))
    const errors = validateContent(root).errors.join('\n')
    assert.match(errors, /タイトル/)
    assert.match(errors, /追加の写真/)
    assert.match(errors, /表示順/)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})
