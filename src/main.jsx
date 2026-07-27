import React, { Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const HeroScene = lazy(() => import('./HeroScene.jsx'))
const courses = [
  ['01', '聽懂奶泡', '從蒸氣聲與流動感，認識綿密奶泡的關鍵。', '聲音練習'],
  ['02', '畫出第一杯', '跟著節奏練習注流、擺動與收尾。', '拉花基礎'],
  ['03', '看懂你的杯面', '用照片看見下一杯最值得修正的地方。', '圖片回饋'],
]

function App() {
  const [reduceMotion, setReduceMotion] = useState(false)
  const [mode, setMode] = useState('audio')
  const [audioName, setAudioName] = useState('')
  const [preview, setPreview] = useState('')
  const [result, setResult] = useState('')
  const [toast, setToast] = useState('')
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduceMotion(media.matches)
    update(); media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])
  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 2800)
    return () => window.clearTimeout(timer)
  }, [toast])
  const selectCourse = (title) => {
    setToast(`已選擇「${title}」，從下方開始體驗。`)
    document.querySelector('#experience')?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' })
  }
  const runDemo = () => {
    if (mode === 'audio' && !audioName) return setToast('請先選擇一段蒸奶音檔。')
    if (mode === 'image' && !preview) return setToast('請先選擇一張拉花照片。')
    setResult(mode === 'audio'
      ? '聲音後段偏尖銳。下一杯試著讓蒸氣嘴更貼近液面，先追求低沉、連續的紙張聲。'
      : '中心圖案略偏右。下一杯先把杯口與注流中心對齊，再縮短收尾時的拉線距離。')
  }
  return <main className="page-shell">
    <a className="skip-link" href="#content">跳至主要內容</a>
    <nav className="nav" aria-label="主要導覽">
      <a className="brand" href="#top"><span className="brand-dot" aria-hidden="true" />Latte Sense</a>
      <div className="nav-links"><a href="#how-it-works">學習方式</a><a href="#course">課程內容</a></div>
      <a className="nav-cta" href="#experience">立即體驗</a>
    </nav>
    <div id="content">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero-copy"><p className="eyebrow">AI LATTE ART COACH</p><h1 id="hero-title">聽懂奶泡，<br /><em>看懂下一杯。</em></h1><p className="description">從蒸氣聲到杯面紋路，AI 陪你把每一次練習變成清楚的修正方向，讓拉花從第一杯就更有把握。</p><div className="actions"><a className="cta" href="#experience">開始體驗 <span aria-hidden="true">↗</span></a><a className="text-link" href="#how-it-works">看看怎麼運作</a></div><p className="trust"><span aria-hidden="true">◌</span> 為拉花初學者設計的聲音與畫面練習流程</p></div>
        <div className="visual" aria-label="旋轉中的 AI 拉花咖啡 3D 視覺">{reduceMotion ? <div className="fallback-cup" aria-hidden="true">☕</div> : <Suspense fallback={<div className="fallback-cup" aria-hidden="true">☕</div>}><HeroScene /></Suspense>}<div className="sound-label"><i aria-hidden="true" /> AI 聽音辨識</div><div className="visual-caption">MILK · IMAGE · FEEDBACK</div></div>
      </section>
      <section className="section process" id="how-it-works" aria-labelledby="process-title"><div className="section-intro"><p className="eyebrow">PRACTICE LOOP</p><h2 id="process-title">一杯一杯，找到手感。</h2></div><ol className="process-grid"><li><span>01</span><h3>錄下蒸奶聲</h3><p>把一次練習留下來，不再只憑感覺回想。</p></li><li><span>02</span><h3>拍下杯面</h3><p>用照片看見圖案、位置與奶泡質地的線索。</p></li><li><span>03</span><h3>練下一杯</h3><p>帶著一個明確的小調整，再回到吧台練習。</p></li></ol></section>
      <section className="section courses" id="course" aria-labelledby="course-title"><div className="section-intro course-heading"><div><p className="eyebrow">STARTER COURSE</p><h2 id="course-title">從第一次蒸奶開始。</h2></div><p>不需要先畫出完美愛心。先理解奶泡正在發生什麼，再讓每一杯都有進步的理由。</p></div><div className="course-grid">{courses.map(([number, title, copy, tag]) => <article className="course-card" key={number}><p className="course-tag">{tag}</p><p className="course-number">{number}</p><h3>{title}</h3><p>{copy}</p><button type="button" onClick={() => selectCourse(title)}>從這裡開始 <span aria-hidden="true">→</span></button></article>)}</div></section>
      <section className="section experience" id="experience" aria-labelledby="experience-title"><div className="experience-panel"><div className="experience-copy"><p className="eyebrow">TRY THE COACH</p><h2 id="experience-title">先試一次 AI 教練。</h2><p>這是互動示範版：上傳檔案後可查看回饋格式。正式版串接帳號、雲端儲存與 AI 分析後，會保留你的練習紀錄。</p><p className="small-note">{mode === 'audio' ? '上傳 5–20 秒蒸奶音檔，示範會整理你下一步該聽什麼。' : '上傳拉花照片，示範會標示下一杯可優先修正的方向。'}</p></div><div className="coach-card"><div className="tabs" role="tablist" aria-label="選擇分析類型"><button type="button" role="tab" aria-selected={mode === 'audio'} className={mode === 'audio' ? 'active' : ''} onClick={() => { setMode('audio'); setResult('') }}>聽音分析</button><button type="button" role="tab" aria-selected={mode === 'image'} className={mode === 'image' ? 'active' : ''} onClick={() => { setMode('image'); setResult('') }}>圖片分析</button></div>{mode === 'audio' ? <div className="upload-area"><label htmlFor="audio-file"><span aria-hidden="true">⌁</span> 選擇蒸奶音檔<input id="audio-file" name="audio-file" type="file" accept="audio/*" onChange={(event) => { setAudioName(event.target.files?.[0]?.name || ''); setResult('') }} /></label><p>{audioName || '支援 MP3、M4A、WAV'}</p></div> : <div className="upload-area image-upload"><label htmlFor="image-file"><span aria-hidden="true">◇</span> 選擇拉花照片<input id="image-file" name="image-file" type="file" accept="image/*" onChange={(event) => { const file = event.target.files?.[0]; if (file) setPreview(URL.createObjectURL(file)); setResult('') }} /></label>{preview ? <img src={preview} alt="已選擇的拉花照片預覽" width="320" height="180" /> : <p>支援 JPG、PNG、WebP</p>}</div>}<button className="analyze-button" type="button" onClick={runDemo}>產生示範回饋 <span aria-hidden="true">↗</span></button>{result && <div className="feedback" role="status" aria-live="polite"><p>你的下一杯練習重點</p><strong>{result}</strong></div>}</div></div></section>
    </div>
    <footer className="footer"><a className="brand" href="#top"><span className="brand-dot" aria-hidden="true" />Latte Sense</a><p>讓每一杯練習都有下一步。</p></footer>
    <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
  </main>
}
createRoot(document.getElementById('root')).render(<App />)
