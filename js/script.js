// ВЕСЬ JAVASCRIPT ПЕРЕНОСИМ СЮДА

// Получаем элементы
const passwordInput = document.getElementById('passwordOutput');
const lengthSlider = document.getElementById('lengthSlider');
const lengthValue = document.getElementById('lengthValue');
const useUpper = document.getElementById('useUpper');
const useLower = document.getElementById('useLower');
const useDigits = document.getElementById('useDigits');
const useSymbols = document.getElementById('useSymbols');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const toast = document.getElementById('toastMsg');

// Наборы символов
const upperSet = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
const lowerSet = 'abcdefghijkmnopqrstuvwxyz';
const digitSet = '23456789';
const symbolSet = '!@#$%^&*()_+[]{}<>?/\\|';

// Функция получения пула символов
function getCharacterPool() {
    let pool = '';
    
    if (useUpper.checked) pool += upperSet;
    if (useLower.checked) pool += lowerSet;
    if (useDigits.checked) pool += digitSet;
    if (useSymbols.checked) pool += symbolSet;
    
    return pool;
}

// Генерация пароля
function generatePassword(length, pool) {
    if (!pool) return 'Выберите типы символов';
    
    let result = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * pool.length);
        result += pool[randomIndex];
    }
    return result;
}

// Обновление пароля
function refreshPassword() {
    const length = parseInt(lengthSlider.value);
    const pool = getCharacterPool();
    
    if (pool.length === 0) {
        passwordInput.value = '⚠️ Выберите тип символов';
        return;
    }
    
    passwordInput.value = generatePassword(length, pool);
}

// Копирование в буфер
async function copyToClipboard() {
    const text = passwordInput.value;
    if (!text || text.includes('⚠️')) {
        showToast('❌ Нечего копировать');
        return;
    }
    
    try {
        await navigator.clipboard.writeText(text);
        showToast('✅ Пароль скопирован!');
    } catch (err) {
        showToast('❌ Ошибка копирования');
    }
}

function showToast(message) {
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => {
        toast.classList.remove('show');
    }, 1800);
}

// Обработчики событий
lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
    refreshPassword();
});

useUpper.addEventListener('change', refreshPassword);
useLower.addEventListener('change', refreshPassword);
useDigits.addEventListener('change', refreshPassword);
useSymbols.addEventListener('change', refreshPassword);
generateBtn.addEventListener('click', refreshPassword);
copyBtn.addEventListener('click', copyToClipboard);

// Запуск при загрузке
refreshPassword();