let ideas = [];
const adminName = "Nicklas Hubo"; // Dein Admin-Name
let currentUser = prompt("Bitte Admin-Namen eingeben:");
const isAdmin = currentUser === adminName;

document.getElementById('ideaForm').addEventListener('submit', function(e){
  e.preventDefault();

  const playerName = document.getElementById('playerName').value.trim();
  const ideaTitle = document.getElementById('ideaTitle').value.trim();
  const ideaDescription = document.getElementById('ideaDescription').value.trim();
  const redstoneAmount = parseInt(document.getElementById('redstoneAmount').value);

  if(redstoneAmount <= 200){
    alert("Für normale Projekte unter 200 Redstone-Slots musst du keine Idee einreichen!");
    return;
  }

  const newIdea = {
    playerName,
    ideaTitle,
    ideaDescription,
    redstoneAmount,
    status: 'Pending'
  };

  ideas.push(newIdea);
  document.getElementById('submissionResult').innerText = `Danke ${playerName}, deine Idee "${ideaTitle}" wurde eingereicht!`;
  document.getElementById('ideaForm').reset();

  if(isAdmin){
    renderAdminPanel();
  } else {
    document.getElementById('adminPanel').innerHTML = "<p>Nur Admins können Ideen prüfen.</p>";
  }
});

function renderAdminPanel(){
  const adminPanel = document.getElementById('adminPanel');
  adminPanel.innerHTML = '';

  ideas.forEach((idea, index) => {
    const card = document.createElement('div');
    card.className = 'idea-card';
    card.innerHTML = `
      <p><strong>Spieler:</strong> ${idea.playerName}</p>
      <p><strong>Titel:</strong> ${idea.ideaTitle}</p>
      <p><strong>Beschreibung:</strong> ${idea.ideaDescription}</p>
      <p><strong>Redstone-Slots:</strong> ${idea.redstoneAmount}</p>
      <p><strong>Status:</strong> ${idea.status}</p>
      <button class="admin-btn accept" onclick="updateStatus(${index}, 'Accepted')">Annehmen</button>
      <button class="admin-btn reject" onclick="updateStatus(${index}, 'Rejected')">Ablehnen</button>
      <button class="admin-btn delete" onclick="deleteIdea(${index})">Löschen</button>
    `;
    adminPanel.appendChild(card);
  });
}

function updateStatus(index, status){
  ideas[index].status = status;
  renderAdminPanel();
}

function deleteIdea(index){
  if(confirm("Willst du diese Idee wirklich löschen?")){
    ideas.splice(index, 1);
    renderAdminPanel();
  }
}

if(isAdmin){
  renderAdminPanel();
} else {
  document.getElementById('adminPanel').innerHTML = "<p>Nur Admins können Ideen prüfen.</p>";
}
