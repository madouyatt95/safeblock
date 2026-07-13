const q=(selector,parent=document)=>parent.querySelector(selector);
const qa=(selector,parent=document)=>[...parent.querySelectorAll(selector)];

const roles={
  Habitant:{initials:"AM",name:"Amine D.",firstName:"Amine",symbol:"H",verification:"Profil citoyen",score:80,greeting:'Bonjour Amine <em>👋</em>',subtitle:"Le quartier est calme. Votre vigilance aide à préserver ce climat.",heroText:"Les signaux sont en baisse. Deux actions de proximité ont lieu aujourd’hui.",actionTitle:"Agir près de chez moi",quick1:"Parler à un médiateur",quick2:"Signaler sans m’exposer",quick3:"Trouver un lieu sûr",access:[]},
  Jeune:{initials:"YS",name:"Yasmine S.",firstName:"Yasmine",symbol:"J",verification:"Espace jeune protégé",score:78,greeting:'Salut Yasmine <em>✦</em>',subtitle:"Ici, ta parole compte et tu peux aider sans te mettre en danger.",heroText:"Une tension circule en ligne. Des médiateurs sont disponibles pour en parler sans jugement.",actionTitle:"Besoin de quoi ?",quick1:"Parler sans pression",quick2:"Aider un ami",quick3:"Me mettre à l’abri",access:[]},
  Parent:{initials:"SM",name:"Samira M.",firstName:"Samira",symbol:"P",verification:"Profil parent",score:82,greeting:'Bonjour Samira <em>👋</em>',subtitle:"Votre quartier est calme. Restons attentifs ensemble.",heroText:"Les signaux sont en baisse. Deux médiations préventives sont actives aujourd’hui.",actionTitle:"Agir simplement",quick1:"Parler à un médiateur",quick2:"Signaler une situation",quick3:"Trouver un lieu sûr",access:[]},
  Médiateur:{initials:"KB",name:"Karim B.",firstName:"Karim",symbol:"M",verification:"Médiateur vérifié",score:76,greeting:'Bonjour Karim <em>●</em>',subtitle:"Trois situations demandent une attention professionnelle.",heroText:"Deux signaux attendent une validation et une intervention est actuellement en route.",actionTitle:"Mes priorités terrain",quick1:"Ouvrir la file de validation",quick2:"Créer une coordination",quick3:"Voir les équipes proches",access:["professional","admin"]},
  Association:{initials:"AD",name:"Aïcha D.",firstName:"Aïcha",symbol:"A",verification:"Association vérifiée",score:79,greeting:'Bonjour Aïcha <em>👋</em>',subtitle:"Vos partenaires locaux sont prêts à se coordonner.",heroText:"Trois activités de prévention sont prévues et deux médiateurs sont disponibles.",actionTitle:"Coordonner mon réseau",quick1:"Parler aux partenaires",quick2:"Ajouter un signal terrain",quick3:"Proposer une activité",access:["professional"]},
  Commerçant:{initials:"NB",name:"Nora B.",firstName:"Nora",symbol:"C",verification:"Commerce partenaire",score:83,greeting:'Bonjour Nora <em>👋</em>',subtitle:"Votre commerce est signalé disponible comme lieu refuge.",heroText:"Le secteur est calme. Votre point refuge est visible de façon générale jusqu’à 20h30.",actionTitle:"Mon commerce partenaire",quick1:"Contacter un médiateur",quick2:"Signaler autour du commerce",quick3:"Gérer ma disponibilité",access:[]},
  Collectivité:{initials:"ML",name:"Malik L.",firstName:"Malik",symbol:"CO",verification:"Collectivité vérifiée",score:82,greeting:'Bonjour Malik <em>👋</em>',subtitle:"La tendance territoriale reste favorable cette semaine.",heroText:"Le temps moyen de prise en charge baisse de quatre minutes et 91% des situations sont résolues.",actionTitle:"Piloter la prévention",quick1:"Ouvrir le tableau de bord",quick2:"Créer un point de vigilance",quick3:"Voir les ressources terrain",access:["professional","admin"]}
};

const roleJourneys={
  Habitant:{context:"Vie de quartier",focus:"Observer sans s’exposer",indexContext:"Indice du quartier",quick:[{title:"Parler à un médiateur",description:"Échange privé et confidentiel",command:"contact"},{title:"Signaler sans m’exposer",description:"Parcours guidé et position protégée",command:"report"},{title:"Trouver un lieu sûr",description:"Lieux ouverts à proximité",command:"safe"}]},
  Jeune:{context:"Espace jeune protégé",focus:"Parler, aider, se mettre à l’abri",indexContext:"Climat autour de moi",quick:[{title:"Parler sans pression",description:"Un médiateur jeunesse vous écoute",command:"young-support"},{title:"Aider un ami",description:"Partager une inquiétude sans l’identifier",command:"minor-report"},{title:"Me mettre à l’abri",description:"Voir les lieux sûrs et adultes référents",command:"safe"}]},
  Parent:{context:"Espace parent",focus:"Écouter, comprendre et orienter",indexContext:"Indice du quartier",quick:[{title:"Parler à un médiateur",description:"Conseil confidentiel pour une situation",command:"contact"},{title:"Signaler une situation",description:"Sans nommer ni exposer un mineur",command:"report"},{title:"Rejoindre les parents",description:"Canal modéré et temps d’échange",command:"parents"}]},
  Médiateur:{context:"Console professionnelle",focus:"Qualifier, apaiser et coordonner",indexContext:"Veille professionnelle",quick:[{title:"Ouvrir la file d’examen",description:"Signaux à qualifier et affecter",command:"admin"},{title:"Voir l’intervention active",description:"Équipes, étapes et canal privé",command:"intervention"},{title:"Consulter les zones agrégées",description:"Carte protégée du territoire",command:"map"}]},
  Association:{context:"Réseau associatif",focus:"Coordonner les ressources locales",indexContext:"Dynamique du territoire",quick:[{title:"Parler aux partenaires",description:"Canal associations modéré",command:"associations"},{title:"Ajouter un signal terrain",description:"Observation professionnelle protégée",command:"report"},{title:"Voir les activités",description:"Ateliers et disponibilités du jour",command:"activities"}]},
  Commerçant:{context:"Commerce partenaire",focus:"Accueillir, orienter et alerter",indexContext:"Climat autour du commerce",quick:[{title:"Contacter un médiateur",description:"Ligne directe partenaire",command:"contact"},{title:"Signaler autour du commerce",description:"Zone publique volontairement floutée",command:"report"},{title:"Gérer ma disponibilité",description:"Mettre à jour le statut lieu refuge",command:"availability"}]},
  Collectivité:{context:"Pilotage territorial",focus:"Décider sur des données agrégées",indexContext:"Indicateur territorial",quick:[{title:"Ouvrir le tableau de bord",description:"Indicateurs, validation et ressources",command:"admin"},{title:"Créer un point de vigilance",description:"Qualification professionnelle obligatoire",command:"report"},{title:"Voir les ressources terrain",description:"Lieux sûrs et équipes disponibles",command:"map"}]}
};

