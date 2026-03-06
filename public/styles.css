:root{
  --unity-navy: #02264a;
  --unity-navy-deep: #011b35;
  --unity-navy-darker: #00162c;
  --unity-navy-overlay: rgba(2, 32, 64, 0.88);
  --unity-navy-overlay-strong: rgba(1, 21, 42, 0.94);
  --unity-gold: #f2be1a;
  --unity-white: #ffffff;
  --unity-text-soft: rgba(255,255,255,0.92);
  --unity-text-muted: rgba(255,255,255,0.7);
  --unity-border: rgba(255,255,255,0.08);
  --success: #1fc979;
  --danger: #ff7a7a;
  --success-soft: rgba(31, 201, 121, 0.12);
  --danger-soft: rgba(255, 122, 122, 0.12);
  --shadow-lg: 0 20px 50px rgba(0,0,0,0.28);
  --radius-md: 18px;
  --radius-lg: 28px;
  --container: 1280px;
  --nav-height: 92px;
  --font-stack: "Segoe UI", Inter, Arial, Helvetica, sans-serif;
}

*{ box-sizing:border-box; }
html{ scroll-behavior:smooth; }
body{
  margin:0;
  font-family:var(--font-stack);
  color:var(--unity-white);
  background:linear-gradient(180deg,#02172f 0%,#03294d 52%,#021c38 100%);
  -webkit-font-smoothing:antialiased;
}
a{ color:inherit; text-decoration:none; }
img{ max-width:100%; display:block; }
button,input,select,textarea{ font:inherit; }
.hidden{ display:none !important; }

.container{ width:min(calc(100% - 40px), var(--container)); margin:0 auto; }
.page-shell{ min-height:100vh; }

.site-header{
  position:sticky; top:0; z-index:1000; height:var(--nav-height);
  background:rgba(2,26,51,.97); backdrop-filter:blur(8px);
  border-bottom:1px solid rgba(255,255,255,.04);
}
.site-header .container{
  height:100%; display:flex; align-items:center; justify-content:space-between; gap:28px;
}
.brand img{ height:64px; width:auto; object-fit:contain; }
.nav{ display:flex; align-items:center; gap:28px; flex-wrap:wrap; }
.nav a{
  font-weight:800; font-size:.96rem; text-transform:uppercase;
  transition:color .18s ease;
}
.nav a:hover{ color:var(--unity-gold); }

.hero{
  position:relative;
  background:linear-gradient(180deg,var(--unity-navy-overlay-strong) 0%, var(--unity-navy-overlay) 100%);
  border-bottom:1px solid rgba(255,255,255,.05);
}
.hero::before{
  content:""; position:absolute; inset:0;
  background:
    radial-gradient(circle at top center, rgba(242,190,26,.07), transparent 28%),
    radial-gradient(circle at center, rgba(255,255,255,.025), transparent 44%);
  pointer-events:none;
}
.hero .container{ position:relative; z-index:1; padding:70px 0 78px; }
.hero-content{ max-width:1080px; text-align:center; margin:0 auto; }
.eyebrow{
  display:inline-block; margin-bottom:10px; color:var(--unity-gold);
  font-size:.8rem; font-weight:800; letter-spacing:.12em; text-transform:uppercase;
}
.hero h1{
  margin:0; font-size:clamp(2.6rem,5vw,5rem);
  line-height:.98; font-weight:300; letter-spacing:-.035em;
}
.hero p{
  max-width:960px; margin:24px auto 0;
  font-size:clamp(1rem,1.3vw,1.2rem); line-height:1.8; color:var(--unity-text-soft);
}
.hero-actions{ display:flex; justify-content:center; gap:14px; flex-wrap:wrap; margin-top:28px; }

.app-main{ position:relative; z-index:2; margin-top:-38px; padding-bottom:60px; }
.card{
  background:linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,.04));
  border:1px solid var(--unity-border);
  border-radius:var(--radius-lg);
  box-shadow:var(--shadow-lg);
  backdrop-filter:blur(8px);
}
.portal-shell{ width:min(calc(100% - 40px), 1160px); margin:0 auto; padding:28px; }

.portal-top{
  display:flex; justify-content:space-between; align-items:flex-start; gap:20px; margin-bottom:24px;
}
.portal-title-wrap h2{ margin:0; font-size:clamp(1.6rem,2vw,2.1rem); font-weight:800; }
.portal-subtitle, .section-copy{ color:var(--unity-text-muted); line-height:1.65; }

