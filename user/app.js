const SAMPLE_NOTICE = `Post-Matric Scholarship Notice 2026-27

Eligible students enrolled in recognized institutions may apply through the official scholarship portal.
Applicants must submit the completed online application before 15 November 2026.
Required documents may include the latest marksheet, income certificate, category certificate where applicable, bank account details, and institution verification.
Applications with missing documents may be returned for correction.
Students should verify the final eligibility conditions and submission status on the official portal.`;

const TRANSLATIONS = {
  en: {
    howLink:'How it works',trustLink:'Privacy & trust',eyebrow:'Clarity for every important notice',titleOne:'Big paperwork.',titleTwo:'Clear next steps.',
    intro:'Turn confusing public-service notices into plain-language explanations, important dates, and a checklist you can actually use.',
    evidenceAware:'Evidence-aware answers',privateByDesign:'Private by design',deadlineIdentified:'Deadline identified',documentsListed:'Documents listed',aiAssisted:'AI assisted',sourceLinked:'Source linked',
    analyzerEyebrow:'NOTICE ANALYZER',analyzerTitle:'Your notice, made clearer',analyzerIntro:'Paste the notice text or add a readable photo. We’ll organize it into a practical action brief.',
    sourceFirst:'Source first',pasteLabel:'Paste notice text',sampleButton:'Try sample',noticePlaceholder:'Paste a government notice, scholarship instructions, admission circular, or public-service document…',
    clearButton:'Clear',or:'OR',uploadTitle:'Upload or paste a notice image',uploadHint:'JPG, PNG or WEBP · up to 5 MB · Ctrl+V also works',removeImage:'Remove',explainIn:'Explain in',
    analyzeButton:'Understand this notice',analyzing:'Reading your notice…',howTitle:'How it works',stepOneTitle:'Add a notice',stepOneText:'Paste instructions or add a readable notice image.',
    stepTwoTitle:'Find key details',stepTwoText:'Organize dates, document mentions, and eligibility clues.',stepThreeTitle:'Verify the source',stepThreeText:'Review quoted evidence and compare it with the original.',
    disclaimer:'Helpful, not authoritative. Confirm deadlines, fees, eligibility, and document requirements against the official notice.',
    resultsEyebrow:'YOUR ACTION BRIEF',summary:'In simple words',points:'Important points',dates:'Dates found',docs:'Documents mentioned',eligibility:'Eligibility clues',
    checklist:'Your next steps',caveats:'Please double-check',evidence:'Source evidence',noEvidence:'No supporting excerpt is available for this item.',
    demo:'DEMO MODE',ai:'AI ANALYSIS',demoExplain:'This is rule-based demo output, not AI-generated analysis. The configured AI provider is unavailable or out of quota right now. Verify the notice against its official source.',
    trustTitle:'Helpful, not authoritative.',trustText:'FormSaathi AI is independent and is not affiliated with any government body. If AI is configured, extracted notice text is sent to your selected model provider.',
    noStorage:'No permanent upload storage by default',serverKeys:'Server-side AI credentials',
    footerNote:'Independent information tool · Not an official government website',fileError:'Choose a JPG, PNG or WEBP image up to 5 MB.',
    emptyError:'Paste some notice text or choose an image first.',genericError:'Could not analyze the notice. Please try again.',
    removeImageAlt:'Selected notice preview',imageReady:'Image ready for analysis',demoCaveat:'No AI model was used in demo mode. Verify the official notice before making important decisions.',
    notStated:'Not stated clearly in the provided notice.',extractedText:'Text extracted from image',analyzeAnother:'Analyze another notice',
    noResult:'No items identified in this category. Check the source notice for details.',uploadBad:'This page is opened as a local file. Start a local web server to use the analyzer.',
    clipboardImage:'Image pasted from clipboard.',charLimit:'Notice text is too long. Keep it below 30,000 characters.',
    aiMode:'AI analysis',actionCount:'items',deadlineContext:'Date found in the source text; check the original notice to understand what it refers to.'
  },
  hi: {
    howLink:'कैसे काम करता है',trustLink:'गोपनीयता और भरोसा',eyebrow:'हर ज़रूरी नोटिस को आसान भाषा में समझें',titleOne:'नोटिस की उलझन।',titleTwo:'अगले कदम साफ़।',
    intro:'जटिल सरकारी नोटिस को सरल जानकारी, ज़रूरी तारीखों और काम की चेकलिस्ट में बदलें।',
    evidenceAware:'स्रोत पर आधारित जवाब',privateByDesign:'गोपनीयता का ध्यान',deadlineIdentified:'अंतिम तिथि मिली',documentsListed:'दस्तावेज़ मिले',aiAssisted:'AI की मदद',sourceLinked:'स्रोत जुड़ा है',
    analyzerEyebrow:'नोटिस विश्लेषक',analyzerTitle:'नोटिस अब समझना आसान',analyzerIntro:'नोटिस का टेक्स्ट पेस्ट करें या साफ़ तस्वीर जोड़ें। ज़रूरी जानकारी को चेकलिस्ट में व्यवस्थित किया जाएगा।',
    sourceFirst:'पहले स्रोत',pasteLabel:'नोटिस का टेक्स्ट पेस्ट करें',sampleButton:'उदाहरण देखें',noticePlaceholder:'सरकारी नोटिस, स्कॉलरशिप निर्देश, एडमिशन सर्कुलर या दस्तावेज़ यहाँ पेस्ट करें…',
    clearButton:'साफ़ करें',or:'या',uploadTitle:'नोटिस की तस्वीर अपलोड या पेस्ट करें',uploadHint:'JPG, PNG या WEBP · अधिकतम 5 MB · Ctrl+V भी इस्तेमाल करें',removeImage:'हटाएँ',explainIn:'भाषा',
    analyzeButton:'नोटिस समझें',analyzing:'नोटिस पढ़ रहे हैं…',howTitle:'कैसे काम करता है',stepOneTitle:'नोटिस जोड़ें',stepOneText:'निर्देश पेस्ट करें या साफ़ तस्वीर जोड़ें।',
    stepTwoTitle:'ज़रूरी जानकारी निकालें',stepTwoText:'तारीखें, दस्तावेज़ और पात्रता से जुड़े संकेत व्यवस्थित करें।',stepThreeTitle:'मूल स्रोत जाँचें',stepThreeText:'दिए गए प्रमाण को मूल नोटिस से मिलाएँ।',
    disclaimer:'यह मददगार जानकारी है, आधिकारिक निर्णय नहीं। अंतिम तिथि, शुल्क, पात्रता और दस्तावेज़ मूल नोटिस से जाँचें।',
    resultsEyebrow:'आपके अगले कदम',summary:'आसान भाषा में',points:'ज़रूरी बातें',dates:'मिली हुई तारीखें',docs:'दस्तावेज़',eligibility:'पात्रता की जानकारी',
    checklist:'अब क्या करें',caveats:'इन बातों की पुष्टि करें',evidence:'मूल नोटिस का प्रमाण',noEvidence:'इस जानकारी के लिए सहायक अंश नहीं मिला।',
    demo:'डेमो मोड',ai:'AI विश्लेषण',demoExplain:'यह नियमों पर आधारित डेमो है, AI से बना विश्लेषण नहीं। अभी AI सेवा उपलब्ध नहीं है या उसकी quota सीमा आ गई है। मूल सरकारी स्रोत से जानकारी की पुष्टि करें।',
    trustTitle:'मददगार जानकारी, आधिकारिक निर्णय नहीं।',trustText:'FormSaathi AI स्वतंत्र टूल है और किसी सरकारी संस्था से जुड़ा नहीं है। AI सेट होने पर नोटिस का निकाला गया टेक्स्ट चुने गए model provider को भेजा जाता है।',
    noStorage:'अपलोड स्थायी रूप से सेव नहीं होता',serverKeys:'AI कुंजी केवल सर्वर पर',
    footerNote:'स्वतंत्र जानकारी टूल · आधिकारिक सरकारी वेबसाइट नहीं',fileError:'5 MB तक की JPG, PNG या WEBP तस्वीर चुनें।',
    emptyError:'पहले नोटिस का टेक्स्ट पेस्ट करें या तस्वीर चुनें।',genericError:'नोटिस का विश्लेषण नहीं हो पाया। फिर से कोशिश करें।',
    removeImageAlt:'चुनी गई नोटिस की तस्वीर',imageReady:'तस्वीर विश्लेषण के लिए तैयार है',demoCaveat:'डेमो मोड में AI model का उपयोग नहीं हुआ। ज़रूरी निर्णय से पहले आधिकारिक नोटिस जाँचें।',
    notStated:'दिए गए नोटिस में यह जानकारी साफ़ तौर पर नहीं मिली।',extractedText:'तस्वीर से निकला टेक्स्ट',analyzeAnother:'दूसरा नोटिस समझें',
    noResult:'इस श्रेणी में जानकारी नहीं मिली। मूल नोटिस को ध्यान से जाँचें।',uploadBad:'यह पेज लोकल फ़ाइल के रूप में खुला है। Analyzer चलाने के लिए लोकल वेब सर्वर शुरू करें।',
    clipboardImage:'क्लिपबोर्ड से तस्वीर जोड़ी गई।',charLimit:'नोटिस का टेक्स्ट बहुत लंबा है। इसे 30,000 अक्षरों से कम रखें।',
    aiMode:'AI विश्लेषण',actionCount:'आइटम',deadlineContext:'टेक्स्ट में तारीख मिली है; इसका मतलब जानने के लिए मूल नोटिस जाँचें।'
  }
};