const roleDescriptions={
  Habitant:"Observer, signaler, rester en sécurité",Jeune:"Parler, aider un ami, être protégé",Parent:"Écouter, comprendre, protéger",Médiateur:"Valider, intervenir, apaiser",Association:"Coordonner, accompagner, prévenir",Commerçant:"Accueillir, orienter, alerter",Collectivité:"Piloter, mobiliser, mesurer"
};

const channelData={
  quartier:{title:"Canal quartier",avatar:"#",meta:"38 membres · Modéré par Aïcha",messages:[
    {author:"Aïcha",initials:"AD",time:"15:42",text:"L’atelier de dialogue commence à 17h30 à la maison de quartier."},
    {author:"Karim",initials:"KB",time:"15:48",text:"Merci. La situation du square est prise en charge, évitez de relayer des informations non confirmées."},
    {system:"Un rappel de la charte de modération a été publié."},
    {author:"Vous",initials:"SM",time:"15:51",text:"Merci pour l’information. Je partagerai uniquement le lien officiel.",me:true}
  ]},
  parents:{title:"Canal parents",avatar:"P",meta:"16 membres · Modéré par Karim",messages:[{author:"Karim",initials:"KB",time:"15:20",text:"Temps d’échange entre parents à 19h. Vous pouvez déposer vos questions en privé."},{author:"Fatou",initials:"FD",time:"15:31",text:"Merci, je serai présente ce soir."}]},
  jeunes:{title:"Canal jeunes",avatar:"J",meta:"24 membres · 2 modérateurs",messages:[{author:"Maya",initials:"MY",time:"15:10",text:"Le nouveau studio musique est ouvert à partir de 18h."},{author:"Yanis · Modérateur",initials:"YA",time:"15:18",text:"Rappel : si une rumeur vous inquiète, envoyez-la en privé à un médiateur au lieu de la repartager."}]},
  mediateurs:{title:"Groupe médiateurs",avatar:"M",meta:"8 membres vérifiés · 3 en ligne",messages:[{author:"Karim",initials:"KB",time:"15:36",text:"Je prends la coordination #INT-382. Arrivée estimée dans 4 minutes."},{author:"Aïcha",initials:"AD",time:"15:39",text:"Je contacte la maison de quartier et reste disponible dans le canal opérationnel."}]},
  associations:{title:"Canal associations",avatar:"A",meta:"12 partenaires · Modéré",messages:[{author:"Passerelles",initials:"PA",time:"14:50",text:"Il reste huit places pour l’atelier de ce soir."},{author:"Maison des jeunes",initials:"MJ",time:"15:02",text:"Nous confirmons l’ouverture de la salle jusqu’à 21h."}]},
  commercants:{title:"Commerçants refuges",avatar:"C",meta:"8 établissements ouverts",messages:[{author:"Nora",initials:"NB",time:"15:12",text:"Le café est disponible comme point refuge jusqu’à 20h30."},{author:"Karim",initials:"KB",time:"15:15",text:"Merci. Votre disponibilité a été mise à jour sur la carte agrégée."}]}
};

const signals={
  s1:{title:"Tensions verbales",status:"À corroborer",zone:"Secteur Sentes · zone approximative de 300 m",confirms:2,color:"#e8a140",stage:2},
  s2:{title:"Différend entre groupes",status:"Médiation en cours",zone:"Secteur Bruyères · zone approximative de 500 m",confirms:4,color:"#57aee3",stage:3},
  s3:{title:"Rumeur numérique",status:"Situation stabilisée",zone:"Secteur Nord · position non applicable",confirms:1,color:"#43bd7e",stage:4}
};

const notificationData={
  common:[
    {icon:"i-check",title:"Signalement examiné",text:"Votre observation a été transmise à une équipe habilitée. Aucun détail n’est affiché ici.",time:"Il y a 12 min"},
    {icon:"i-users",title:"Atelier de proximité",text:"Le temps d’échange de 17h30 dispose encore de places.",time:"Il y a 1 h"}
  ],
  Jeune:{icon:"i-chat",title:"Un médiateur jeunesse est disponible",text:"Vous pouvez écrire sans donner le nom de la personne concernée.",time:"Maintenant"},
  Médiateur:{icon:"i-shield",title:"Deux signaux à qualifier",text:"La file professionnelle a été mise à jour, sans notification publique.",time:"Il y a 4 min"},
  Association:{icon:"i-users",title:"Coordination partenaire",text:"La maison de quartier confirme son ouverture jusqu’à 21h.",time:"Il y a 8 min"},
  Commerçant:{icon:"i-pin",title:"Statut lieu sûr actif",text:"Votre disponibilité générale est visible jusqu’à 20h30.",time:"Il y a 3 min"},
  Collectivité:{icon:"i-dashboard",title:"Bilan territorial actualisé",text:"Le délai moyen de première réponse est de huit minutes.",time:"Il y a 15 min"},
  default:{icon:"i-shield",title:"Situation prise en charge",text:"Une médiation de proximité est en cours. Aucun déplacement n’est demandé.",time:"Il y a 6 min"}
};

const impactPeriods={
  "7":{response:"9 min",deescalated:"71%",orientations:"8",satisfaction:"4,5/5",followup:"86%",recurrence:"13%"},
  "30":{response:"8 min",deescalated:"74%",orientations:"31",satisfaction:"4,6/5",followup:"89%",recurrence:"11%"},
  "90":{response:"10 min",deescalated:"69%",orientations:"82",satisfaction:"4,4/5",followup:"84%",recurrence:"14%"}
};

const defaultPreferences={twoFactor:false,statusNotifications:true,activityNotifications:true,discreetNotifications:true,quietFrom:"21:00",quietTo:"07:30",textSize:"normal",highContrast:false,reducedMotion:false,simpleLanguage:false,oneHanded:false,discreetMode:false};

const storedRole=localStorage.getItem("lien-role-v3");
const allowedViews=new Set(["home","map","channels","profile","intervention","admin"]);
const state={view:"home",role:roles[storedRole]?storedRole:"Parent",onboardStep:1,onboardRole:null,reportStep:1,report:{type:null,attachments:[],minor:false},channel:"quartier",activeSignal:"s1",reviewItem:null,reportedMessage:null,sosTimer:null,sosCount:5,audioRecorder:null,audioStream:null,audioStartedAt:null,preferences:readPreferences(),notificationsRead:localStorage.getItem("lien-notifications-read")==="true",safeAvailable:localStorage.getItem("lien-safe-available")!=="false",operatorAvailable:true,selectedOutcome:null};
let nativeTileMapReady=false;
let activeMapFilter="all";

