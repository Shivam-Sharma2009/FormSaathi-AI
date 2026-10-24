import { useRef, useState } from 'react';
import { ArrowRight, BookOpenText, Check, CheckCircle2, Clock3, FileCheck2, FileText, Languages, LoaderCircle, LockKeyhole, Paperclip, ScanText, ShieldCheck, Sparkles, UploadCloud, AlertTriangle, CircleHelp } from 'lucide-react';

const SAMPLE = `Post-Matric Scholarship Notice 2026-27

Eligible students enrolled in recognized institutions may apply through the official scholarship portal.
Applicants must submit the completed online application before 15 November 2026.
Required documents may include the latest marksheet, income certificate, category certificate where applicable, bank account details, and institution verification.
Applications with missing documents may be returned for correction.
Students should verify the final eligibility conditions and submission status on the official portal.`;

const TEXT = {
  en: {
    label: 'Clarity for every important notice', title1: 'Big paperwork.', title2: 'Clear next steps.',
    intro: 'Turn confusing public-service notices into simple explanations, important dates, and a checklist you can actually use.',
    paste: 'Paste notice text', sample: 'Try sample', placeholder: 'Paste a government notice, scholarship instructions, admission circular, or public-service document…',
    upload: 'Upload a notice image', fileHint: 'JPG, PNG or WEBP · up to 5 MB', language: 'Explain in', analyze: 'Understand this notice',
    busy: 'Reading your notice…', clear: 'Clear', empty: 'Your notice, made clearer', emptyText: 'Paste text or upload a clear photo. FormSaathi will organize key information into a practical action brief.',
    steps: 'How it works', step1: 'Add a notice', step2: 'Find key details', step3: 'Verify the source',
    results: 'Your action brief', summary: 'In simple words', points: 'Important points', dates: 'Dates found',
    docs: 'Documents mentioned', eligibility: 'Eligibility clues', checklist: 'Your next steps', caveats: 'Please double-check',
    evidence: 'Source evidence', noEvidence: 'No supporting excerpt provided.', demo: 'Demo mode', ai: 'AI analysis',
    demoExplain: 'This is heuristic demo output, not AI-generated analysis. Configure a hosted model in the backend to enable real AI responses.',
    extract: 'Text detected in image', privacy: 'Your uploaded image is not stored as a permanent file.',
    note: 'Helpful, not authoritative. Confirm deadlines, fees, eligibility and document requirements against the official notice.',
    footer: 'Independent informational tool · Not an official government website',
    error: 'Could not analyze the notice. Please try again.', emptyError: 'Paste some notice text or choose an image first.',
    fileError: 'Choose a JPG, PNG or WEBP image up to 5 MB.', remove: 'Remove image', new: 'Analyze another notice',
    notStated: 'Not stated clearly in the provided notice.'
  },
  hi: {
    label: 'हर ज़रूरी नोटिस को आसान भाषा में समझें', title1: 'नोटिस की उलझन।', title2: 'अगले कदम साफ़।',
    intro: 'जटिल सरकारी नोटिस को सरल जानकारी, ज़रूरी तारीखों और काम की चेकलिस्ट में बदलें।',
    paste: 'नोटिस का टेक्स्ट पेस्ट करें', sample: 'उदाहरण देखें', placeholder: 'सरकारी नोटिस, स्कॉलरशिप निर्देश, एडमिशन सर्कुलर या दस्तावेज़ यहाँ पेस्ट करें…',
    upload: 'नोटिस की तस्वीर अपलोड करें', fileHint: 'JPG, PNG या WEBP · अधिकतम 5 MB', language: 'भाषा', analyze: 'नोटिस समझें',
    busy: 'नोटिस पढ़ रहे हैं…', clear: 'साफ़ करें', empty: 'नोटिस अब समझना आसान', emptyText: 'टेक्स्ट पेस्ट करें या साफ़ तस्वीर अपलोड करें। FormSaathi ज़रूरी जानकारी को चेकलिस्ट में व्यवस्थित करेगा।',
    steps: 'कैसे काम करता है', step1: 'नोटिस जोड़ें', step2: 'ज़रूरी जानकारी निकालें', step3: 'मूल स्रोत से मिलान करें',
    results: 'आपके अगले कदम', summary: 'आसान भाषा में', points: 'ज़रूरी बातें', dates: 'मिली हुई तारीखें',
    docs: 'दस्तावेज़', eligibility: 'पात्रता की जानकारी', checklist: 'अब क्या करें', caveats: 'इन बातों की पुष्टि करें',
    evidence: 'मूल नोटिस का प्रमाण', noEvidence: 'कोई सहायक अंश नहीं दिया गया।', demo: 'डेमो मोड', ai: 'AI विश्लेषण',
    demoExplain: 'यह नियम-आधारित डेमो है, AI विश्लेषण नहीं। असली AI जवाबों के लिए backend में hosted model सेट करें।',
    extract: 'तस्वीर से मिला टेक्स्ट', privacy: 'आपकी तस्वीर स्थायी फ़ाइल के रूप में सेव नहीं होती।',
    note: 'यह मददगार जानकारी है, आधिकारिक निर्णय नहीं। तारीख, शुल्क, पात्रता और दस्तावेज़ मूल नोटिस से जाँचें।',
    footer: 'स्वतंत्र जानकारी टूल · आधिकारिक सरकारी वेबसाइट नहीं',
    error: 'नोटिस का विश्लेषण नहीं हो पाया। फिर से कोशिश करें।', emptyError: 'पहले नोटिस का टेक्स्ट पेस्ट करें या तस्वीर चुनें।',
    fileError: '5 MB तक की JPG, PNG या WEBP तस्वीर चुनें।', remove: 'तस्वीर हटाएँ', new: 'दूसरा नोटिस समझें',
    notStated: 'दिए गए नोटिस में यह जानकारी साफ़ तौर पर नहीं मिली।'
  }
};