const $ = (id) => document.getElementById(id);
const form = $('analyzeForm');
const noticeText = $('noticeText');
const imageInput = $('imageInput');
const uploadZone = $('uploadZone');
const imagePreview = $('imagePreview');
const previewImage = $('previewImage');
const fileName = $('fileName');
const fileSize = $('fileSize');
const analyzeButton = $('analyzeButton');
const errorBox = $('errorBox');
const resultPanel = $('results');
const characterCount = $('characterCount');
let language = 'en';
let selectedImage = null;
let previewUrl = '';
let currentResult = null;
let busy = false;


const THEME_KEY = 'formsaathi-theme';

function applyTheme(theme) {
  const selectedTheme = theme === 'dark' ? 'dark' : 'light';
  document.documentElement.dataset.theme = selectedTheme;
  const toggle = $('themeToggle');
  if (toggle) {
    const dark = selectedTheme === 'dark';
    toggle.textContent = dark ? '☀' : '☾';
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.setAttribute('aria-pressed', String(dark));
  }
}

function t(key) {
  return TRANSLATIONS[language][key] || TRANSLATIONS.en[key] || key;
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = t(element.dataset.i18nPlaceholder);
  });
  $('languageToggle').textContent = language === 'en' ? 'हिंदी' : 'English';
  document.querySelectorAll('[data-language]').forEach((button) => {
    button.classList.toggle('selected', button.dataset.language === language);
    button.setAttribute('aria-pressed', String(button.dataset.language === language));
  });
  if (currentResult) renderResults(currentResult);
  if (busy) setLoading(true);
}