function escapeHTML(value){
  return String(value).replace(/[&<>'"]/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"})[character]);
}

function readStoredReports(){
  try{const value=JSON.parse(localStorage.getItem("lien-reports")||"[]");return Array.isArray(value)?value:[]}catch{return[]}
}

function readPreferences(){
  try{return{...defaultPreferences,...JSON.parse(localStorage.getItem("lien-preferences")||"{}")}}catch{return{...defaultPreferences}}
}

function savePreferences(){
  localStorage.setItem("lien-preferences",JSON.stringify(state.preferences));
}

function renderNotifications(){
  const items=[notificationData[state.role]||notificationData.default,...notificationData.common];
  const list=q("[data-notification-list]");if(!list)return;
  list.innerHTML=items.map((item,index)=>`<article class="${!state.notificationsRead&&index<2?"unread":""}"><span><svg><use href="#${item.icon}"/></svg></span><div><strong>${escapeHTML(item.title)}</strong><small>${escapeHTML(item.text)}</small><time>${escapeHTML(item.time)}</time></div></article>`).join("");
  const dot=q("[data-notification-dot]");if(dot)dot.hidden=state.notificationsRead;
}

function updateSafePlaceUI(){
  const card=q(".safe-availability"),status=q("[data-safe-status]"),button=q('[data-action="toggle-safe-availability"]');if(!card||!status||!button)return;
  card.classList.toggle("closed",!state.safeAvailable);status.textContent=state.safeAvailable?"Votre lieu est disponible":"Votre lieu est fermé";button.textContent=state.safeAvailable?"Passer fermé":"Passer ouvert";
}

function updateImpact(period="30"){
  const values=impactPeriods[period]||impactPeriods["30"];const mapping={response:"response",deescalated:"deescalated",safe:"orientations",satisfaction:"satisfaction",followup7:"followup",recurrence:"recurrence"};
  qa("[data-impact]").forEach(element=>{element.textContent=values[mapping[element.dataset.impact]]||"—"});
}

function applyPreferences(){
  const preferences=state.preferences;
  document.body.classList.toggle("text-large",preferences.textSize==="large");
  document.body.classList.toggle("high-contrast",preferences.highContrast);
  document.body.classList.toggle("reduced-motion",preferences.reducedMotion);
  document.body.classList.toggle("simple-language",preferences.simpleLanguage);
  document.body.classList.toggle("one-handed",preferences.oneHanded);
  const discreet=preferences.discreetMode&&state.role==="Jeune";document.body.classList.toggle("discreet-mode",discreet);
  qa("[data-pref]").forEach(input=>{input.checked=Boolean(preferences[input.dataset.pref])});
  qa("[data-pref-value]").forEach(input=>{input.value=preferences[input.dataset.prefValue]||input.value});
  qa("[data-text-size]").forEach(button=>button.classList.toggle("active",button.dataset.textSize===preferences.textSize));
  qa("[data-discreet-status]").forEach(status=>status.textContent=discreet?"Activé":"Désactivé");
  qa(".brand b").forEach(brand=>brand.textContent=discreet?"ESPACE":"LIEN");document.title=discreet?"Espace local":"LIEN — Prévenir, apaiser, protéger";
  const safety=q(".safety-banner span");if(safety)safety.innerHTML=preferences.simpleLanguage?"<strong>Espace modéré</strong> Ne donnez pas de nom ni d’adresse.":"<strong>Espace modéré</strong> N’indiquez jamais l’identité d’un mineur ni une position précise.";
  if(discreet){q('[data-user="greeting"]').textContent="Bienvenue";q('[data-user="subtitle"]').textContent="Vos informations et contacts utiles sont disponibles ici.";q("[data-role-context-label]").textContent="Espace local";q("[data-role-context-title]").textContent="Informations et contacts utiles";const labels=[["Ressources","Échange confidentiel"],["Ajouter une note","Sans identité ni média"],["Trouver un accueil","Lieux ouverts à proximité"]];qa("[data-role-quick]").forEach((button,index)=>{q("[data-role-quick-title]",button).textContent=labels[index][0];q("[data-role-quick-description]",button).textContent=labels[index][1]})}
}

function toggleDiscreetMode(force){
  if(state.role!=="Jeune"){showToast("Le mode discret est disponible dans l’espace Jeune.");return}
  state.preferences.discreetMode=typeof force==="boolean"?force:!state.preferences.discreetMode;savePreferences();applyRole(state.role);applyPreferences();closeSheets();setView("home");showToast(state.preferences.discreetMode?"Écran neutre activé.":"Espace LIEN restauré.");
}

function showToast(message){
  const toast=q(".toast");q("[data-toast]").textContent=message;toast.classList.add("show");
  clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2800);
}

function setView(view){
  if(!allowedViews.has(view)||!q(`[data-view="${view}"]`))return;
  const access=roles[state.role]?.access||[];
  if(view==="intervention"&&!access.includes("professional"))view="home";
  if(view==="admin"&&!access.includes("admin"))view="home";
  state.view=view;qa("[data-view]").forEach(panel=>panel.classList.toggle("active",panel.dataset.view===view));
  qa("[data-view-link]").forEach(button=>button.classList.toggle("active",button.dataset.viewLink===view));
  window.scrollTo({top:0,behavior:"smooth"});
  if(view==="map")requestAnimationFrame(initializeTerritoryMap);
}

function openSheet(name){
  closeSheets(false);const sheet=q(`[data-sheet="${name}"]`);if(!sheet)return;
  q("[data-backdrop]").classList.add("open");sheet.classList.add("open");document.body.style.overflow="hidden";
  setTimeout(()=>q("button,input,textarea",sheet)?.focus(),220);
}

function closeSheets(clearBackdrop=true){
  qa("[data-sheet]").forEach(sheet=>sheet.classList.remove("open"));
  if(clearBackdrop)q("[data-backdrop]").classList.remove("open");
  if(!q("[data-sos]").classList.contains("open")&&!q("[data-onboarding]").classList.contains("open"))document.body.style.overflow="";
}

function renderRoles(){
  const html=Object.entries(roles).map(([name,profile])=>`<button class="role-option${state.role===name?" active":""}" data-role-choice="${name}"><span class="role-symbol">${profile.symbol}</span><span><strong>${name}</strong><small>${roleDescriptions[name]}</small>${profile.access.length?'<small class="professional-tag">Vérification requise</small>':""}</span><svg><use href="#i-check"/></svg></button>`).join("");
  q("[data-role-list]").innerHTML=html;
  q("[data-role-options]").innerHTML=Object.entries(roles).map(([name,profile])=>`<button class="onboard-role" data-onboard-role="${name}"><span>${profile.symbol}</span><strong>${name}</strong><small>${roleDescriptions[name]}</small></button>`).join("");
}

function applyRole(role,customFirstName){
  if(!roles[role])return;state.role=role;localStorage.setItem("lien-role-v3",role);const profile=roles[role];
  if(role!=="Jeune"&&state.preferences.discreetMode){state.preferences.discreetMode=false;savePreferences()}
  const journey=roleJourneys[role]||roleJourneys.Habitant;
  const firstName=customFirstName||profile.firstName;const name=customFirstName?`${customFirstName} ${profile.name.includes(".")?profile.name.slice(-2):""}`.trim():profile.name;
  const values={...profile,name,greeting:profile.greeting.replace(profile.firstName,firstName),role};
  qa("[data-user]").forEach(element=>{const key=element.dataset.user;if(values[key]===undefined)return;if(key==="greeting")element.innerHTML=values[key];else element.textContent=values[key]});
  q("[data-score]").textContent=profile.score;q("[data-score-sheet]").textContent=profile.score;q("[data-score-label]").textContent=profile.score>=80?"Bonne":profile.score>=65?"Stable":"Vigilance";
  q(".score-progress").style.strokeDashoffset=358*(1-profile.score/100);
  document.body.dataset.role=role;q("[data-role-symbol]").textContent=profile.symbol;q("[data-role-context-label]").textContent=journey.context;q("[data-role-context-title]").textContent=journey.focus;q("[data-index-context]").textContent=journey.indexContext;
  qa("[data-role-quick]").forEach((button,index)=>{const quick=journey.quick[index];if(!quick)return;button.dataset.roleCommand=quick.command;q("[data-role-quick-title]",button).textContent=quick.title;q("[data-role-quick-description]",button).textContent=quick.description});
  qa('[data-role-access="professional"]').forEach(element=>element.style.display=profile.access.includes("professional")?"":"none");
  qa('[data-role-access="admin"]').forEach(element=>element.style.display=profile.access.includes("admin")?"":"none");
  qa('[data-role-access="young"]').forEach(element=>element.hidden=role!=="Jeune");
  const verification=q("[data-professional-verification]");if(verification)verification.hidden=!profile.access.includes("professional");
  const professional=profile.access.includes("professional");q("[data-map-privacy-title]").textContent=professional?"Mode professionnel vérifié":"Mode public protégé";q("[data-map-privacy-text]").textContent=professional?"La carte reste agrégée ; les détails sensibles sont réservés aux dossiers tracés.":"Aucune adresse, aucun domicile et aucune personne ne sont localisables.";
  if((state.view==="intervention"&&!profile.access.includes("professional"))||(state.view==="admin"&&!profile.access.includes("admin")))setView("home");
  renderRoles();renderNotifications();applyPreferences();
}

function setOnboardStep(step){
  state.onboardStep=step;qa("[data-onboard-step]").forEach(panel=>panel.classList.toggle("active",Number(panel.dataset.onboardStep)===step));
  qa(".onboard-progress i").forEach((dot,index)=>dot.classList.toggle("active",index<step));
}

function openOnboarding(){q("[data-onboarding]").classList.add("open");document.body.style.overflow="hidden";setOnboardStep(1)}
function closeOnboarding(){q("[data-onboarding]").classList.remove("open");document.body.style.overflow=""}

function resetReport(){
  state.reportStep=1;state.report={type:null,attachments:[],minor:false};qa("[data-report-step]").forEach(panel=>panel.classList.toggle("active",panel.dataset.reportStep==="1"));
  qa(".sheet-steps i").forEach((dot,index)=>dot.classList.toggle("active",index===0));qa("[data-report-type]").forEach(button=>button.classList.remove("selected"));
  const firstNext=q('[data-report-step="1"] [data-report-next]');if(firstNext)firstNext.disabled=true;q("[data-attachments]").innerHTML="";q("[data-report-minor]").checked=false;q("[data-minor-safety]").hidden=true;qa("[data-media]").forEach(button=>button.disabled=false);q("[data-report-description]").value="";q("[data-report-location]").value="";
  setReportResult("Signal transmis pour validation","Merci d’avoir créé du lien.","Le signalement n’est pas encore une alerte publique. Un médiateur va le vérifier et rechercher d’éventuelles corroborations.","Référence confidentielle · statut : en attente");
}

function setReportStep(step){
  state.reportStep=step;qa("[data-report-step]").forEach(panel=>panel.classList.toggle("active",Number(panel.dataset.reportStep)===step));
  qa(".sheet-steps i").forEach((dot,index)=>dot.classList.toggle("active",index<step));
  q('[data-sheet="report"]').scrollTo({top:0,behavior:"smooth"});
  if(step===4)submitReport();
}

function addAttachment(label){
  if(state.report.attachments.includes(label))return;state.report.attachments.push(label);
  q("[data-attachments]").insertAdjacentHTML("beforeend",`<span class="attachment">✓ ${escapeHTML(label)}</span>`);
}

async function toggleAudioRecording(button){
  if(state.audioRecorder&&state.audioRecorder.state==="recording"){state.audioRecorder.stop();return}
  try{
    if(!navigator.mediaDevices?.getUserMedia)throw new Error("unsupported");
    state.audioStream=await navigator.mediaDevices.getUserMedia({audio:true});state.audioRecorder=new MediaRecorder(state.audioStream);const chunks=[];
    state.audioRecorder.ondataavailable=event=>chunks.push(event.data);state.audioRecorder.onstop=()=>{state.audioStream?.getTracks().forEach(track=>track.stop());button.classList.remove("recording");button.querySelector("small").textContent="Enregistrement ajouté";addAttachment("Note audio");state.audioRecorder=null};
    state.audioRecorder.start();state.audioStartedAt=Date.now();button.classList.add("recording");button.querySelector("small").textContent="Appuyer pour arrêter";showToast("Enregistrement audio démarré.");
  }catch{showToast("Le microphone nécessite une autorisation dans le navigateur.")}
}

function setReportResult(kicker,title,text,status){
  q("[data-report-result-kicker]").textContent=kicker;q("[data-report-result-title]").textContent=title;q("[data-report-result-text]").textContent=text;q("[data-report-result-status]").textContent=status;
}

function submitReport(){
  const now=Date.now(),reports=readStoredReports(),recent=reports.filter(report=>now-new Date(report.createdAt).getTime()<15*60*1000);
  if(recent.length>=3){q("[data-report-reference]").textContent="#LN-CONTRÔLE";setReportResult("Protection anti-abus activée","Envoi mis en attente.","Plusieurs envois ont été effectués récemment sur cet appareil. Aucune alerte publique n’est créée ; un médiateur peut être contacté si la situation évolue.","Limitation locale temporaire · recours possible");return}
  const location=q("[data-report-location]")?.value.trim()||"Zone non précisée";const duplicate=recent.find(report=>report.type===state.report.type&&(report.location===location||location==="Zone non précisée"));
  const reference=`#LN-${2050+Math.floor(Math.random()*40)}`;q("[data-report-reference]").textContent=reference;
  const record={reference,type:state.report.type,description:q("[data-report-description]")?.value||"",location,minor:state.report.minor,createdAt:new Date().toISOString(),status:duplicate?"Rapprochement anti-doublon":"En attente d’examen professionnel"};
  reports.unshift(record);localStorage.setItem("lien-reports",JSON.stringify(reports.slice(0,20)));
  if(duplicate)setReportResult("Signal rapproché d’une observation récente","Votre observation complète le dossier.","Un signal similaire existe déjà dans cette zone. Les éléments sont regroupés pour éviter plusieurs alertes et seront examinés humainement.","Référence confidentielle · rapprochement à vérifier");
}

function openSignal(id){
  const signal=signals[id]||signals.s1;state.activeSignal=id;
  q("[data-detail-title]").textContent=signal.title;q("[data-detail-status]").textContent=signal.status;q("[data-detail-zone]").textContent=signal.zone;q("[data-detail-confirms]").textContent=signal.confirms;q("[data-detail-dot]").style.background=signal.color;
  qa("[data-validation-step]").forEach(step=>{const number=Number(step.dataset.validationStep);step.classList.toggle("done",number<signal.stage);step.classList.toggle("active",number===signal.stage)});
  openSheet("signal");
}

function renderMessages(channel){
  const data=channelData[channel]||channelData.quartier;state.channel=channel;q("[data-channel-title]").textContent=data.title;q("[data-channel-avatar]").textContent=data.avatar;
  q(".chat-head small").innerHTML=`<i></i> ${data.meta}`;
  q("[data-messages]").innerHTML=data.messages.map(message=>message.system?`<div class="system-message">${escapeHTML(message.system)}</div>`:`<article class="message${message.me?" me":""}"><span class="message-avatar">${escapeHTML(message.initials)}</span><div class="message-body"><div class="message-head"><strong>${escapeHTML(message.author)}</strong><time>${escapeHTML(message.time)}</time></div><p>${escapeHTML(message.text)}</p></div>${message.me?"":`<button class="message-report" data-action="report-content" aria-label="Signaler le message de ${escapeHTML(message.author)}"><svg><use href="#i-info"/></svg></button>`}</article>`).join("");
  const box=q("[data-messages]");box.scrollTop=box.scrollHeight;
}

function setSosState(name){qa("[data-sos-state]").forEach(panel=>panel.classList.toggle("active",panel.dataset.sosState===name))}
function openSos(){closeSheets();q("[data-sos]").classList.add("open");document.body.style.overflow="hidden";setSosState("idle")}
function closeSos(){clearInterval(state.sosTimer);state.sosTimer=null;q("[data-sos]").classList.remove("open");document.body.style.overflow="";setSosState("idle")}
function startSos(){
  state.sosCount=5;q("[data-sos-count]").textContent=state.sosCount;q(".count-progress").style.strokeDashoffset=0;setSosState("countdown");
  state.sosTimer=setInterval(()=>{state.sosCount-=1;q("[data-sos-count]").textContent=Math.max(state.sosCount,0);q(".count-progress").style.strokeDashoffset=408*(1-state.sosCount/5);if(state.sosCount<=0){clearInterval(state.sosTimer);state.sosTimer=null;setSosState("sent")}},1000);
}
function cancelSos(){clearInterval(state.sosTimer);state.sosTimer=null;setSosState("idle");showToast("Alerte annulée. Aucune position n’a été transmise.")}

function downloadBlob(filename,content,type="text/plain"){
  const blob=new Blob([content],{type});const url=URL.createObjectURL(blob);const link=document.createElement("a");link.href=url;link.download=filename;link.click();setTimeout(()=>URL.revokeObjectURL(url),500);
}

function sendCurrentMessage(){
  const form=q("[data-message-form]");const input=form.elements.message;const text=input.value.trim();if(!text)return;
  channelData[state.channel].messages.push({author:"Vous",initials:roles[state.role].initials,time:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}),text,me:true});input.value="";renderMessages(state.channel);
}