.user-panel{
  min-width:260px; padding:16px; border-radius:16px;
  background:rgba(255,255,255,.045); border:1px solid rgba(255,255,255,.08);
}
.user-row{ display:flex; flex-direction:column; gap:6px; margin-bottom:14px; }
.user-label{
  font-size:.72rem; text-transform:uppercase; letter-spacing:.09em; color:var(--unity-text-muted);
}
.user-value{ font-size:1rem; font-weight:800; word-break:break-word; }
.user-value.muted{ color:var(--unity-text-muted); font-weight:600; }
.user-actions{ display:flex; gap:10px; flex-wrap:wrap; }

.dashboard-grid{
  display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; margin-bottom:24px;
}
.dashboard-card{
  padding:20px; border-radius:18px;
  background:rgba(255,255,255,.045); border:1px solid rgba(255,255,255,.08);
}
.dashboard-card.highlight{
  background:linear-gradient(180deg, rgba(242,190,26,.12), rgba(255,255,255,.04));
}
.card-label{
  display:block; font-size:.72rem; text-transform:uppercase; letter-spacing:.08em; color:var(--unity-text-muted); margin-bottom:10px;
}
.dashboard-card h3{ margin:0 0 10px; font-size:1.25rem; }
.dashboard-card p{ margin:0; color:var(--unity-text-soft); line-height:1.7; }

.pill-row, .course-meta{
  display:flex; gap:10px; flex-wrap:wrap; margin-top:14px;
}
.pill, .course-meta span{
  padding:8px 12px; border-radius:999px; background:rgba(255,255,255,.08); color:var(--unity-text-soft); font-size:.85rem;
}

.mini-stat{ margin-bottom:10px; }
.mini-stat-label{ display:block; font-size:.74rem; color:var(--unity-text-muted); margin-bottom:4px; text-transform:uppercase; }
.mini-stat-value{ display:block; font-size:1rem; font-weight:800; }

.catalog-section, .training-section, .results-section{ margin-top:24px; }
.section-head{ margin-bottom:18px; }
.section-head h3{ margin:0; font-size:1.4rem; }

.catalog-grid{ display:grid; grid-template-columns:repeat(3, 1fr); gap:16px; }
.course-card{
  padding:20px; border-radius:18px; background:rgba(255,255,255,.045); border:1px solid rgba(255,255,255,.08);
}
.course-card h4{ margin:10px 0; font-size:1.1rem; }
.course-card p{ margin:0; color:var(--unity-text-soft); line-height:1.7; }
.course-status{
  display:inline-block; padding:6px 10px; border-radius:999px; font-size:.78rem; font-weight:800; text-transform:uppercase;
}
.course-status.live{ background:rgba(31,201,121,.18); color:#7ff0b7; }
.course-status.upcoming{ background:rgba(255,255,255,.08); color:var(--unity-text-soft); }

.meta-row{
  display:grid; grid-template-columns:repeat(5, minmax(120px,1fr)); gap:14px; margin:18px 0 26px;
}
.meta-chip{
  background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08);
  border-radius:14px; padding:14px 16px;
}
.meta-chip .label{
  display:block; font-size:.76rem; text-transform:uppercase; letter-spacing:.08em; color:var(--unity-text-muted); margin-bottom:6px;
}
.meta-chip .value{ font-size:1.05rem; font-weight:800; }

.section-block{
  border-radius:18px; background:rgba(255,255,255,.04); border:1px solid rgba(255,255,255,.08); padding:24px;
}
.intro-grid{ display:grid; grid-template-columns:1.5fr 1fr; gap:22px; }
.intro-copy h3{ margin:0 0 12px; font-size:1.35rem; }
.intro-copy p{ margin:0; color:var(--unity-text-soft); line-height:1.75; }
.info-list{ margin:18px 0 0; padding-left:20px; color:var(--unity-text-soft); line-height:1.8; }
.intro-panel{ display:grid; gap:14px; }
.stat-panel{
  padding:16px; border-radius:16px;
  background:rgba(255,255,255,.045); border:1px solid rgba(255,255,255,.08);
}
.stat-label{
  display:block; font-size:.74rem; text-transform:uppercase; letter-spacing:.08em;
  color:var(--unity-text-muted); margin-bottom:8px;
}
.stat-value{ display:block; font-size:1rem; font-weight:800; line-height:1.4; }
.start-btn{ width:100%; }

#quizForm{ margin-top:24px; }
.question{
  padding:22px; margin-bottom:18px; border-radius:18px;
  background:rgba(255,255,255,.045); border:1px solid rgba(255,255,255,.08);
}
.question h3{ margin:0 0 16px; font-size:1.06rem; line-height:1.5; }
.options{ display:grid; gap:12px; }
.option{
  display:flex; align-items:flex-start; gap:12px; padding:14px 16px;
  border:1px solid rgba(255,255,255,.08); border-radius:14px;
  background:rgba(255,255,255,.03); cursor:pointer;
  transition:transform .14s ease, border-color .14s ease, background .14s ease;
}
.option:hover{ transform:translateY(-1px); border-color:rgba(242,190,26,.58); background:rgba(255,255,255,.06); }
.option input[type="radio"]{ margin-top:3px; accent-color:var(--unity-gold); transform:scale(1.1); }
.option span{ color:var(--unity-text-soft); line-height:1.55; }

