// Treino profissional para homens
const TRAINING = {
  'Segunda':[ 'Supino reto 4x8','Crucifixo 3x10','Remada curvada 4x8','Puxada frente 3x10','Abdominal infra 3x15','Prancha 3x30s' ],
  'Terça':[ 'Agachamento 4x8','Leg press 3x10','Extensora 3x12','Elevação de quadril 3x12','Abdutor máquina 3x15','Panturrilha 4x15' ],
  'Quarta':[ 'Desenvolvimento militar 4x8','Elevação lateral 3x12','Rosca direta 3x10','Rosca alternada 3x12','Tríceps pulley 3x12' ],
  'Quinta':[ 'Stiff 4x8','Levantamento terra 3x6','Glúteo na máquina 3x12','Abdominal oblíquo 3x15','Panturrilha 4x15' ],
  'Sexta':[ 'Supino inclinado 4x8','Puxada frente 4x8','Rosca concentrada 3x12','Tríceps francês 3x12','Remada unilateral 3x10' ]
};

// Gerenciamento de progresso por semana
const today = new Date();
const weekNumber = getWeekNumber(today);
const weekKey = 'week_'+weekNumber;

// Carregar dados
let weekData = JSON.parse(localStorage.getItem(weekKey)) || {};

function getWeekNumber(d) {
  const onejan = new Date(d.getFullYear(),0,1);
  return Math.ceil((((d - onejan) / 86400000) + onejan.getDay()+1)/7);
}

function loadExercises(day){
  const container = document.getElementById('exercises');
  container.innerHTML='';
  let doneCount=0;
  TRAINING[day].forEach(ex=>{
    const key=day+'_'+ex;
    const checked = weekData[key] && weekData[key].done;
    if(checked) doneCount++;
    const div=document.createElement('div');
    div.className='exercise';
    div.innerHTML=`<span>${ex}</span><button onclick="toggle('${day}','${ex}',this)">${checked?'✔':'Marcar'}</button>`;
    container.appendChild(div);
  });
  updateStats(doneCount, TRAINING[day].length);
  loadReport();
}

function toggle(day, ex, btn){
  const key=day+'_'+ex;
  const timestamp = new Date();
  if(weekData[key] && weekData[key].done){
    delete weekData[key];
    btn.textContent='Marcar';
  } else {
    weekData[key] = {done:true, date: timestamp.toLocaleString()};
    btn.textContent='✔';
  }
  localStorage.setItem(weekKey, JSON.stringify(weekData));
  loadExercises(document.getElementById('daySelect').value);
}

function updateStats(done,total){
  const stats = document.getElementById('stats');
  stats.textContent=`Exercícios concluídos hoje: ${done} / ${total}`;
}

function loadReport(){
  const reportArea = document.getElementById('reportArea');
  reportArea.innerHTML='';
  for(const key in weekData){
    if(weekData[key].done){
      const [day, exName] = key.split('_');
      reportArea.innerHTML+=`<div>${day} • ${exName} • ${weekData[key].date}</div>`;
    }
  }
}

document.getElementById('daySelect').addEventListener('change',(e)=>{
  loadExercises(e.target.value);
});

loadExercises('Segunda');
