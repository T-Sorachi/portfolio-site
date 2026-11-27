import { loadWorks } from './work-content.js'

const entries = import.meta.glob('../../content/works/*.json', { eager: true, import: 'default' })

export default loadWorks(entries, import.meta.env.BASE_URL)
