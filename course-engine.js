(() => {
  if (typeof MC === 'undefined' || !Array.isArray(MC.stages)) return;

  const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
  const KEY='learningModernControlProgressV1';
  let progress={completed:{},last:{stage:0,lesson:0}};
  try{progress={...progress,...JSON.parse(localStorage.getItem(KEY)||'{}')}}catch(_){}
  const save=()=>localStorage.setItem(KEY,JSON.stringify(progress));
  const key=(s,l)=>s+'-'+l;
  const isDone=(s,l)=>!!progress.completed[key(s,l)];
  const stageDone=s=>s.lessons.filter((_,i)=>isDone(s.id,i)).length;
  const pct=(a,b)=>b?Math.round(a/b*100):0;

  function injectStyle(){
    const s=document.createElement('style');s.id='preStitchCourseStyles';s.textContent=`
      .mc13-wrap{max-width:1440px;margin:0 auto;padding:32px}
      .mc13-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:20px}
      .mc13-head small{font-size:10px;letter-spacing:.12em;font-weight:800;color:#005db7}.mc13-head h2{font-size:30px;line-height:1.1;margin:5px 0;color:#17233a}.mc13-head p{max-width:800px;font-size:13px;color:#5c6472}
      .mc13-progress{min-width:220px}.mc13-progress b{float:right}.mc13-bar{height:7px;background:#e2e8f1;border-radius:99px;overflow:hidden;clear:both;margin-top:6px}.mc13-bar i{display:block;height:100%;background:#006c4b}
      .mc13-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.mc13-card{border:1px solid #dce2eb;background:white;border-radius:13px;padding:18px;text-align:left;box-shadow:0 4px 14px rgba(25,49,80,.05);cursor:pointer}.mc13-card:nth-child(4n+1){border-top:4px solid #267ed1}.mc13-card:nth-child(4n+2){border-top:4px solid #20a273}.mc13-card:nth-child(4n+3){border-top:4px solid #8b69d8}.mc13-card:nth-child(4n+4){border-top:4px solid #e6a33a}.mc13-card h3{font-size:16px;margin:9px 0 6px;color:#18243b}.mc13-card p{font-size:12px;color:#626a78;line-height:1.55}.mc13-card .meta{display:flex;justify-content:space-between;font-size:10px;color:#4f5c70}.mc13-card .mini{height:5px;background:#edf1f6;border-radius:99px;overflow:hidden;margin-top:12px}.mc13-card .mini i{display:block;height:100%;background:#006c4b}
      .mc-course-overlay{position:fixed;inset:0;z-index:5000;background:#f6f8fc;overflow:auto}.mc-course-top{position:sticky;top:0;z-index:2;height:64px;display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:14px;padding:0 20px;background:white;border-bottom:1px solid #dfe5ee}.mc-course-top button{border:1px solid #cad5e1;background:#f6f9fc;border-radius:8px;padding:9px 12px;font-weight:700}.mc-course-top div{text-align:center}.mc-course-top strong{display:block}.mc-course-top small{font-size:10px;color:#6b7482}
      .mc-stage-shell{max-width:1380px;margin:0 auto;padding:22px;display:grid;grid-template-columns:280px 1fr;gap:18px}.mc-stage-side,.mc-stage-main{background:white;border:1px solid #dde4ec;border-radius:12px}.mc-stage-side{padding:13px;height:calc(100vh - 108px);position:sticky;top:84px;overflow:auto}.mc-stage-side h2{font-size:18px}.mc-stage-side p{font-size:11px;color:#67707c}.mc-lessons{display:grid;gap:6px;margin-top:12px}.mc-lessons button{display:grid;grid-template-columns:28px 1fr auto;gap:8px;align-items:center;border:1px solid #e0e6ed;background:#f9fbfd;border-radius:8px;padding:9px;text-align:left}.mc-lessons button span{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;background:#e8f1fb;font-size:10px}.mc-lessons button b{font-size:10px}.mc-lessons em{font-style:normal;color:#087b57}
      .mc-stage-main{padding:24px}.mc-stage-main h1{font-size:32px;margin:5px 0}.mc-stage-main>p{font-size:13px;color:#616c7b}.mc-stage-main .start{margin-top:18px;border:0;background:#005db7;color:white;border-radius:8px;padding:11px 14px;font-weight:800}
      .mc-lesson-shell{max-width:1350px;margin:0 auto;padding:22px;display:grid;grid-template-columns:240px 1fr;gap:16px}.mc-lesson-side{background:white;border:1px solid #dde4ec;border-radius:12px;padding:12px;height:calc(100vh - 108px);position:sticky;top:84px;overflow:auto}.mc-lesson-side button{width:100%;border:0;background:transparent;border-radius:7px;padding:8px;text-align:left;font-size:10px}.mc-lesson-side button.active,.mc-lesson-side button:hover{background:#eaf2ff}
      .mc-doc{min-width:0}.mc-title,.mc-sec{background:white;border:1px solid #dde4ec;border-radius:12px;padding:20px;margin-bottom:10px}.mc-title h1{font-size:28px;margin:6px 0}.mc-title p,.mc-sec p,.mc-sec li{font-size:12px;color:#4f5e70;line-height:1.65}.mc-sec h2{font-size:17px;margin:4px 0 8px}.mc-label{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#005db7;font-weight:800}.mc-sec.math{background:#eef6ff}.mc-sec.example{background:#eef9f3}.mc-sec.practice{background:#f0faf5}.mc-sec.debug{background:#fff8e9}.mc-sec.real{background:#f6f1ff}.mc-sec.matlab{background:#edf8fa}.mc-sec pre{white-space:pre-wrap;background:#102535;color:#a1efc2;padding:12px;border-radius:8px;font-size:11px;overflow:auto}.mc-eq{font-family:Georgia,serif;font-size:18px!important;color:#17324f!important}
      .mc-qa details{border:1px solid #dce5ee;border-radius:8px;padding:10px;margin:7px 0;background:#fbfcfe}.mc-quiz button{display:block;width:100%;border:1px solid #d4dee8;background:#f9fbfd;border-radius:8px;padding:10px;margin:6px 0;text-align:left}.mc-quiz button.ok{background:#eaf8f1;border-color:#76c7a4}.mc-quiz button.bad{background:#fff0ee;border-color:#eaa59f}.mc-nav{display:flex;justify-content:space-between;gap:10px;margin-top:14px}.mc-nav button{border:1px solid #ccd8e4;background:white;border-radius:8px;padding:10px 14px;font-weight:700}.mc-nav .primary{background:#005db7;color:#fff;border-color:#005db7}
      @media(max-width:900px){.mc13-grid{grid-template-columns:1fr 1fr}.mc-stage-shell,.mc-lesson-shell{grid-template-columns:1fr}.mc-stage-side,.mc-lesson-side{position:static;height:auto;max-height:300px}}
      @media(max-width:620px){.mc13-wrap{padding:18px}.mc13-grid{grid-template-columns:1fr}.mc13-head{align-items:start;flex-direction:column}.mc13-progress{width:100%}.mc-course-top{grid-template-columns:auto 1fr}.mc-course-top .home{display:none}}
    `;document.head.appendChild(s);
  }

  function renderTheoryDocs(){
    const view=$('#view-theory'); if(!view)return;
    const formulas=[
      ['Stage 00','Mathematics Refresher','Matrices, determinants, eigenvalues, differential equations, Laplace transforms.','det(λI-A)=0 · L{ẋ}=sX(s)-x(0)',0],
      ['Stage 01','Control Systems Foundations','Feedback, open vs closed loop, signals, stability, performance, sampling, block diagrams.','T(s)=G(s)/(1+G(s)H(s))',1],
      ['Stage 02','Mathematical Modeling','Mass-spring-damper, RLC, DC motor, nonlinear equilibrium, linearization.','m ẍ+b ẋ+kx=f(t)',2],
      ['Stage 03','Classical Control Refresher','Poles/zeros, steady-state error, second-order response, Routh, root locus, Bode, PID.','Kp, Kv, Ka · Ts≈4/(ζωn)',3],
      ['Stage 04','State-Space Fundamentals','State variables, A/B/C/D construction, realizations, transfer/state conversion, similarity.','ẋ=Ax+Bu · y=Cx+Du',4],
      ['Stage 05','State-Space Analysis','Matrix exponential, forced response, modes, Jordan form, minimality.','x(t)=e^{At}x(0)+∫e^{A(t-τ)}Bu(τ)dτ',5],
      ['Stage 06','Controllability & Observability','Rank tests, PBH tests, decomposition, sensor/actuator placement.','𝒞=[B AB … Aⁿ⁻¹B] · 𝒪=[C;CA;…;CAⁿ⁻¹]',6],
      ['Stage 07','State Feedback & Pole Placement','Full-state feedback, desired poles, Ackermann, tracking, MIMO pole placement.','u=-Kx+Nr · Acl=A-BK',7],
      ['Stage 08','State Observers','Luenberger observers, observer error, separation principle, reduced-order observers.','x̂̇=Ax̂+Bu+L(y-Cx̂)',8],
      ['Stage 09','Stability & Lyapunov Methods','Hurwitz stability, Lyapunov intuition, positive definiteness, continuous/discrete equations.','AᵀP+PA=-Q',9],
      ['Stage 10','Optimal Control / LQR','Quadratic cost, weight selection, Riccati equation, LQR, LQI.','J=∫(xᵀQx+uᵀRu)dt',10],
      ['Stage 11','MATLAB & Simulink Labs','Control Toolbox, model conversion, C/O labs, pole placement, observers, LQR, Simulink.','ss · tf · ctrb · obsv · place · lqr',11],
      ['Stage 12','Advanced Topics & Projects','Digital control, Kalman filtering, MIMO, robustness, MPC, capstone projects.','x[k+1]=Adx[k]+Bdu[k]',12]
    ];
    view.innerHTML=`<div class="max-w-[1280px] mx-auto px-gutter-desktop py-unit-8">
      <span class="font-label-caps text-label-caps text-primary">THEORY & MATH DOCS</span>
      <h1 class="font-headline-section text-headline-section mt-2">Complete Modern Control Reference</h1>
      <p class="text-[13px] text-on-surface-variant mt-2 max-w-4xl">This reference now follows the complete 13-stage curriculum. Use it as a compact review, then open the corresponding stage for intuition, derivations, worked examples, practice, debugging, real-world applications, MATLAB, and quizzes.</p>
      <div class="grid md:grid-cols-2 xl:grid-cols-3 gap-unit-4 mt-6">
      ${formulas.map(x=>`<article class="bg-white rounded-xl p-unit-5 shadow-sm border border-outline-variant/40">
        <div class="flex items-center justify-between gap-2"><span class="text-primary text-[10px] font-bold">${x[0]}</span><span class="text-[9px] text-on-surface-variant">${MC.stages[x[4]].lessons.length} lessons</span></div>
        <h3 class="font-title-card mt-2">${x[1]}</h3>
        <p class="text-[12px] text-on-surface-variant mt-2">${x[2]}</p>
        <div class="mt-3 p-unit-3 rounded bg-primary-fixed font-code-mono text-[11px]">${x[3]}</div>
        <button type="button" class="mt-4 px-unit-3 py-unit-2 rounded bg-primary text-on-primary text-[10px] font-bold" data-theory-stage="${x[4]}" onclick="window.openModernControlStage && window.openModernControlStage(${x[4]})">Open Full Stage →</button>
      </article>`).join('')}
      </div>
    </div>`;
    $('[data-theory-stage]',view).forEach(b=>b.onclick=()=>openStage(Number(b.dataset.theoryStage)));
  }

  function renderBenchmarks(){
    const view=document.querySelector('#view-benchmarks'); if(!view)return;
    const stageCards=MC.stages.map(s=>{
      const sample=s.lessons.slice(0,Math.min(3,s.lessons.length));
      return `<section class="bg-white rounded-xl shadow-sm border border-outline-variant/40 overflow-hidden">
        <div class="p-unit-5 bg-surface-container-low flex items-start justify-between gap-4">
          <div><span class="text-primary text-[10px] font-bold">STAGE ${String(s.id).padStart(2,'0')}</span><h3 class="font-title-card mt-1">${s.title}</h3><p class="text-[11px] text-on-surface-variant mt-1">${s.description}</p></div>
          <button type="button" class="px-unit-3 py-unit-2 rounded bg-primary text-on-primary text-[10px] font-bold whitespace-nowrap" data-open-benchmark-stage="${s.id}">Open Stage →</button>
        </div>
        <div class="p-unit-5 grid gap-unit-3">
          ${sample.map((l,i)=>`<article class="rounded-lg border border-outline-variant/40 p-unit-4 bg-surface-container-lowest">
            <div class="flex items-center justify-between gap-3"><strong class="text-[12px]">${i+1}. ${l.title}</strong><span class="text-[9px] text-on-surface-variant">Lesson ${i+1}</span></div>
            <p class="text-[12px] mt-2">${l.check.question}</p>
            <div class="grid gap-unit-2 mt-3">${l.check.choices.map((choice,j)=>`<button type="button" class="bench-choice p-unit-3 rounded-lg border border-outline-variant bg-surface-container text-left text-[11px]" data-stage="${s.id}" data-lesson="${i}" data-choice="${j}">${String.fromCharCode(65+j)}. ${choice}</button>`).join('')}</div>
            <div class="bench-feedback text-[10px] mt-3" data-feedback="${s.id}-${i}"></div>
            <button type="button" class="mt-3 px-unit-3 py-unit-2 rounded bg-surface-container-high text-[10px] font-bold" data-review-lesson="${s.id}-${i}">Review Full Lesson →</button>
          </article>`).join('')}
        </div>
      </section>`;
    }).join('');
    view.innerHTML=`<div class="max-w-[1280px] mx-auto px-gutter-desktop py-unit-8"><span class="font-label-caps text-label-caps text-primary">BENCHMARKS & PROBLEM SETS</span><h1 class="font-headline-section text-headline-section mt-2">13-Stage Self-Study Checkpoints</h1><p class="text-[13px] text-on-surface-variant mt-2 max-w-4xl">Checkpoint questions are drawn directly from the full curriculum. Use them to test understanding, then jump back to the related lesson when needed.</p><div class="grid lg:grid-cols-2 gap-unit-4 mt-6">${stageCards}</div></div>`;

    view.querySelectorAll('.bench-choice').forEach(b=>b.addEventListener('click',()=>{
      const s=Number(b.dataset.stage),l=Number(b.dataset.lesson),choice=Number(b.dataset.choice);
      const lesson=MC.stages.find(x=>x.id===s)?.lessons[l]; if(!lesson)return;
      const group=[...b.parentElement.querySelectorAll('.bench-choice')];
      group.forEach(x=>x.classList.remove('selected-correct','selected-wrong'));
      b.classList.add(choice===lesson.check.answer?'selected-correct':'selected-wrong');
      if(choice!==lesson.check.answer && group[lesson.check.answer]) group[lesson.check.answer].classList.add('selected-correct');
      const fb=view.querySelector('[data-feedback="'+s+'-'+l+'"]');
      if(fb) fb.textContent=choice===lesson.check.answer?'Correct. Explain the reason before moving on.':'Not correct. Review the full lesson, then try again.';
    }));
    view.querySelectorAll('[data-open-benchmark-stage]').forEach(b=>b.addEventListener('click',()=>openStage(Number(b.dataset.openBenchmarkStage))));
    view.querySelectorAll('[data-review-lesson]').forEach(b=>b.addEventListener('click',()=>{const [s,l]=b.dataset.reviewLesson.split('-').map(Number);openLesson(s,l);}));
  }

  function renderCurriculum(){
    const mount=$('#full-course-grid'), cards=$('#learning-path-cards'); if(!mount||!cards)return;
    const groups=[
      {title:'Foundation & Refresher',subtitle:'Rebuild the knowledge you may have forgotten.',stages:[0,1,2,3],tone:'foundation'},
      {title:'Modern Control Core',subtitle:'Learn the state-space tools used in modern control design.',stages:[4,5,6,7,8],tone:'core'},
      {title:'Advanced Design & Applications',subtitle:'Stability, optimal control, MATLAB labs, digital control, and projects.',stages:[9,10,11,12],tone:'advanced'}
    ];
    cards.innerHTML=`<div class="grid md:grid-cols-3 gap-unit-4">${groups.map((g,gi)=>{
      const total=g.stages.reduce((n,id)=>n+MC.stages[id].lessons.length,0),done=g.stages.reduce((n,id)=>n+stageDone(MC.stages[id]),0);
      return `<article class="bg-white rounded-xl p-unit-5 shadow-md border border-outline-variant/40">
        <span class="text-[10px] font-bold text-primary">PATH ${gi+1}</span>
        <h3 class="font-headline-modal text-headline-modal mt-2">${g.title}</h3>
        <p class="text-[11px] text-on-surface-variant mt-2">${g.subtitle}</p>
        <div class="mt-4 h-2 bg-surface-container rounded-full overflow-hidden"><div class="h-full bg-secondary" style="width:${pct(done,total)}%"></div></div>
        <div class="flex justify-between mt-2 text-[9px] text-on-surface-variant"><span>${done}/${total} lessons completed</span><span>${pct(done,total)}%</span></div>
        <button type="button" class="mt-4 px-unit-4 py-unit-2 rounded-lg bg-primary text-on-primary font-bold text-[10px]" data-path-first="${g.stages[0]}">Start / Continue →</button>
      </article>`;
    }).join('')}</div>`;

    mount.innerHTML=`<div class="max-w-[1320px] mx-auto px-gutter-desktop py-unit-6">${groups.map((g,gi)=>`
      <section class="mb-unit-8">
        <div class="flex items-end justify-between gap-4 mb-unit-4"><div><span class="text-[10px] font-bold text-primary">PATH ${gi+1}</span><h2 class="font-headline-section text-headline-section mt-1">${g.title}</h2><p class="text-[11px] text-on-surface-variant mt-1">${g.subtitle}</p></div></div>
        <div class="mc13-grid">${g.stages.map(id=>{const s=MC.stages[id],d=stageDone(s);return `<button class="mc13-card" data-mc-stage="${id}"><div class="meta"><span>STAGE ${String(id).padStart(2,'0')} · ${s.level}</span><span>${d}/${s.lessons.length}</span></div><h3>${s.title}</h3><p>${s.description}</p><div class="mini"><i style="width:${pct(d,s.lessons.length)}%"></i></div></button>`}).join('')}</div>
      </section>`).join('')}</div>`;
    $$('[data-mc-stage]',mount).forEach(b=>b.onclick=()=>openStage(Number(b.dataset.mcStage)));
    $$('[data-path-first]',cards).forEach(b=>b.onclick=()=>openStage(Number(b.dataset.pathFirst)));
  }

  function overlayBase(title,sub,body){
    let o=$('#mcCourseOverlay'); if(!o){o=document.createElement('div');o.id='mcCourseOverlay';o.className='mc-course-overlay';document.body.appendChild(o)}
    o.innerHTML=`<header class="mc-course-top"><button data-mc-back>← Back</button><div><strong>${title}</strong><small>${sub}</small></div><button class="home" data-mc-home>Home</button></header>${body}`;
    document.body.style.overflow='hidden';o.scrollTop=0;return o;
  }
  function closeOverlay(){const o=$('#mcCourseOverlay');if(o)o.remove();document.body.style.overflow='';renderCurriculum()}
  function openStage(id){
    const s=MC.stages.find(x=>x.id===id);if(!s)return;
    progress.last={stage:id,lesson:0};save();
    const o=overlayBase(s.title,`Stage ${id} · ${s.level}`,`<div class="mc-stage-shell"><aside class="mc-stage-side"><small>STAGE ${String(id).padStart(2,'0')}</small><h2>${s.title}</h2><p>${s.description}</p><div class="mc-lessons">${s.lessons.map((l,i)=>`<button data-mc-lesson="${i}"><span>${i+1}</span><b>${l.title}</b><em>${isDone(id,i)?'✓':''}</em></button>`).join('')}</div></aside><main class="mc-stage-main"><small class="mc-label">${s.level} · ${s.lessons.length} lessons</small><h1>${s.title}</h1><p>${s.description}</p><button class="start" data-mc-start>${stageDone(s)?'Continue Stage →':'Start Stage →'}</button></main></div>`);
    $('[data-mc-back]',o).onclick=closeOverlay;$('[data-mc-home]',o).onclick=closeOverlay;
    $$('[data-mc-lesson]',o).forEach(b=>b.onclick=()=>openLesson(id,Number(b.dataset.mcLesson)));
    $('[data-mc-start]',o).onclick=()=>{let i=s.lessons.findIndex((_,i)=>!isDone(id,i));if(i<0)i=0;openLesson(id,i)};
  }
  function openLesson(stageId,i){
    const s=MC.stages.find(x=>x.id===stageId),l=s?.lessons[i];if(!l)return;
    progress.last={stage:stageId,lesson:i};save();
    const o=overlayBase(l.title,`Stage ${stageId} · Lesson ${i+1}/${s.lessons.length}`,`<div class="mc-lesson-shell"><aside class="mc-lesson-side">${s.lessons.map((x,j)=>`<button class="${j===i?'active':''}" data-jump="${j}">${isDone(stageId,j)?'✓ ':''}${j+1}. ${x.title}</button>`).join('')}</aside><article class="mc-doc"><section class="mc-title"><span class="mc-label">STAGE ${String(stageId).padStart(2,'0')} · LESSON ${i+1}</span><h1>${l.title}</h1><p>Follow the full sequence: intuition, theory, mathematics, example, practice, debugging, real-world engineering, Q&A, MATLAB, and quiz.</p></section><section class="mc-sec"><span class="mc-label">Intuition</span><h2>Start with the idea</h2><p>${l.intuition}</p></section><section class="mc-sec"><span class="mc-label">Theory</span><h2>What the concept means</h2><p>${l.theory}</p></section><section class="mc-sec math"><span class="mc-label">Mathematics</span><h2>Equation to remember</h2><p class="mc-eq">${l.math}</p></section><section class="mc-sec example"><span class="mc-label">Worked example</span><h2>Follow one example</h2><p>${l.example}</p></section><section class="mc-sec practice"><span class="mc-label">Practice</span><h2>Now do it yourself</h2><p>${l.practice}</p></section><section class="mc-sec debug"><span class="mc-label">Debugging / common mistake</span><h2>Find what goes wrong</h2><p>${l.debug}</p></section><section class="mc-sec real"><span class="mc-label">Real-world engineering problem</span><h2>Why an engineer cares</h2><p>${l.realWorld}</p></section><section class="mc-sec mc-qa"><span class="mc-label">Q&A</span><h2>Check understanding</h2>${l.qa.map(q=>`<details><summary>${q.question}</summary><p>${q.answer}</p></details>`).join('')}</section><section class="mc-sec matlab"><span class="mc-label">MATLAB / Simulink</span><h2>Verify with software</h2><pre>${l.matlab}</pre></section><section class="mc-sec mc-quiz"><span class="mc-label">Quiz</span><h2>${l.check.question}</h2>${l.check.choices.map((x,j)=>`<button data-answer="${j}">${String.fromCharCode(65+j)}. ${x}</button>`).join('')}<p data-feedback>Choose an answer.</p></section><div class="mc-nav"><button data-prev ${i===0?'disabled':''}>← Previous</button><button class="primary" data-next>${isDone(stageId,i)?'Next Lesson →':'Mark Complete & Continue →'}</button></div></article></div>`);
    $('[data-mc-back]',o).onclick=()=>openStage(stageId);$('[data-mc-home]',o).onclick=closeOverlay;
    $$('[data-jump]',o).forEach(b=>b.onclick=()=>openLesson(stageId,Number(b.dataset.jump)));
    $$('[data-answer]',o).forEach(b=>b.onclick=()=>{const j=Number(b.dataset.answer);$$('[data-answer]',o).forEach(x=>x.classList.remove('ok','bad'));b.classList.add(j===l.check.answer?'ok':'bad');if(j!==l.check.answer)$$('[data-answer]',o)[l.check.answer].classList.add('ok');$('[data-feedback]',o).textContent=j===l.check.answer?'Correct. Explain why before continuing.':'Review the related section and try again.'});
    $('[data-prev]',o).onclick=()=>i>0&&openLesson(stageId,i-1);
    $('[data-next]',o).onclick=()=>{progress.completed[key(stageId,i)]=true;save();if(i<s.lessons.length-1)openLesson(stageId,i+1);else openStage(stageId)};
  }

  window.openModernControlStage=openStage;
  window.openModernControlLesson=openLesson;
  injectStyle();
  renderCurriculum();
  renderTheoryDocs();
  try{renderBenchmarks(); setTimeout(()=>{const v=$('#view-benchmarks');if(v && !v.querySelector('.bench-choice')) renderBenchmarks();},50);}catch(err){
    const view=$('#view-benchmarks');
    if(view) view.innerHTML='<div class="max-w-[1100px] mx-auto px-gutter-desktop py-unit-8"><h1 class="font-headline-section text-headline-section">Benchmarks & Problem Sets</h1><p class="mt-3 text-[13px]">The checkpoint module could not load. Refresh the page once. If this remains visible, the curriculum data did not initialize correctly.</p></div>';
    console.error(err);
  }
  const navResume=document.createElement('button');
  navResume.textContent='Resume Full Course';navResume.className='px-unit-3 py-unit-2 rounded bg-secondary text-on-secondary text-[11px]';
  navResume.onclick=()=>openLesson(progress.last.stage||0,progress.last.lesson||0);
  document.querySelector('header nav')?.appendChild(navResume);
})();