function submitSignalComment(){
  const form=q("[data-comment-form]");const textarea=form.elements.comment;const text=textarea.value.trim();if(!text){showToast("Ajoutez une précision avant de transmettre.");return}
  q("[data-comments]").insertAdjacentHTML("afterbegin",`<article><span>${escapeHTML(roles[state.role].initials)}</span><div><strong>Vous · maintenant</strong><p>${escapeHTML(text)}</p></div></article>`);textarea.value="";showToast("Précision transmise au médiateur.");
}

function runRoleCommand(command){
  if(command==="contact"){openSheet("contact");return}
  if(command==="young-support"){openSheet("young-help");return}
  if(command==="report"||command==="minor-report"){resetReport();if(command==="minor-report"){state.report.minor=true;q("[data-report-minor]").checked=true;q("[data-minor-safety]").hidden=false;qa("[data-media]").forEach(button=>button.disabled=true)}openSheet("report");return}
  if(command==="safe"){activeMapFilter="safe";setView("map");setMapFilterUI("safe");return}
  if(command==="map"){activeMapFilter="all";setView("map");setMapFilterUI("all");return}
  if(command==="admin"||command==="intervention"){setView(command);return}
  if(command==="parents"||command==="associations"){setView("channels");renderMessages(command);return}
  if(command==="activities"){setView("home");setTimeout(()=>q(".activity-list")?.scrollIntoView({behavior:"smooth",block:"start"}),120);return}
  if(command==="availability"){updateSafePlaceUI();openSheet("safe-places")}
}