function setError(message) {
  errorBox.textContent = message || '';
  errorBox.hidden = !message;
}

function updateFormState() {
  characterCount.textContent = noticeText.value.length.toLocaleString();
  analyzeButton.disabled = busy || (!noticeText.value.trim() && !selectedImage);
}

function getApiBase() {
  const explicit = document.querySelector('meta[name="formsaathi-api-base"]')?.content?.trim();
  if (explicit) return explicit.replace(/\/+$/, '');
  if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    return location.protocol === 'https:' ? '' : `http://${location.hostname}:3001`;
  }
  return '';
}

function revokePreview() {
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrl = '';
}

function chooseImage(file) {
  if (!file) return;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 5 * 1024 * 1024) {
    setError(t('fileError'));
    return;
  }
  setError('');
  revokePreview();
  selectedImage = file;
  previewUrl = URL.createObjectURL(file);
  previewImage.src = previewUrl;
  previewImage.alt = t('removeImageAlt');
  fileName.textContent = file.name || t('imageReady');
  fileSize.textContent = `${Math.max(1, Math.round(file.size / 1024))} KB`;
  imagePreview.hidden = false;
  uploadZone.hidden = true;
  updateFormState();
}

function removeImage() {
  selectedImage = null;
  revokePreview();
  previewImage.removeAttribute('src');
  imagePreview.hidden = true;
  uploadZone.hidden = false;
  imageInput.value = '';
  updateFormState();
}

