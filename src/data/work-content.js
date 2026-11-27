const optionalTextFields = ['period', 'role', 'tool', 'location', 'projectScale', 'className']

export function resolveWorkImage(path, baseUrl = '/') {
  if (typeof path !== 'string' || !path) return ''
  return `${baseUrl.replace(/\/?$/, '/')}${path.replace(/^\/+/, '')}`
}

export function normalizeWork(path, content, baseUrl = '/') {
  const slug = path.split('/').pop().replace(/\.json$/, '')
  const numericId = Number(slug)
  const id = Number.isSafeInteger(numericId) && String(numericId) === slug ? numericId : slug
  const description = typeof content.description === 'string' ? content.description : ''
  const order = Number(content.order)

  return {
    ...Object.fromEntries(optionalTextFields.map((field) => [field, content[field] || ''])),
    id,
    title: content.title.trim(),
    category: content.category || 'Project',
    order: Number.isFinite(order) ? order : 0,
    heroImage: resolveWorkImage(content.heroImage, baseUrl),
    description: description.split(/\n\s*\n/).filter((paragraph) => paragraph.trim()),
    detailImages: (content.detailImages || []).map((image) => resolveWorkImage(image, baseUrl)),
  }
}

export function loadWorks(entries, baseUrl = '/') {
  return Object.entries(entries)
    .map(([path, content]) => normalizeWork(path, content, baseUrl))
    .sort((a, b) => a.order - b.order || String(b.id).localeCompare(String(a.id)))
}