function setMapFilterUI(filter){
  qa("[data-map-filter]").forEach(button=>button.classList.toggle("active",button.dataset.mapFilter===filter));
  qa("[data-map-type]").forEach(item=>{item.style.display=filter==="all"||item.dataset.mapType===filter?"":"none"});
  applyMapFilter(filter);
}

function applyMapFilter(filter){
  activeMapFilter=filter;qa("[data-native-map-type]").forEach(item=>{item.style.display=filter==="all"||item.dataset.nativeMapType===filter?"":"none"});
}

function initializeNativeTileMap(){
  if(nativeTileMapReady)return;const container=q("#live-map"),mapCard=q("[data-map]");if(!container||!mapCard)return;nativeTileMapReady=true;
  const zoom=14,centerLon=2.4195,centerLat=48.8792,n=2**zoom;const centerX=(centerLon+180)/360*n;const latitudeRadians=centerLat*Math.PI/180;const centerY=(1-Math.asinh(Math.tan(latitudeRadians))/Math.PI)/2*n;const width=mapCard.clientWidth||366,height=mapCard.clientHeight||610;let tiles="";
  for(let y=Math.floor(centerY)-2;y<=Math.floor(centerY)+2;y+=1){for(let x=Math.floor(centerX)-1;x<=Math.floor(centerX)+1;x+=1){const left=Math.round((x-centerX)*256+width/2),top=Math.round((y-centerY)*256+height/2);tiles+=`<img src="https://tile.openstreetmap.org/${zoom}/${x}/${y}.png" alt="" style="left:${left}px;top:${top}px" />`}}
  container.innerHTML=`<div class="native-tiles">${tiles}</div><div class="native-map-shade"></div><button class="native-zone tension" data-native-map-type="tension" data-signal-id="s1" style="left:72%;top:31%" aria-label="Zone de tension généralisée"><span>!</span></button><button class="native-zone watch" data-native-map-type="watch" data-signal-id="s2" style="left:24%;top:51%" aria-label="Zone de vigilance généralisée"><span>2</span></button><button class="native-zone calm" data-native-map-type="calm" data-signal-id="s3" style="left:62%;top:72%" aria-label="Zone calme généralisée"><span>✓</span></button><button class="native-safe" data-native-map-type="safe" data-action="safe-route" style="left:44%;top:35%" aria-label="Maison de quartier, lieu sûr"><svg><use href="#i-shield"/></svg></button><button class="native-safe" data-native-map-type="safe" data-action="safe-route" style="left:82%;top:64%" aria-label="Commerce partenaire, lieu sûr"><svg><use href="#i-shield"/></svg></button><a class="native-attribution" href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">© OpenStreetMap</a>`;applyMapFilter(activeMapFilter);const revealMap=()=>mapCard.classList.add("map-ready");qa(".native-tiles img",container).forEach(tile=>{if(tile.complete&&tile.naturalWidth)revealMap();else tile.addEventListener("load",revealMap,{once:true})});
}

