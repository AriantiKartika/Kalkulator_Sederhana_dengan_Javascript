// ===================================
// VARIABEL GLOBAL & ELEMENT DOM
// ===================================
const display = document.getElementById('display');
const historyDisplay = document.getElementById('history-display');
const keypad = document.querySelector('.keypad');
const memoryStatus = document.getElementById('memory-status');

// State Kalkulator 
let currentInput = '0';
let expressionTokens = []; 
let waitingForNewInput = true;
let isResultDisplayed = false;

// Advanced Features State
let memory = 0;
let history = []; 

// ===================================
// FUNGSI UTILITY & CALCULATION LOGIC
// ===================================
 
function updateDisplay() {
    if (currentInput.length > 15) {
        const num = parseFloat(currentInput);
        display.textContent = num.toPrecision(10);
    } else {
        display.textContent = currentInput;
    }
}

function updateHistoryDisplay() {
    let historyText = '';
    
    let tokensToDisplay = [...expressionTokens];
    if (!waitingForNewInput && !isResultDisplayed) {
        tokensToDisplay.push(currentInput);
    }
    
    historyText = tokensToDisplay.map(token => {
        if (typeof token === 'string') {
            return getOperatorSymbol(token);
        }
        return token;
    }).join(' ');
    
    historyDisplay.textContent = historyText;
}

/**
 * Melakukan operasi aritmatika
 * @param {number} num1 - Angka pertama
 * @param {number} num2 - Angka kedua
 * @param {string} op - Operator ('add', 'subtract', 'multiply', 'divide')
 * @returns {number|string} Hasil operasi atau pesan error
 */
function calculate(num1, num2, op) {
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);
    
    switch (op) {
        case 'add':
            return num1 + num2;
        case 'subtract':
            return num1 - num2;
        case 'multiply':
            return num1 * num2;
        case 'divide':
            if (num2 === 0) {
                return "Error: Bagi Nol"; 
            }
            return num1 / num2;
        default:
            return num2;
    }
}

/**
 * Mengubah operator string menjadi simbol untuk tampilan
 * @param {string} op - Operator string
 * @returns {string} Simbol operator
 */
function getOperatorSymbol(op) {
    switch (op) {
        case 'add':
            return '+';
        case 'subtract':
            return '-';
        case 'multiply':
            return '×';
        case 'divide':
            return '÷';
        default:
            return '';
    }
}

// ===================================
// EVENT HANDLERS (FUNGSI UTAMA)
// ===================================

/**
 * Menangani input angka (0-9) dan decimal point (.)
 * @param {string} numString - Angka atau titik desimal
 */
function handleNumber(numString) {
    if (isResultDisplayed) {
        currentInput = numString;
        isResultDisplayed = false;
        waitingForNewInput = false;
        expressionTokens = [];
    } else if (waitingForNewInput || currentInput === '0') {
        currentInput = (numString === '.') ? '0.' : numString;
        waitingForNewInput = false;
    } else if (numString === '.') {
        if (!currentInput.includes('.')) {
            currentInput += '.';
        }
    } else {
        currentInput += numString;
    }
    updateDisplay();
    updateHistoryDisplay(); 
}

/**
 * Menangani operasi aritmatika (+, -, ×, ÷)
 * @param {string} nextOperator - Operator yang dipilih
 */
function handleOperator(nextOperator) {
    const inputValue = parseFloat(currentInput);

    if (waitingForNewInput && expressionTokens.length > 0) {
        expressionTokens[expressionTokens.length - 1] = nextOperator;
    } else {
        expressionTokens.push(inputValue);
        expressionTokens.push(nextOperator);
        waitingForNewInput = true;
    }

    isResultDisplayed = false;
    updateHistoryDisplay();
}

/**
 * Menangani tombol sama dengan (=)
 */
function handleEquals() {
    if (expressionTokens.length === 0 && !isResultDisplayed) {
        return; 
    }

    if (isResultDisplayed) {
        return; 
    }
    
    // 1. Tambahkan nilai terakhir ke token
    const finalValue = parseFloat(currentInput);
    let initialTokens = [...expressionTokens, finalValue]; 
    let tokens = [...initialTokens]; 
    
    // 2. Lakukan evaluasi berdasarkan urutan operasi (precedence)
    
    // a. Operasi Perkalian dan Pembagian (×, ÷)
    let i = 1;
    while (i < tokens.length - 1) {
        const op = tokens[i];
        if (op === 'multiply' || op === 'divide') {
            const num1 = tokens[i - 1];
            const num2 = tokens[i + 1];
            
            const result = calculate(num1, num2, op);
            
            if (typeof result === 'string') {
                handleError(result);
                expressionTokens = []; 
                return;
            }
            
            tokens.splice(i - 1, 3, result);
            i = 1; 
        } else {
            i += 2;
        }
    }
    
    // b. Operasi Penambahan dan Pengurangan (+, -)
    let finalResult = tokens[0];
    for (let i = 1; i < tokens.length - 1; i += 2) {
        const op = tokens[i];
        const num2 = tokens[i + 1];
        
        const result = calculate(finalResult, num2, op);
        
        if (typeof result === 'string') {
            handleError(result);
            expressionTokens = [];
            return;
        }
        
        finalResult = result;
    }

    // 3. Simpan perhitungan ke History (Advanced Feature)
    const calculationStr = initialTokens.map(token => {
        if (typeof token === 'string') {
            return getOperatorSymbol(token);
        }
        return token;
    }).join(' ');

    const fullCalculation = `${calculationStr} = ${finalResult}`;
    addToHistory(fullCalculation);

    // 4. Reset state kalkulator
    currentInput = String(finalResult);
    expressionTokens = [];
    waitingForNewInput = true;
    isResultDisplayed = true; 
    
    updateDisplay();
    updateHistoryDisplay(); 
}

