document.addEventListener('DOMContentLoaded', () => {
    const numDisksInput = document.getElementById('numDisks');
    const btnSolve = document.getElementById('btnSolve');
    const btnReset = document.getElementById('btnReset');
    const stepCountDisplay = document.getElementById('stepCount'); // Nova referência
    
    const towers = {
        'A': document.querySelector('#tower-A .disks'),
        'B': document.querySelector('#tower-B .disks'),
        'C': document.querySelector('#tower-C .disks')
    };

    let moves = [];
    let isSolving = false;
    let stepCount = 0; // Nova variável

    function initGame() {
        if (isSolving) return;
        
        towers['A'].innerHTML = '';
        towers['B'].innerHTML = '';
        towers['C'].innerHTML = '';
        moves = [];
        
        // Reseta o contador visualmente e na memória
        stepCount = 0;
        stepCountDisplay.textContent = stepCount;

        const numDisks = parseInt(numDisksInput.value);
        
        for (let i = numDisks; i >= 1; i--) {
            const disk = document.createElement('div');
            disk.classList.add('disk');
            disk.style.width = `${i * 15 + 20}px`; 
            disk.style.backgroundColor = `hsl(${i * 40}, 70%, 60%)`;
            disk.dataset.size = i;
            disk.id = `disk-${i}`;
            
            towers['A'].appendChild(disk);
        }
    }

    function hanoi(n, source, auxiliary, target) {
        if (n === 1) {
            moves.push({ from: source, to: target });
            return;
        }
        hanoi(n - 1, source, target, auxiliary);
        moves.push({ from: source, to: target });
        hanoi(n - 1, auxiliary, source, target);
    }

    function playMoves() {
        if (moves.length === 0) {
            isSolving = false;
            btnSolve.disabled = false;
            btnReset.disabled = false;
            numDisksInput.disabled = false;
            return;
        }

        const move = moves.shift();
        const sourceTower = towers[move.from];
        const targetTower = towers[move.to];

        const diskToMove = sourceTower.lastElementChild;
        
        if (diskToMove) {
            targetTower.appendChild(diskToMove);
            
            // Incrementa o contador na tela a cada disco movido
            stepCount++;
            stepCountDisplay.textContent = stepCount;
        }

        setTimeout(playMoves, 500);
    }

    btnSolve.addEventListener('click', () => {
        const numDisks = parseInt(numDisksInput.value);
        
        isSolving = true;
        btnSolve.disabled = true;
        btnReset.disabled = true;
        numDisksInput.disabled = true;

        hanoi(numDisks, 'A', 'B', 'C');
        
        playMoves();
    });

    btnReset.addEventListener('click', initGame);
    numDisksInput.addEventListener('change', initGame);

    initGame();
});