import { useState } from 'react'

const initialValues = {
  name: '',
  email: '',
  phone1: '',
  phone2: '',
  phone3: '',
  message: '',
}

function ContactPage() {
  const [values, setValues] = useState(initialValues)
  const [step, setStep] = useState('input')
  const [status, setStatus] = useState('idle')

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (status !== 'idle') setStatus('idle')
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (step === 'input') {
      setStatus('idle')
      setStep('confirm')
      return
    }

    const formData = new FormData()
    formData.append('name', values.name)
    formData.append('email', values.email)
    formData.append('message', values.message)

    const phone = [values.phone1, values.phone2, values.phone3]
      .filter(Boolean)
      .join('-')
    if (phone) formData.append('phone', phone)

    setStatus('submitting')

    try {
      const response = await fetch('https://formspree.io/f/mnpaaeyy', {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      })

      if (!response.ok) throw new Error('送信に失敗しました')

      setValues(initialValues)
      setStep('input')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <main className="contact-page">
      <h1 className="contact-page__heading">CONTACT</h1>

      <form
        className="home-contact-form"
        action="https://formspree.io/f/mnpaaeyy"
        method="POST"
        onSubmit={handleSubmit}
      >
        {step === 'input' ? (
          <>
            <label className="home-contact-form__row">
              <span>お名前</span>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </label>

            <label className="home-contact-form__row">
              <span>メールアドレス</span>
              <input
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            <div className="home-contact-form__row">
              <span>電話番号</span>
              <div className="home-contact-form__phone">
                <input type="tel" name="phone1" value={values.phone1} onChange={handleChange} aria-label="電話番号の最初の欄" />
                <i aria-hidden>−</i>
                <input type="tel" name="phone2" value={values.phone2} onChange={handleChange} aria-label="電話番号の中央の欄" />
                <i aria-hidden>−</i>
                <input type="tel" name="phone3" value={values.phone3} onChange={handleChange} aria-label="電話番号の最後の欄" />
              </div>
            </div>

            <label className="home-contact-form__row home-contact-form__row--message">
              <span>お問い合わせ内容</span>
              <textarea name="message" value={values.message} onChange={handleChange} required />
            </label>

            <button type="submit" className="home-contact-form__confirm">
              入力内容を確認する
            </button>
          </>
        ) : (
          <div className="contact-confirm">
            <h2>入力内容の確認</h2>
            <dl className="contact-confirm__list">
              <div><dt>お名前</dt><dd>{values.name}</dd></div>
              <div><dt>メールアドレス</dt><dd>{values.email}</dd></div>
              <div><dt>電話番号</dt><dd>{[values.phone1, values.phone2, values.phone3].filter(Boolean).join('-') || '未入力'}</dd></div>
              <div><dt>お問い合わせ内容</dt><dd>{values.message}</dd></div>
            </dl>

            <div className="contact-confirm__actions">
              <button type="button" onClick={() => { setStep('input'); setStatus('idle') }}>修正する</button>
              <button type="submit" disabled={status === 'submitting'}>
                {status === 'submitting' ? '送信中…' : '送信する'}
              </button>
            </div>
          </div>
        )}

        <p className={`contact-form__status contact-form__status--${status}`} aria-live="polite">
          {status === 'success' && 'お問い合わせを送信しました。'}
          {status === 'error' && '送信できませんでした。時間をおいてもう一度お試しください。'}
        </p>
      </form>
    </main>
  )
}

export default ContactPage