function initializeTerritoryMap(){
  if(!nativeTileMapReady)initializeNativeTileMap();
}

function openReview(button){
  const item=button.closest("[data-queue-item]");if(!item)return;state.reviewItem=item;q("[data-review-sheet-title]").textContent=item.dataset.reviewTitle;q("[data-review-sheet-zone]").textContent=item.dataset.reviewZone;q("[data-review-sheet-proof]").textContent=item.dataset.reviewProof;qa("[data-review-check]").forEach(check=>check.checked=false);q("[data-review-note]").value="";q('[data-action="confirm-review"]').disabled=true;openSheet("review");
}

function updateReviewDecisionState(){
  const allChecked=qa("[data-review-check]").every(check=>check.checked);const note=q("[data-review-note]").value.trim();q('[data-action="confirm-review"]').disabled=!(allChecked&&note.length>=12);
}

function finishReview(confirmed){
  if(!state.reviewItem)return;const item=state.reviewItem;if(confirmed){item.style.background="#eff8e8";q("strong",item).textContent=`${q("strong",item).textContent} · affecté`;q("button",item).textContent="Affecté ✓";q("button",item).disabled=true;showToast("Signal qualifié, affecté et inscrit au journal d’audit.")}else{item.remove();showToast("Signal classé sans suite avec motif et trace d’audit.")}state.reviewItem=null;closeSheets();
}

function resetInterventionClose(){
  state.selectedOutcome=null;qa("[data-outcome]").forEach(button=>button.classList.remove("active"));q("[data-intervention-note]").value="";q('[data-action="confirm-close-intervention"]').disabled=true;
}

function updateInterventionCloseState(){
  q('[data-action="confirm-close-intervention"]').disabled=!(state.selectedOutcome&&q("[data-intervention-note]").value.trim().length>=12);
}

function finishIntervention(){
  const intervention=q(".live-intervention"),pill=q(".live-pill",intervention);pill.innerHTML='<i></i> Clôturée';pill.classList.remove("coral");qa(".intervention-timeline span",intervention).forEach(step=>{step.classList.add("done");step.classList.remove("active")});const steps=qa(".intervention-timeline b",intervention);if(steps[3])steps[3].textContent="15:28";if(steps[4])steps[4].textContent="15:34";qa(".intervention-actions button",intervention).forEach(button=>button.disabled=true);closeSheets();showToast(`Intervention clôturée : ${state.selectedOutcome}. Suivi programmé.`);
}

renderRoles();applyRole(state.role);renderMessages(state.channel);updateSafePlaceUI();updateImpact();

qa("[data-view-link]").forEach(button=>button.addEventListener("click",event=>{event.preventDefault();setView(button.dataset.viewLink)}));
qa("[data-close-sheet]").forEach(button=>button.addEventListener("click",()=>closeSheets()));q("[data-backdrop]").addEventListener("click",()=>closeSheets());