.form-actions, .result-actions, .toolbar-group{
  display:flex; gap:12px; flex-wrap:wrap;
}
.form-actions{ margin-top:26px; }

.btn, button{
  appearance:none; border:0; outline:0; cursor:pointer; border-radius:999px;
  font-family:inherit; font-weight:800;
  transition:transform .16s ease, box-shadow .16s ease, background .16s ease, color .16s ease, border-color .16s ease;
}
.btn{ display:inline-flex; align-items:center; justify-content:center; }
.btn-primary{
  background:var(--unity-gold); color:#0d2038; padding:14px 24px; box-shadow:0 12px 28px rgba(242,190,26,.24);
}
.btn-primary:hover{ transform:translateY(-1px); }
.btn-secondary{
  background:rgba(255,255,255,.07); color:var(--unity-white); border:1px solid rgba(255,255,255,.1); padding:14px 24px;
}
.btn-secondary:hover{ transform:translateY(-1px); border-color:rgba(242,190,26,.45); color:var(--unity-gold); }

.result-card{
  padding:24px; border-radius:18px; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.08);
}
.result-card.pass{ border-color:rgba(31, 201, 121, .45); background:var(--success-soft); }
.result-card.fail{ border-color:rgba(255, 122, 122, .35); background:var(--danger-soft); }
.result-card h3{ margin:0 0 12px; font-size:1.5rem; }
.result-card p{ margin:0 0 10px; color:var(--unity-text-soft); line-height:1.7; }
.result-grid{
  display:grid; grid-template-columns:repeat(4, minmax(140px,1fr)); gap:14px; margin:20px 0;
}
.result-stat{
  padding:16px; border-radius:14px; background:rgba(255,255,255,.045); border:1px solid rgba(255,255,255,.08);
}
.result-stat .label{ display:block; margin-bottom:6px; font-size:.76rem; letter-spacing:.08em; text-transform:uppercase; color:var(--unity-text-muted); }
.result-stat .value{ font-size:1.15rem; font-weight:800; }
.review-list{ margin:18px 0 0; padding-left:20px; }
.review-list li{ margin-bottom:14px; color:var(--unity-text-soft); line-height:1.7; }

.admin-toolbar{
  display:flex; justify-content:space-between; gap:16px; flex-wrap:wrap; margin-bottom:18px;
}
.admin-toolbar input,
.admin-toolbar select{
  min-height:46px; padding:0 14px; border-radius:12px;
  border:1px solid rgba(255,255,255,.12); background:rgba(255,255,255,.06); color:var(--unity-white);
}
.table-wrap{
  overflow-x:auto; border-radius:18px; border:1px solid rgba(255,255,255,.08);
}
table{
  width:100%; border-collapse:collapse; min-width:980px; background:rgba(255,255,255,.03);
}
thead{ background:rgba(255,255,255,.06); }
th, td{
  padding:14px 16px; text-align:left; border-bottom:1px solid rgba(255,255,255,.06); color:var(--unity-text-soft);
}
th{ color:var(--unity-white); font-size:.86rem; text-transform:uppercase; letter-spacing:.06em; }
tbody tr:hover{ background:rgba(255,255,255,.045); }

@media (max-width: 980px){
  .site-header{ height:auto; padding:14px 0; }
  .site-header .container, .portal-top{ flex-direction:column; align-items:flex-start; }
  .dashboard-grid, .catalog-grid, .intro-grid{ grid-template-columns:1fr; }
  .meta-row, .result-grid{ grid-template-columns:repeat(2, minmax(140px, 1fr)); }
  .user-panel{ width:100%; }
}
@media (max-width: 700px){
  .container{ width:min(calc(100% - 24px), var(--container)); }
  .brand img{ height:54px; }
  .nav{ gap:14px 18px; }
  .hero .container{ padding:48px 0 60px; }
  .hero h1{ font-size:clamp(2.2rem, 9vw, 3.7rem); line-height:1.02; }
  .hero p{ margin-top:20px; font-size:.98rem; line-height:1.7; }
  .portal-shell{ width:min(calc(100% - 24px), 1160px); padding:18px; }
  .section-block{ padding:18px; }
  .meta-row, .result-grid{ grid-template-columns:1fr; }
  .question{ padding:18px; }
  .option{ padding:12px 14px; }
  .hero-actions, .form-actions, .result-actions, .user-actions, .toolbar-group{
    flex-direction:column;
  }
  .btn, .btn-primary, .btn-secondary, button{ width:100%; }
}
