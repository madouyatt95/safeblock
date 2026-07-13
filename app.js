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
  s1:{title:"Tensions verbales",status:"À corroborer",zone:"City-stade · zone approximative de 300 m",confirms:2,color:"#e8a140"},
  s2:{title:"Différend entre groupes",status:"Médiation en cours",zone:"Square des Bruyères · zone approximative de 500 m",confirms:4,color:"#57aee3"},
  s3:{title:"Rumeur numérique",status:"Situation stabilisée",zone:"Secteur Nord · position non applicable",confirms:1,color:"#43bd7e"}
};

const storedRole=localStorage.getItem("lien-role-v3");
const state={view:"home",role:roles[storedRole]?storedRole:"Parent",onboardStep:1,onboardRole:null,reportStep:1,report:{type:null,attachments:[]},channel:"quartier",activeSignal:"s1",sosTimer:null,sosCount:5,audioRecorder:null,audioStream:null,audioStartedAt:null};

function showToast(message){
  const toast=q(".toast");q("[data-toast]").textContent=message;toast.classList.add("show");
  clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("show"),2800);
}

function setView(view){
  if(!q(`[data-view="${view}"]`))return;
  const access=roles[state.role]?.access||[];
  if(view==="intervention"&&!access.includes("professional"))view="home";
  if(view==="admin"&&!access.includes("admin"))view="home";
  state.view=view;qa("[data-view]").forEach(panel=>panel.classList.toggle("active",panel.dataset.view===view));
  qa("[data-view-link]").forEach(button=>button.classList.toggle("active",button.dataset.viewLink===view));
  window.scrollTo({top:0,behavior:"smooth"});
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
  const firstName=customFirstName||profile.firstName;const name=customFirstName?`${customFirstName} ${profile.name.includes(".")?profile.name.slice(-2):""}`.trim():profile.name;
  const values={...profile,name,greeting:profile.greeting.replace(profile.firstName,firstName),role};
  qa("[data-user]").forEach(element=>{const key=element.dataset.user;if(values[key]===undefined)return;if(key==="greeting")element.innerHTML=values[key];else element.textContent=values[key]});
  q("[data-score]").textContent=profile.score;q("[data-score-label]").textContent=profile.score>=80?"Bonne":profile.score>=65?"Stable":"Vigilance";
  q(".score-progress").style.strokeDashoffset=358*(1-profile.score/100);
  qa('[data-role-access="professional"]').forEach(element=>element.style.display=profile.access.includes("professional")?"":"none");
  qa('[data-role-access="admin"]').forEach(element=>element.style.display=profile.access.includes("admin")?"":"none");
  if((state.view==="intervention"&&!profile.access.includes("professional"))||(state.view==="admin"&&!profile.access.includes("admin")))setView("home");
  renderRoles();
}

function setOnboardStep(step){
  state.onboardStep=step;qa("[data-onboard-step]").forEach(panel=>panel.classList.toggle("active",Number(panel.dataset.onboardStep)===step));
  qa(".onboard-progress i").forEach((dot,index)=>dot.classList.toggle("active",index<step));
}

function openOnboarding(){q("[data-onboarding]").classList.add("open");document.body.style.overflow="hidden";setOnboardStep(1)}
function closeOnboarding(){q("[data-onboarding]").classList.remove("open");document.body.style.overflow=""}

function resetReport(){
  state.reportStep=1;state.report={type:null,attachments:[]};qa("[data-report-step]").forEach(panel=>panel.classList.toggle("active",panel.dataset.reportStep==="1"));
  qa(".sheet-steps i").forEach((dot,index)=>dot.classList.toggle("active",index===0));qa("[data-report-type]").forEach(button=>button.classList.remove("selected"));
  const firstNext=q('[data-report-step="1"] [data-report-next]');if(firstNext)firstNext.disabled=true;q("[data-attachments]").innerHTML="";
}

function setReportStep(step){
  state.reportStep=step;qa("[data-report-step]").forEach(panel=>panel.classList.toggle("active",Number(panel.dataset.reportStep)===step));
  qa(".sheet-steps i").forEach((dot,index)=>dot.classList.toggle("active",index<step));
  q('[data-sheet="report"]').scrollTo({top:0,behavior:"smooth"});
  if(step===4)submitReport();
}