/**
 * Menangani tombol Clear (C) dan Clear Entry (CE)
 * @param {string} func - 'c' untuk Clear All, 'ce' untuk Clear Entry
 */
function handleClear(func) {
    if (func === 'c') {
        currentInput = '0';
        expressionTokens = []; 
        waitingForNewInput = true;
        isResultDisplayed = false;
    } else if (func === 'ce') {
        currentInput = '0';
        waitingForNewInput = true;
    }
    updateDisplay();
    updateHistoryDisplay();
}

/**
 * Menangani pesan error (misal: Bagi Nol)
 * @param {string} message - Pesan error
 */
function handleError(message) {
    currentInput = message;
    expressionTokens = []; 
    waitingForNewInput = true;
    isResultDisplayed = true;
    
    display.textContent = message;
    updateHistoryDisplay();
}

// ===================================
// ADVANCED FEATURES: MEMORY FUNCTIONS
// ===================================

/**
 * Menangani Memory Functions (M+, M-, MR, MC)
 * @param {string} func - Fungsi memory ('m+', 'm-', 'mr', 'mc')
 */
function handleMemory(func) {
    const currentValue = parseFloat(currentInput);
    
    switch (func) {
        case 'm+':
            memory += currentValue;
            break;
        case 'm-':
            memory -= currentValue;
            break;
        case 'mr':
            // Memory Recall: Tampilkan nilai memory
            currentInput = String(memory);
            waitingForNewInput = true;
            updateDisplay();
            break;
        case 'mc':
            // Memory Clear: Hapus nilai memory
            memory = 0;
            break;
    }
    
    // Update status 'M' di display
    if (memory !== 0) {
        memoryStatus.classList.remove('memory-status-hidden');
    } else {
        memoryStatus.classList.add('memory-status-hidden');
    }
}

// ===================================
// ADVANCED FEATURES: HISTORY FUNCTIONS
// ===================================

/**
 * Menambahkan perhitungan ke riwayat (history)
 * @param {string} calculation - String perhitungan lengkap
 */
function addToHistory(calculation) {
    history.unshift(calculation); 
    if (history.length > 5) {
        history.pop(); 
    }
    renderHistoryList();
}

/**
 * Merender daftar riwayat di dalam modal
 */
function renderHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';
    
    if (history.length === 0) {
        historyList.innerHTML = '<li>Belum ada riwayat.</li>';
        return;
    }
    
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

/**
 * Menampilkan atau menyembunyikan modal history
 */
function toggleHistoryModal(show) {
    const modal = document.getElementById('history-modal');
    modal.style.display = show ? 'block' : 'none';
    if (show) {
        renderHistoryList();
    }
}


// ===================================
// EVENT LISTENERS
// ===================================

// 1. Event Listener untuk tombol kalkulator (Delegation)
keypad.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('num-btn')) {
        handleNumber(target.dataset.num);
    } else if (target.classList.contains('op-btn')) {
        handleOperator(target.dataset.op);
    } else if (target.dataset.func === 'equals') {
        handleEquals();
    } else if (target.classList.contains('func-btn')) {
        const func = target.dataset.func;
        if (func === 'c' || func === 'ce') {
            handleClear(func);
        } else if (['mc', 'mr', 'm+', 'm-'].includes(func)) {
            handleMemory(func);
        }
    }
});

// 2. Advanced Feature: Event Listener untuk Keyboard Support
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (/[0-9]/.test(key) || key === '.') {
        handleNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        event.preventDefault(); 
        const opMap = { '+': 'add', '-': 'subtract', '*': 'multiply', '/': 'divide' };
        handleOperator(opMap[key]);
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault();
        handleEquals();
    } else if (key === 'c' || key === 'C') {
        handleClear('c'); 
    } else if (key === 'Escape') {
        event.preventDefault(); 
        handleClear('c');
    } else if (key === 'Backspace') {
        handleClear('ce'); 
    }
});

// 3. Event Listener untuk History Modal
document.getElementById('show-history-btn').addEventListener('click', () => {
    toggleHistoryModal(true);
});

document.querySelector('.close-btn').addEventListener('click', () => {
    toggleHistoryModal(false);
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('history-modal');
    if (event.target === modal) {
        toggleHistoryModal(false);
    }
});

// Inisialisasi tampilan awal
updateDisplay();
renderHistoryList();