function clearForm() {
  noticeText.value = '';
  removeImage();
  currentResult = null;
  resultPanel.replaceChildren();
  resultPanel.hidden = true;
  setError('');
  updateFormState();
}

function makeElement(tag, className, content) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (content !== undefined && content !== null) element.textContent = String(content);
  return element;
}

function renderEvidence(text) {
  if (!text) return makeElement('small', 'no-evidence', t('noEvidence'));
  const details = makeElement('details', 'evidence');
  details.append(makeElement('summary', '', `▤  ${t('evidence')}`));
  details.append(makeElement('blockquote', '', text));
  return details;
}

function renderSection(title, symbol, items, renderer) {
  if (!Array.isArray(items) || items.length === 0) return null;
  const section = makeElement('section', 'result-section');
  const heading = makeElement('div', 'section-title');
  heading.append(makeElement('span', 'section-icon', symbol), makeElement('h3', '', title), makeElement('b', '', items.length));
  section.append(heading);
  items.slice(0, 20).forEach((item) => {
    const row = makeElement('div', 'result-item');
    renderer(row, item);
    section.append(row);
  });
  return section;
}

function paragraph(parent, text) {
  parent.append(makeElement('p', '', text || t('notStated')));
}

function renderResults(result) {
  resultPanel.replaceChildren();
  resultPanel.hidden = false;

  const top = makeElement('div', 'results-heading');
  const topLeft = document.createElement('div');
  const eyebrow = makeElement('span', 'eyebrow', `✳  ${t('resultsEyebrow')}`);
  topLeft.append(eyebrow, makeElement('h2', '', result.noticeTitle || t('analyzerTitle')));
  const mode = makeElement('span', `mode-pill ${result.mode === 'ai' ? 'ai' : ''}`);
  mode.append(makeElement('span', 'mode-dot'), document.createTextNode(result.mode === 'ai' ? t('ai') : t('demo')));
  top.append(topLeft, mode);
  resultPanel.append(top);

  if (result.mode !== 'ai') {
    const alert = makeElement('div', 'demo-alert');
    alert.append(makeElement('span', '', 'ⓘ'), makeElement('p', '', t('demoExplain')));
    resultPanel.append(alert);
  }

  const summary = makeElement('div', 'summary-card');
  summary.append(makeElement('span', 'summary-symbol', '✳'));
  const summaryContent = document.createElement('div');
  summaryContent.append(makeElement('h3', '', t('summary')), makeElement('p', '', result.summary || t('notStated')));
  summary.append(summaryContent);
  resultPanel.append(summary);

  const grid = makeElement('div', 'results-grid');
  const sections = [
    renderSection(t('points'), '≡', result.keyPoints, (row, item) => {
      paragraph(row, item.text); row.append(renderEvidence(item.evidence));
    }),
    renderSection(t('dates'), '◷', result.deadlines, (row, item) => {
      row.append(makeElement('strong', 'date-label', item.date || ''));
      paragraph(row, item.detail); row.append(renderEvidence(item.evidence));
    }),
    renderSection(t('docs'), '▤', result.requiredDocuments, (row, item) => {
      paragraph(row, item.name); row.append(renderEvidence(item.evidence));
    }),
    renderSection(t('eligibility'), '✓', result.eligibility, (row, item) => {
      paragraph(row, item.condition); row.append(renderEvidence(item.evidence));
    })
  ];
  sections.filter(Boolean).forEach((section) => grid.append(section));
  if (grid.childElementCount) resultPanel.append(grid);

  const checklist = renderSection(t('checklist'), '✓', result.actionChecklist, (row, item) => {
    paragraph(row, `✓  ${item.task}`); row.append(renderEvidence(item.evidence));
  });
  if (checklist) resultPanel.append(checklist);

  if (Array.isArray(result.caveats) && result.caveats.length) {
    const caveats = makeElement('div', 'caveats');
    const caveatContent = document.createElement('div');
    caveatContent.append(makeElement('strong', '', t('caveats')));
    result.caveats.slice(0, 10).forEach((item) => caveatContent.append(makeElement('p', '', item)));
    caveats.append(makeElement('span', '', '⚠'), caveatContent);
    resultPanel.append(caveats);
  }

  if (result.extractedText) {
    const details = makeElement('details', 'ocr-details');
    details.append(makeElement('summary', '', `▤  ${t('extractedText')}`), makeElement('pre', '', result.extractedText));
    resultPanel.append(details);
  }

  const another = makeElement('button', 'outline-button', t('analyzeAnother'));
  another.type = 'button';
  another.addEventListener('click', clearForm);
  resultPanel.append(another);
}