document.addEventListener("click",event=>{
  const roleChoice=event.target.closest("[data-role-choice]");if(roleChoice){applyRole(roleChoice.dataset.roleChoice);closeSheets();showToast(`Espace ${roleChoice.dataset.roleChoice} activé.`);return}
  const roleQuick=event.target.closest("[data-role-quick]");if(roleQuick){runRoleCommand(roleQuick.dataset.roleCommand);return}
  const signalButton=event.target.closest("[data-signal-id]");if(signalButton){openSignal(signalButton.dataset.signalId);return}
  const outcomeButton=event.target.closest("[data-outcome]");if(outcomeButton){state.selectedOutcome=outcomeButton.dataset.outcome;qa("[data-outcome]").forEach(button=>button.classList.toggle("active",button===outcomeButton));updateInterventionCloseState();return}
  const actionButton=event.target.closest("[data-action]");if(!actionButton)return;const action=actionButton.dataset.action;
  if(action==="role-picker")openSheet("roles");
  if(action==="report"){resetReport();openSheet("report")}
  if(action==="sos")openSos();if(action==="close-sos")closeSos();if(action==="start-sos")startSos();if(action==="cancel-sos")cancelSos();
  if(action==="contact-mediator"){if(q("[data-sos]").classList.contains("open"))closeSos();openSheet("contact")}
  if(action==="open-private-chat"){closeSheets();setView("channels");renderMessages("parents");showToast("Discussion privée ouverte avec Karim.")}
  if(action==="settings")openSheet("settings");
  if(action==="account-security")openSheet("account");
  if(action==="notification-settings"||action==="notifications"){renderNotifications();openSheet("notifications")}
  if(action==="accessibility-settings")openSheet("accessibility");
  if(action==="toggle-discreet")toggleDiscreetMode();
  if(action==="quick-exit")toggleDiscreetMode(true);
  if(action==="minor-report")runRoleCommand("minor-report");
  if(action==="score-explain")openSheet("score");
  if(action==="map-settings")openSheet("map-privacy");
  if(action==="review-signal")openReview(actionButton);
  if(action==="confirm-review")finishReview(true);
  if(action==="archive-review"){if(q("[data-review-note]").value.trim().length<12)showToast("Ajoutez une note de décision d’au moins 12 caractères.");else finishReview(false)}
  if(action==="show-safe-places"){closeSheets();activeMapFilter="safe";setView("map");setMapFilterUI("safe")}
  if(action==="moderation-help")showToast("Utilisez le bouton ! à côté d’un message pour le signaler confidentiellement.");
  if(action==="report-content"){state.reportedMessage=actionButton.closest(".message");qa('input[name="content-reason"]').forEach(input=>input.checked=false);openSheet("content-report")}
  if(action==="locate"||action==="use-location"){
    if(!navigator.geolocation){showToast("La géolocalisation n’est pas disponible.");return}
    showToast("Demande de localisation en cours…");navigator.geolocation.getCurrentPosition(position=>{const accuracy=Math.round(position.coords.accuracy);const field=q("[data-report-location]");if(field)field.value=`Position actuelle · précision environ ${accuracy} m`;showToast("Position utilisée uniquement pour cette action.")},()=>showToast("Localisation refusée. Vous pouvez saisir une zone approximative."),{enableHighAccuracy:false,timeout:8000,maximumAge:60000});
  }
  if(action==="corroborate"){const signal=signals[state.activeSignal];signal.confirms+=1;q("[data-detail-confirms]").textContent=signal.confirms;actionButton.disabled=true;actionButton.innerHTML='<svg><use href="#i-check"/></svg> Observation ajoutée';showToast("Corroboration confidentielle transmise.")}
  if(action==="ended"){showToast("Merci. Un médiateur vérifiera si la situation est terminée.")}
  if(action==="safe-route"||action==="start-route")showToast("Guidage vers la Maison de quartier démarré.");
  if(action==="stop-sharing"){actionButton.textContent="Partage de position arrêté";actionButton.disabled=true;showToast("Votre position n’est plus partagée.")}
  if(action==="register"){actionButton.textContent="Inscrit·e ✓";actionButton.disabled=true;showToast("Participation confirmée.")}
  if(action==="voice-call")showToast("Appel vocal sécurisé en préparation…");if(action==="video-call")showToast("Salle de médiation vidéo en préparation…");
  if(action==="participants")showToast("38 membres, dont 2 modérateurs vérifiés.");if(action==="attach")showToast("Les pièces jointes sont analysées avant publication.");
  if(action==="voice-message"){actionButton.classList.toggle("recording");showToast(actionButton.classList.contains("recording")?"Message vocal en cours…":"Message vocal prêt à envoyer.")}
  if(action==="send-message")sendCurrentMessage();if(action==="submit-comment")submitSignalComment();
  if(action==="new-discussion")showToast("Choisissez un médiateur ou un canal autorisé.");
  if(action==="new-intervention")showToast("Nouvelle coordination créée en mode brouillon.");if(action==="join-intervention")showToast("Vous êtes ajouté·e à l’équipe #INT-382.");
  if(action==="open-ops-chat"){setView("channels");renderMessages("mediateurs")}
  if(action==="toggle-availability"){state.operatorAvailable=!state.operatorAvailable;const bar=q(".ops-command-bar");bar.classList.toggle("unavailable",!state.operatorAvailable);q(".ops-presence",bar).innerHTML=`<i></i> ${state.operatorAvailable?"Disponible":"Indisponible"}`;actionButton.textContent=state.operatorAvailable?"Passer indisponible":"Me rendre disponible";showToast(state.operatorAvailable?"Vous êtes de nouveau mobilisable.":"Vous ne recevrez plus de nouvelle affectation locale.")}
  if(action==="escalate-intervention")showToast("Le responsable de permanence est informé. Aucune confrontation n’est demandée.");
  if(action==="close-intervention"){resetInterventionClose();openSheet("intervention-close")}
  if(action==="confirm-close-intervention")finishIntervention();
  if(action==="reopen-intervention"){const row=actionButton.closest(".table-row"),status=q(".status",row);status.textContent="Suivi";status.classList.remove("resolved");status.classList.add("monitoring");actionButton.textContent="Réouverte ✓";actionButton.disabled=true;showToast("Intervention réouverte avec une nouvelle trace de suivi.")}
  if(action==="export-interventions"||action==="export-csv"){downloadBlob("lien-export.csv","reference,quartier,statut,duree\nINT-381,Secteur Nord,Resolu,38 min\nINT-380,Les Sentes,Suivi,72 min","text/csv;charset=utf-8");showToast("Export CSV généré.")}
  if(action==="print-report")window.print();
  if(action==="manage-safe"){updateSafePlaceUI();openSheet("safe-places")}
  if(action==="moderation")openSheet("moderation");
  if(["manage-users","manage-mediators","manage-districts","audit-log","badges"].includes(action))showToast("Module ouvert en mode démonstration.");
  if(action==="toggle-safe-availability"){state.safeAvailable=!state.safeAvailable;localStorage.setItem("lien-safe-available",String(state.safeAvailable));updateSafePlaceUI();showToast(state.safeAvailable?"Lieu indiqué disponible sur cet appareil.":"Lieu indiqué fermé sur cet appareil.")}
  if(action==="refresh-safe-qr"){q(".qr-pattern").style.transform=`rotate(${Math.floor(Math.random()*4)*90}deg)`;showToast("Nouvel aperçu QR généré localement.")}
  if(action==="merge-reports"||action==="review-content"||action==="audit-account"){actionButton.textContent=action==="merge-reports"?"Rapprochés ✓":action==="review-content"?"Pris en charge ✓":"Audit ouvert ✓";actionButton.disabled=true;showToast("Décision locale préparée pour validation humaine.")}
  if(action==="submit-content-report"){const reason=q('input[name="content-reason"]:checked');if(!reason){showToast("Choisissez un motif avant de transmettre.");return}if(state.reportedMessage){q(".message-body p",state.reportedMessage).textContent="Message masqué après votre signalement.";q(".message-report",state.reportedMessage)?.remove()}state.reportedMessage=null;closeSheets();showToast("Message masqué localement et transmis à la file de modération.")}
  if(action==="mark-notifications-read"){state.notificationsRead=true;localStorage.setItem("lien-notifications-read","true");renderNotifications();showToast("Notifications marquées comme lues.")}
  if(action==="change-email")showToast("Modification préparée ; une vérification serveur sera nécessaire.");
  if(action==="verify-phone")showToast("Revérification préparée ; aucun SMS n’est envoyé sans backend.");
  if(action==="submit-verification"){actionButton.innerHTML='<svg><use href="#i-check"/></svg> Demande préparée';actionButton.disabled=true;showToast("Dossier enregistré localement, prêt pour une future validation humaine.")}
  if(action==="revoke-sessions")showToast("Cet appareil est conservé. La fermeture distante nécessitera le backend.");
  if(action==="permission-location"||action==="permission-media")showToast("Cette permission sera demandée uniquement au moment nécessaire.");
  if(action==="retention")showToast("Conservation ordinaire : 90 jours maximum, puis suppression automatique.");
  if(action==="access-history")showToast("Aucun accès professionnel inhabituel détecté sur les 30 derniers jours.");
  if(action==="download-data"){downloadBlob("mes-donnees-lien.json",JSON.stringify({role:state.role,reports:readStoredReports(),preferences:state.preferences},null,2),"application/json");showToast("Copie de vos données générée.")}
  if(action==="delete-account"){["lien-role-v3","lien-reports","lien-onboarded-v3","lien-preferences","lien-notifications-read","lien-safe-available"].forEach(key=>localStorage.removeItem(key));state.preferences={...defaultPreferences};state.notificationsRead=false;applyPreferences();closeSheets();showToast("Données locales supprimées.");setTimeout(openOnboarding,500)}
});

