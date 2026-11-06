// Définissez un lundi de référence où la remédiation était pour les 5ème (Format: AAAA-MM-JJ)
const LUNDI_REFERENCE_5EME = new Date('2026-09-07'); 

function estDeuxDatesMemeSemaine(d1, d2) {
  const diffTime = Math.abs(d2 - d1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7);
}

function genererLundis(nbSemaines = 8) {
  const aujourdhui = new Date();
  let prochainLundi = new Date();
  
  // Trouver le prochain lundi
  prochainLundi.setDate(aujourdhui.getDate() + ((1 + 7 - aujourdhui.getDay()) % 7));
  if (aujourdhui.getDay() === 1 && aujourdhui.getHours() >= 13) {
    // Si on est lundi après 13h, passer au lundi suivant
    prochainLundi.setDate(prochainLundi.getDate() + 7);
  }

  const listeContainer = document.getElementById('calendar-list');
  const nextSessionContainer = document.getElementById('session-info');

  listeContainer.innerHTML = '';

  for (let i = 0; i < nbSemaines; i++) {
    let dateLundi = new Date(prochainLundi);
    dateLundi.setDate(prochainLundi.getDate() + (i * 7));

    // Calcul du nombre de semaines écoulées depuis la date de référence
    const semainesEcoulees = Math.round((dateLundi - LUNDI_REFERENCE_5EME) / (7 * 24 * 60 * 60 * 1000));
    
    // Si le nombre de semaines est pair -> 5ème, sinon -> Rhéto
    const groupe = (semainesEcoulees % 2 === 0) ?  'Rhétos' : 'Cinquièmes'
    const classeCss = (groupe === 'Cinquièmes') ? 'cinquieme' : 'rheto';

    const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateFormatee = dateLundi.toLocaleDateString('fr-FR', optionsDate);

    // Mettre en avant la prochaine séance
    if (i === 0) {
      nextSessionContainer.innerHTML = `Lundi <strong>${dateFormatee}</strong> (12h50 - 13h40) <span class="tag ${classeCss}">${groupe}</span>`;
    }

    // Ajouter à la liste
    const li = document.createElement('li');
    li.innerHTML = `<span>Lundi ${dateFormatee}</span> <span class="tag ${classeCss}">${groupe}</span>`;
    listeContainer.appendChild(li);
  }
}

document.addEventListener('DOMContentLoaded', () => genererLundis(6));