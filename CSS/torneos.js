/*
functionagregarEquipos() {
    const textarea = document.getElementById('nombre-equipos');
    const equiposListaDiv = document.getElementById('equipos-lista');
    const equiposJugadores = textarea.value.trim().split('\n');
    
    equiposJugadores.forEach((equipoJugadores, index) => {
        const equipoJugadoresArray = equipoJugadores.split(',');
        const equipoNombre = equipoJugadoresArray[0].trim();
        const jugadores = equipoJugadoresArray.slice(1).map(jugador => jugador.trim());
        
        const equipoDiv = document.createElement('div');
        equipoDiv.className = 'torneo_main-equipo';
        equipoDiv.innerHTML = `<h3>${equipoNombre}</h3>`;
        
        const jugadoresUl = document.createElement('ul');
        jugadoresUl.className = 'torneos_main-inscripcion';
        jugadores.forEach(jugador => {
            const jugadorLi = document.createElement('li');
            jugadorLi.textContent = jugador;
            jugadoresUl.appendChild(jugadorLi);
        });
        
        equipoDiv.appendChild(jugadoresUl);
        equiposListaDiv.appendChild(equipoDiv);
    });

    textarea.value = ''; // Limpiar el textarea después de agregar
} */

    


    document.addEventListener('DOMContentLoaded', () => {
        const teamForm = document.getElementById('teamForm');
        const playerForm = document.getElementById('playerForm');
        const teamList = document.getElementById('teamList');
        const teamSelect = document.getElementById('teamSelect');
    
        let teams = [];
    
        // Función para actualizar la lista de equipos en el select y la lista de equipos
        function updateTeamList() {
            teamList.innerHTML = '';
            teamSelect.innerHTML = '<option value="">Selecciona un equipo</option>';
            
            teams.forEach((team, index) => {
                // Añadir equipo al select
                const option = document.createElement('option');
                option.value = index;
                option.textContent = team.name;
                teamSelect.appendChild(option);
    
                // Crear el elemento de lista para el equipo
                const li = document.createElement('li');
    
                // Crear un span para el nombre del equipo
                const teamNameSpan = document.createElement('span');
                teamNameSpan.textContent = team.name;
                teamNameSpan.className = 'team-name';
                li.appendChild(teamNameSpan);
    
                // Crear el texto de jugadores
                const playersText = document.createElement('span');
                if (team.players.length > 0) {
                    const playerNames = team.players.map(player => `<span class="player-name">${player}</span>`).join(', ');
                    playersText.innerHTML = ` - Jugadores: ${playerNames}`;
                } else {
                    playersText.textContent = ' - Jugadores: Ninguno';
                }
                li.appendChild(playersText);
    
                // Crear botón de eliminar
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Eliminar';
                deleteButton.className = 'delete-button';
                deleteButton.addEventListener('click', () => {
                    if (confirm(`¿Estás seguro de que deseas eliminar el equipo "${team.name}"?`)) {
                        teams.splice(index, 1);
                        updateTeamList();
                    }
                });
    
                li.appendChild(deleteButton);
                teamList.appendChild(li);
            });
        }
    
        // Manejar el envío del formulario de equipos
        teamForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const teamName = document.getElementById('teamName').value;
            if (teamName) {
                teams.push({ name: teamName, players: [] });
                updateTeamList();
                teamForm.reset();
            }
        });
    
        // Manejar el envío del formulario de jugadores
        playerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const playerName = document.getElementById('playerName').value;
            const teamIndex = document.getElementById('teamSelect').value;
    
            if (playerName && teamIndex !== '') {
                if (teams[teamIndex].players.length < 2) {
                    teams[teamIndex].players.push(playerName);
                    updateTeamList();
                    playerForm.reset();
                } else {
                    alert(`El equipo "${teams[teamIndex].name}" ya tiene 2 jugadores registrados. No se pueden añadir más jugadores.`);
                }
            }
        });
    });
    