function addAttachment(label){
  if(state.report.attachments.includes(label))return;state.report.attachments.push(label);
  q("[data-attachments]").insertAdjacentHTML("beforeend",`<span class="attachment">✓ ${label}</span>`);
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

function submitReport(){
  const reference=`#LN-${2050+Math.floor(Math.random()*40)}`;q("[data-report-reference]").textContent=reference;
  const record={reference,type:state.report.type,description:q("[data-report-description]")?.value||"",location:q("[data-report-location]")?.value||"Zone non précisée",createdAt:new Date().toISOString(),status:"En attente de validation"};
  const reports=JSON.parse(localStorage.getItem("lien-reports")||"[]");reports.unshift(record);localStorage.setItem("lien-reports",JSON.stringify(reports.slice(0,20)));
}

function openSignal(id){
  const signal=signals[id]||signals.s1;state.activeSignal=id;
  q("[data-detail-title]").textContent=signal.title;q("[data-detail-status]").textContent=signal.status;q("[data-detail-zone]").textContent=signal.zone;q("[data-detail-confirms]").textContent=signal.confirms;q("[data-detail-dot]").style.background=signal.color;
  openSheet("signal");
}

function renderMessages(channel){
  const data=channelData[channel]||channelData.quartier;state.channel=channel;q("[data-channel-title]").textContent=data.title;q("[data-channel-avatar]").textContent=data.avatar;
  q(".chat-head small").innerHTML=`<i></i> ${data.meta}`;
  q("[data-messages]").innerHTML=data.messages.map(message=>message.system?`<div class="system-message">${message.system}</div>`:`<article class="message${message.me?" me":""}"><span class="message-avatar">${message.initials}</span><div class="message-body"><div class="message-head"><strong>${message.author}</strong><time>${message.time}</time></div><p>${message.text}</p></div></article>`).join("");
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
  q("[data-comments]").insertAdjacentHTML("afterbegin",`<article><span>${roles[state.role].initials}</span><div><strong>Vous · maintenant</strong><p>${text.replace(/[<>]/g,"")}</p></div></article>`);textarea.value="";showToast("Précision transmise au médiateur.");
}

renderRoles();applyRole(state.role);renderMessages(state.channel);

qa("[data-view-link]").forEach(button=>button.addEventListener("click",event=>{event.preventDefault();setView(button.dataset.viewLink)}));
qa("[data-close-sheet]").forEach(button=>button.addEventListener("click",()=>closeSheets()));q("[data-backdrop]").addEventListener("click",()=>closeSheets());

document.addEventListener("click",event=>{
  const roleChoice=event.target.closest("[data-role-choice]");if(roleChoice){applyRole(roleChoice.dataset.roleChoice);closeSheets();showToast(`Espace ${roleChoice.dataset.roleChoice} activé.`);return}
  const signalButton=event.target.closest("[data-signal-id]");if(signalButton){openSignal(signalButton.dataset.signalId);return}
  const actionButton=event.target.closest("[data-action]");if(!actionButton)return;const action=actionButton.dataset.action;
  if(action==="role-picker")openSheet("roles");
  if(action==="report"){resetReport();openSheet("report")}
  if(action==="sos")openSos();if(action==="close-sos")closeSos();if(action==="start-sos")startSos();if(action==="cancel-sos")cancelSos();
  if(action==="contact-mediator"){if(q("[data-sos]").classList.contains("open"))closeSos();openSheet("contact")}
  if(action==="open-private-chat"){closeSheets();setView("channels");renderMessages("parents");showToast("Discussion privée ouverte avec Karim.")}
  if(action==="settings")openSheet("settings");
  if(action==="notifications")showToast("3 mises à jour : une médiation, un atelier et un signal corroboré.");
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
  if(action==="export-interventions"||action==="export-csv"){downloadBlob("lien-export.csv","reference,quartier,statut,duree\nINT-381,Secteur Nord,Resolu,38 min\nINT-380,Les Sentes,Suivi,72 min","text/csv;charset=utf-8");showToast("Export CSV généré.")}
  if(action==="print-report")window.print();
  if(action==="validate-signal"){const item=actionButton.closest("[data-queue-item]");actionButton.textContent="Validé ✓";actionButton.disabled=true;item.style.background="#eff8e8";showToast("Signal validé et affecté à un médiateur.")}
  if(action==="dismiss-signal"){actionButton.closest("[data-queue-item]").remove();showToast("Signal classé non pertinent avec trace d’audit.")}
  if(["manage-users","manage-mediators","manage-districts","manage-safe","moderation","audit-log","map-settings","badges"].includes(action))showToast("Module ouvert en mode démonstration.");
  if(action==="permission-location"||action==="permission-media")showToast("Cette permission sera demandée uniquement au moment nécessaire.");
  if(action==="download-data"){downloadBlob("mes-donnees-lien.json",JSON.stringify({role:state.role,reports:JSON.parse(localStorage.getItem("lien-reports")||"[]")},null,2),"application/json");showToast("Copie de vos données générée.")}
  if(action==="delete-account"){localStorage.removeItem("lien-role-v3");localStorage.removeItem("lien-reports");localStorage.removeItem("lien-onboarded-v3");closeSheets();showToast("Données locales supprimées.");setTimeout(openOnboarding,500)}
});

qa("[data-report-type]").forEach(button=>button.addEventListener("click",()=>{qa("[data-report-type]").forEach(item=>item.classList.remove("selected"));button.classList.add("selected");state.report.type=button.dataset.reportType;q('[data-report-step="1"] [data-report-next]').disabled=false}));
qa("[data-report-next]").forEach(button=>button.addEventListener("click",()=>{if(state.reportStep===1&&state.report.type==="Violence"){closeSheets();openSos();return}setReportStep(Math.min(4,state.reportStep+1))}));
qa("[data-media]").forEach(button=>button.addEventListener("click",()=>{const media=button.dataset.media;if(media==="audio")toggleAudioRecording(button);else q(`[data-file="${media}"]`).click()}));
qa("[data-file]").forEach(input=>input.addEventListener("change",()=>{if(input.files?.[0])addAttachment(`${input.dataset.file==="photo"?"Photo":"Vidéo"} · ${input.files[0].name}`)}));

qa("[data-map-filter]").forEach(button=>button.addEventListener("click",()=>{qa("[data-map-filter]").forEach(item=>item.classList.remove("active"));button.classList.add("active");const filter=button.dataset.mapFilter;qa("[data-map-type]").forEach(item=>{item.style.display=filter==="all"||item.dataset.mapType===filter?"":"none"})}));

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