function Evidence({ text, t }) {
  if (!text) return <small className="no-evidence">{t.noEvidence}</small>;
  return <details className="evidence"><summary><BookOpenText size={13} /> {t.evidence}</summary><blockquote>{text}</blockquote></details>;
}

function Section({ icon: Icon, title, items, render }) {
  if (!Array.isArray(items) || items.length === 0) return null;
  return <section className="result-section"><div className="section-title"><span><Icon size={16} /></span><h3>{title}</h3><b>{items.length}</b></div>{items.map((item, i) => <div className="result-item" key={i}>{render(item)}</div>)}</section>;
}

export default function App() {
  const [language, setLanguage] = useState('en');
  const [notice, setNotice] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const t = TEXT[language];

  function chooseFile(next) {
    if (!next) return;
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(next.type) || next.size > 5 * 1024 * 1024) {
      setError(t.fileError);
      return;
    }
    setError('');
    if (preview) URL.revokeObjectURL(preview);
    setFile(next);
    setPreview(URL.createObjectURL(next));
  }

  function clear() {
    setNotice(''); setFile(null); setPreview(''); setResult(null); setError('');
    if (fileRef.current) fileRef.current.value = '';
  }

  async function analyze(event) {
    event.preventDefault();
    if (!notice.trim() && !file) { setError(t.emptyError); return; }
    setLoading(true); setError(''); setResult(null);
    const body = new FormData();
    body.append('text', notice);
    body.append('language', language);
    if (file) body.append('image', file);
    try {
      const response = await fetch('/api/analyze', { method: 'POST', body });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || t.error);
      setResult(payload);
    } catch (e) {
      setError(e.message || t.error);
    } finally {
      setLoading(false);
    }
  }

  return <div className="app">
    <header className="topbar">
      <a className="brand" href="#"><span className="brand-icon"><FileCheck2 size={22} /></span><span>FormSaathi <i>AI</i><small>NOTICE, UNDERSTOOD.</small></span></a>
      <nav><a href="#how">{t.steps}</a><a href="#trust">Privacy & trust</a></nav>
      <div className="top-actions"><span className="open-source"><span /> Open source</span><button className="language-toggle" onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}><Languages size={15} />{language === 'en' ? 'हिंदी' : 'English'}</button></div>
    </header>

    <main>
      <section className="hero">
        <div className="hero-copy"><span className="eyebrow"><Sparkles size={14} /> {t.label}</span><h1>{t.title1}<br /><em>{t.title2}</em></h1><p>{t.intro}</p>
          <div className="trust-row"><span><ShieldCheck size={16} /> Evidence-aware answers</span><span><LockKeyhole size={15} /> {t.privacy}</span></div></div>
        <div className="hero-art" aria-hidden="true"><div className="orb orb-one" /><div className="orb orb-two" /><div className="paper"><div className="paper-bar" /><div className="paper-line wide" /><div className="paper-line" /><div className="paper-highlight"><CheckCircle2 size={15} /> Deadline identified</div><div className="paper-line wide" /><div className="paper-line short" /><div className="paper-highlight"><FileCheck2 size={15} /> Documents listed</div></div><div className="float-tag tag-one"><Sparkles size={13} /> AI assisted</div><div className="float-tag tag-two"><ShieldCheck size={13} /> Source linked</div></div>
      </section>

      <section className="workspace">
        <div className="workspace-head"><div><span className="eyebrow"><ScanText size={13} /> NOTICE ANALYZER</span><h2>{t.empty}</h2><p>{t.emptyText}</p></div><span className="secure-label"><LockKeyhole size={13} /> Private by design</span></div>
        <form className="analyzer" onSubmit={analyze}>
          <div className="input-side">
            <div className="field-heading"><label htmlFor="notice">{t.paste}</label><button type="button" className="text-btn" onClick={() => { setNotice(SAMPLE); setError(''); }}>{t.sample}</button></div>
            <textarea id="notice" value={notice} onChange={(e) => setNotice(e.target.value)} maxLength={30000} rows={8} placeholder={t.placeholder} />
            <div className="textarea-meta"><span>{notice.length.toLocaleString()} / 30,000</span><button type="button" className="text-btn" onClick={clear}>{t.clear}</button></div>
            <div className="or"><span>OR</span></div>
            <input ref={fileRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={(e) => chooseFile(e.target.files?.[0])} />
            {!preview ? <button type="button" className="upload-box" onClick={() => fileRef.current?.click()} onDragOver={(e) => e.preventDefault()} onDrop={(e) => { e.preventDefault(); chooseFile(e.dataTransfer.files?.[0]); }}><span className="upload-icon"><UploadCloud size={21} /></span><span><strong>{t.upload}</strong><small>{t.fileHint}</small></span><Paperclip size={18} className="paperclip" /></button> : <div className="preview"><img src={preview} alt="Notice preview" /><div><strong>{file.name}</strong><small>{Math.round(file.size / 1024)} KB</small><button type="button" className="text-btn" onClick={() => { URL.revokeObjectURL(preview); setFile(null); setPreview(''); if (fileRef.current) fileRef.current.value = ''; }}>{t.remove}</button></div></div>}
            <div className="form-bottom"><div className="lang-options"><span>{t.language}</span><button type="button" className={language === 'en' ? 'selected' : ''} onClick={() => setLanguage('en')}>English</button><button type="button" className={language === 'hi' ? 'selected' : ''} onClick={() => setLanguage('hi')}>हिंदी</button></div><button className="primary-btn" disabled={loading || (!notice.trim() && !file)}>{loading ? <><LoaderCircle className="spin" size={17} />{t.busy}</> : <>{t.analyze}<ArrowRight size={17} /></>}</button></div>
            {error && <div className="error" role="alert"><AlertTriangle size={16} />{error}</div>}
          </div>
          <aside className="steps" id="how"><h3>{t.steps}</h3><div className="step"><b>01</b><div><strong>{t.step1}</strong><p>Paste instructions or add a readable notice image.</p></div></div><div className="step"><b>02</b><div><strong>{t.step2}</strong><p>Organize dates, document mentions, and eligibility clues.</p></div></div><div className="step"><b>03</b><div><strong>{t.step3}</strong><p>Review quoted evidence and compare it to the original.</p></div></div><div className="aside-note"><ShieldCheck size={18} /><p>{t.note}</p></div></aside>
        </form>
      </section>

      {result && <section className="results">
        <div className="results-head"><div><span className="eyebrow"><Sparkles size={13} /> {t.results}</span><h2>{result.noticeTitle}</h2></div><span className={result.mode === 'ai' ? 'mode ai-mode' : 'mode'}><span />{result.mode === 'ai' ? t.ai : t.demo}</span></div>
        {result.mode !== 'ai' && <div className="demo-alert"><CircleHelp size={17} /><p>{t.demoExplain}</p></div>}
        <div className="summary"><span><Sparkles size={17} /></span><div><h3>{t.summary}</h3><p>{result.summary}</p></div></div>
        <div className="results-grid">
          <Section icon={FileText} title={t.points} items={result.keyPoints} render={(item) => <><p>{item.text}</p><Evidence text={item.evidence} t={t} /></>} />
          <Section icon={Clock3} title={t.dates} items={result.deadlines} render={(item) => <><strong className="date">{item.date}</strong><p>{item.detail}</p><Evidence text={item.evidence} t={t} /></>} />
          <Section icon={FileCheck2} title={t.docs} items={result.requiredDocuments} render={(item) => <><p>{item.name}</p><Evidence text={item.evidence} t={t} /></>} />
          <Section icon={ShieldCheck} title={t.eligibility} items={result.eligibility} render={(item) => <><p>{item.condition}</p><Evidence text={item.evidence} t={t} /></>} />
        </div>
        <Section icon={CheckCircle2} title={t.checklist} items={result.actionChecklist} render={(item) => <><p><Check size={14} className="inline-check" /> {item.task}</p><Evidence text={item.evidence} t={t} /></>} />
        {result.caveats?.length > 0 && <div className="caveats"><AlertTriangle size={17} /><div><strong>{t.caveats}</strong>{result.caveats.map((item, i) => <p key={i}>{item}</p>)}</div></div>}
        {result.extractedText && <details className="ocr"><summary><ScanText size={15} /> {t.extract}</summary><pre>{result.extractedText}</pre></details>}
        <button className="outline-btn" onClick={clear}>{t.new}<ArrowRight size={15} /></button>
      </section>}

      <section className="trust-panel" id="trust"><span><ShieldCheck size={22} /></span><div><strong>Helpful, not authoritative.</strong><p>FormSaathi AI is independent and is not affiliated with any government body. If AI is configured, extracted notice text is sent to your selected model provider.</p></div><div className="trust-bullets"><small><CheckCircle2 size={14} /> No permanent upload storage by default</small><small><CheckCircle2 size={14} /> Server-side AI credentials</small></div></section>
    </main>
    <footer><a href="#"><FileCheck2 size={16} /> FormSaathi AI</a><span>{t.footer}</span><a href="https://github.com/Shivam-Sharma2009/formsathi_ai" target="_blank" rel="noreferrer">View source ↗</a></footer>
  </div>;
}