function setLoading(next) {
  busy = next;
  analyzeButton.replaceChildren();
  if (busy) {
    analyzeButton.append(makeElement('span', 'spinner'), makeElement('span', '', t('analyzing')));
  } else {
    analyzeButton.append(makeElement('span', '', t('analyzeButton')), makeElement('span', '', '↗'));
  }
  updateFormState();
}

$('themeToggle').addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  try { localStorage.setItem(THEME_KEY, nextTheme); } catch {}
  applyTheme(nextTheme);
});

$('languageToggle').addEventListener('click', () => {
  language = language === 'en' ? 'hi' : 'en';
  applyLanguage();
});
document.querySelectorAll('[data-language]').forEach((button) => {
  button.addEventListener('click', () => {
    language = button.dataset.language;
    applyLanguage();
  });
});

noticeText.addEventListener('input', () => {
  setError('');
  updateFormState();
});
noticeText.addEventListener('paste', (event) => {
  const imageItem = Array.from(event.clipboardData?.items || []).find((item) => item.type.startsWith('image/'));
  if (!imageItem) return;
  const blob = imageItem.getAsFile();
  if (!blob) return;
  event.preventDefault();
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(blob.type)) {
    setError(t('fileError'));
    return;
  }
  const type = blob.type;
  const extension = type === 'image/jpeg' ? 'jpg' : type === 'image/webp' ? 'webp' : 'png';
  chooseImage(new File([blob], `pasted-notice-${Date.now()}.${extension}`, { type }));
});

$('sampleButton').addEventListener('click', () => {
  noticeText.value = SAMPLE_NOTICE;
  setError('');
  updateFormState();
  noticeText.focus();
});
$('clearButton').addEventListener('click', clearForm);
$('removeImage').addEventListener('click', removeImage);
uploadZone.addEventListener('click', () => imageInput.click());
imageInput.addEventListener('change', () => chooseImage(imageInput.files?.[0]));
uploadZone.addEventListener('dragover', (event) => {
  event.preventDefault();
  uploadZone.classList.add('dragover');
});
uploadZone.addEventListener('dragleave', () => uploadZone.classList.remove('dragover'));
uploadZone.addEventListener('drop', (event) => {
  event.preventDefault();
  uploadZone.classList.remove('dragover');
  chooseImage(event.dataTransfer?.files?.[0]);
});

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  if (!noticeText.value.trim() && !selectedImage) {
    setError(t('emptyError'));
    return;
  }
  if (location.protocol === 'file:') {
    setError(t('uploadBad'));
    return;
  }

  setError('');
  currentResult = null;
  resultPanel.replaceChildren();
  resultPanel.hidden = true;
  setLoading(true);
  const body = new FormData();
  body.append('text', noticeText.value);
  body.append('language', language);
  if (selectedImage) body.append('image', selectedImage);

  try {
    const response = await fetch(`${getApiBase()}/api/analyze`, { method: 'POST', body });
    let payload;
    try { payload = await response.json(); }
    catch { throw new Error(t('genericError')); }
    if (!response.ok) throw new Error(payload.error || t('genericError'));
    currentResult = payload;
    renderResults(payload);
    resultPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
  } catch (error) {
    setError(error.message || t('genericError'));
  } finally {
    setLoading(false);
  }
});

let savedTheme = 'dark';
try { savedTheme = localStorage.getItem(THEME_KEY) || 'dark'; } catch {}
applyTheme(savedTheme);
applyLanguage();
updateFormState();
window.addEventListener('beforeunload', revokePreview);
