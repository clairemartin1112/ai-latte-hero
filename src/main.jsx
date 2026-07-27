import React, { Suspense, lazy, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'

const HeroScene = lazy(() => import('./HeroScene.jsx'))

function App() {
  const [reduceMotion, setReduceMotion] = useState(false)
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduceMotion(media.matches)
  }, [])

  return (
    <main className="page-shell">
      <nav className="nav" aria-label="主要導覽">
        <a className="brand" href="#top"><span className="brand-dot" />Latte Sense</a>
        <a className="nav-link" href="#course">課程特色</a>
      </nav>
      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="eyebrow">AI LATTE ART COACH</p>
          <h1>聽懂奶泡，<br /><em>拉好每一杯。</em></h1>
          <p className="description">從蒸氣聲到成品紋路，AI 陪你看見每一次練習裡值得修正的細節，讓拉花從直覺變成可掌握的手感。</p>
          <div className="actions">
            <a className="cta" href="#course">立即體驗 <span aria-hidden="true">↗</span></a>
            <a className="text-link" href="#course">看看怎麼運作</a>
          </div>
          <div className="trust"><span>✦</span> 為拉花初學者設計的即時練習回饋</div>
        </div>
        <div className={`visual ${reduceMotion ? 'reduce-motion' : ''}`} aria-label="旋轉中的 AI 拉花咖啡 3D 視覺">
          {reduceMotion ? <div className="fallback-cup">☕</div> : <Suspense fallback={<div className="fallback-cup">☕</div>}><HeroScene /></Suspense>}
          <div className="sound-label"><i /> AI 聲音辨識中</div>
          <div className="visual-caption">MILK · IMAGE · FEEDBACK</div>
        </div>
      </section>
    </main>
  )
}

createRoot(document.getElementById('root')).render(<App />)
