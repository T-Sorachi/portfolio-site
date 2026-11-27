import { existsSync, readdirSync, readFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

export function validateContent(root) {
  const directory = resolve(root, 'content/works')
  const files = readdirSync(directory).filter((file) => file.endsWith('.json'))
  const errors = []
  const textFields = ['description', 'category', 'period', 'role', 'tool', 'location', 'projectScale', 'className']

  for (const file of files) {
    let work
    try {
      work = JSON.parse(readFileSync(resolve(directory, file), 'utf8'))
      if (!work || Array.isArray(work) || typeof work !== 'object') throw new Error('作品データはオブジェクトにしてください')
    } catch (error) {
      errors.push(`${file}: ${error.message}`)
      continue
    }
    if (typeof work.title !== 'string' || !work.title.trim()) errors.push(`${file}: タイトルを入力してください`)
    for (const field of textFields) {
      if (work[field] != null && typeof work[field] !== 'string') errors.push(`${file}: ${field}は文章で入力してください`)
    }
    if (work.order != null && work.order !== '' && (typeof work.order !== 'number' || !Number.isFinite(work.order) || work.order < 0)) {
      errors.push(`${file}: 表示順は0以上の数字にしてください`)
    }
    if (work.detailImages != null && !Array.isArray(work.detailImages)) {
      errors.push(`${file}: 追加の写真はリストにしてください`)
    }
    const images = [work.heroImage, ...(Array.isArray(work.detailImages) ? work.detailImages : [])]
    for (const image of images) {
      if (typeof image !== 'string' || !image.startsWith('/media/works/') || image.split('/').includes('..')) {
        errors.push(`${file}: メイン写真と追加の写真は編集画面から選択してください`)
      } else if (!existsSync(resolve(root, 'public', image.slice(1)))) {
        errors.push(`${file}: 写真が見つかりません: ${image}`)
      }
    }
  }
  return { files, errors }
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
  const { files, errors } = validateContent(root)
  if (errors.length) {
    console.error(errors.join('\n'))
    process.exitCode = 1
  } else {
    console.log(`作品データ${files.length}件と写真の参照を確認しました。`)
  }
}