qa("[data-report-type]").forEach(button=>button.addEventListener("click",()=>{qa("[data-report-type]").forEach(item=>item.classList.remove("selected"));button.classList.add("selected");state.report.type=button.dataset.reportType;q('[data-report-step="1"] [data-report-next]').disabled=false}));
qa("[data-report-next]").forEach(button=>button.addEventListener("click",()=>{if(state.reportStep===1&&state.report.type==="Violence"){closeSheets();openSos();return}setReportStep(Math.min(4,state.reportStep+1))}));
qa("[data-media]").forEach(button=>button.addEventListener("click",()=>{const media=button.dataset.media;if(media==="audio")toggleAudioRecording(button);else q(`[data-file="${media}"]`).click()}));
qa("[data-file]").forEach(input=>input.addEventListener("change",()=>{if(input.files?.[0])addAttachment(`${input.dataset.file==="photo"?"Photo":"Vidéo"} · ${input.files[0].name}`)}));
q("[data-report-minor]").addEventListener("change",event=>{state.report.minor=event.target.checked;q("[data-minor-safety]").hidden=!state.report.minor;qa("[data-media]").forEach(button=>button.disabled=state.report.minor);if(state.report.minor){state.report.attachments=[];q("[data-attachments]").innerHTML="";showToast("Protection mineur activée : ajout de média désactivé.")}});

qa("[data-pref]").forEach(input=>input.addEventListener("change",()=>{state.preferences[input.dataset.pref]=input.checked;savePreferences();applyPreferences();showToast("Préférence enregistrée sur cet appareil.")}));
qa("[data-pref-value]").forEach(input=>input.addEventListener("change",()=>{state.preferences[input.dataset.prefValue]=input.value;savePreferences();applyPreferences()}));
qa("[data-text-size]").forEach(button=>button.addEventListener("click",()=>{state.preferences.textSize=button.dataset.textSize;savePreferences();applyPreferences()}));
q("[data-intervention-note]").addEventListener("input",updateInterventionCloseState);
q("[data-impact-period]").addEventListener("change",event=>updateImpact(event.target.value));

qa("[data-map-filter]").forEach(button=>button.addEventListener("click",()=>setMapFilterUI(button.dataset.mapFilter)));
qa("[data-review-check]").forEach(check=>check.addEventListener("change",updateReviewDecisionState));q("[data-review-note]").addEventListener("input",updateReviewDecisionState);

qa("[data-channel]").forEach(button=>button.addEventListener("click",()=>{qa("[data-channel]").forEach(item=>item.classList.remove("active"));button.classList.add("active");renderMessages(button.dataset.channel)}));
q("[data-message-form]").addEventListener("submit",event=>{event.preventDefault();sendCurrentMessage()});
q("[data-comment-form]").addEventListener("submit",event=>{event.preventDefault();submitSignalComment()});

q("[data-onboard-next]").closest('[data-onboard-step="1"]').querySelector("[data-onboard-next]").addEventListener("click",()=>setOnboardStep(2));
q('[data-onboard-step="2"] [data-onboard-next]').addEventListener("click",()=>{if(!state.onboardRole)return;const nameInput=q("[data-onboard-name]");nameInput.value=roles[state.onboardRole].firstName;setOnboardStep(3)});
q("[data-role-options]").addEventListener("click",event=>{const button=event.target.closest("[data-onboard-role]");if(!button)return;qa("[data-onboard-role]").forEach(item=>item.classList.remove("selected"));button.classList.add("selected");state.onboardRole=button.dataset.onboardRole;q('[data-onboard-step="2"] [data-onboard-next]').disabled=false});
q("[data-charter]").addEventListener("change",event=>q("[data-onboard-finish]").disabled=!event.target.checked);
q("[data-onboard-finish]").addEventListener("click",()=>{const role=state.onboardRole||"Parent";const customName=q("[data-onboard-name]").value.trim();applyRole(role,customName||undefined);localStorage.setItem("lien-onboarded-v3","true");closeOnboarding();showToast(`Bienvenue dans votre espace ${role}.`)});
q("[data-onboard-reset]").addEventListener("click",()=>setOnboardStep(2));

document.addEventListener("keydown",event=>{if(event.key==="Escape"){if(q("[data-sos]").classList.contains("open"))closeSos();else closeSheets()}});

const launch=new URLSearchParams(location.search);if(launch.get("view"))setView(launch.get("view"));if(launch.get("action")==="report")setTimeout(()=>{resetReport();openSheet("report")},150);
if(!localStorage.getItem("lien-onboarded-v3"))openOnboarding();
if("serviceWorker" in navigator&&location.protocol!=="file:")window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js").catch(()=>{}));
