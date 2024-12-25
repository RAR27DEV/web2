// Variabel global
let songs = [
    { title: "Lagu 1", audio: "../html/mp3/akhir.mp3", lyrics: "dirimu yang aku sangka" },
    { title: "Lagu 2", audio: "../html/mp3/akhir.mp3", lyrics: "dirimu yang aku sangka" },
    { title: "Lagu 3", audio: "../html/mp3/akhir.mp3", lyrics: "dirimu yang aku sangka" },
];

let currentSongIndex = 0;
let score = 0;
let mistakes = 0;
let recognition;
let isListening = false;

// Fungsi untuk mengacak urutan lagu
function shuffleSongs() {
    for (let i = songs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [songs[i], songs[j]] = [songs[j], songs[i]];
    }
}

// Fungsi untuk memulai permainan
function startGame() {
    shuffleSongs();
    document.getElementById('main-menu').style.display = 'none';
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('end-screen').style.display = 'none';
    setupSpeechRecognition();
    score = 0;
    mistakes = 0;
    updateScore();
    currentSongIndex = 0;
    playNextSong();
}

// Fungsi untuk memutar lagu berikutnya
function playNextSong() {
    if (currentSongIndex < songs.length) {
        let currentSong = songs[currentSongIndex];
        document.getElementById('current-song').textContent = currentSong.title;
        
        // Nonaktifkan tombol rekam selama lagu diputar
        document.getElementById('record').disabled = true;
        
        let audio = new Audio(currentSong.audio);
        audio.play();
        
        // Hanya memutar 10 detik pertama
        setTimeout(() => {
            audio.pause();
            document.getElementById('record').disabled = false;
            showMessage('Silakan lanjutkan lirik lagu!');
        }, 10000);

        currentSongIndex++;
    } else {
        endGame(true);
    }
}

// Fungsi untuk mengakhiri permainan
function endGame(success = false) {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    
    const finalScoreElement = document.getElementById('final-score');
    if (success) {
        document.getElementById('end-screen').querySelector('h2').textContent = 'Selamat! Anda Berhasil!';
        finalScoreElement.innerHTML = `
            Skor Akhir: ${score}<br>
            Total Lagu: ${songs.length}<br>
            Kesalahan: ${mistakes}
        `;
    } else {
        document.getElementById('end-screen').querySelector('h2').textContent = 'Game Over';
        finalScoreElement.innerHTML = `
            Anda telah melakukan ${mistakes} kesalahan.<br>
            Skor Akhir: ${score}
        `;
    }
}

// Fungsi untuk setup pengenalan suara
function setupSpeechRecognition() {
    if (!('webkitSpeechRecognition' in window)) {
        alert('Maaf, browser Anda tidak mendukung pengenalan suara. Silakan gunakan Chrome.');
        return;
    }

    recognition = new webkitSpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = function() {
        isListening = true;
        document.getElementById('record').textContent = 'Mendengarkan...';
    };

    recognition.onend = function() {
        isListening = false;
        document.getElementById('record').textContent = 'Rekam Jawaban';
        document.getElementById('record').disabled = false;
    };

    recognition.onresult = function(event) {
        const userLyrics = event.results[0][0].transcript.toLowerCase();
        checkLyrics(userLyrics);
    };

    recognition.onerror = function(event) {
        console.error('Error occurred in recognition: ' + event.error);
        showMessage('Terjadi kesalahan dalam pengenalan suara. Coba lagi.');
        document.getElementById('record').disabled = false;
        document.getElementById('record').textContent = 'Rekam Jawaban';
    };
}

// Fungsi untuk merekam jawaban
function recordAnswer() {
    if (!isListening) {
        recognition.start();
        document.getElementById('record').disabled = true;
    }
}

// Fungsi untuk memeriksa lirik
function checkLyrics(userLyrics) {
    let currentSong = songs[currentSongIndex - 1];
    if (currentSong.lyrics.toLowerCase().includes(userLyrics)) {
        score += 10;
        updateScore();
        showMessage('Benar! +10 poin. Lanjut ke lagu berikutnya.');
        playNextSong();
    } else {
        mistakes++;
        showMessage(`Maaf, jawaban tidak tepat. Kesalahan ke-${mistakes}`);
        
        if (mistakes >= 3) {
            endGame(false);
        }
    }
}

// Fungsi untuk memperbarui skor
function updateScore() {
    document.getElementById('score').textContent = `Skor: ${score} | Kesalahan: ${mistakes}/3`;
}

// Fungsi untuk menampilkan pesan
function showMessage(message) {
    let messageElement = document.getElementById('message');
    messageElement.textContent = message;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.style.display = 'none';
    }, 3000);
}

// Fungsi untuk kembali ke menu utama
function showMainMenu() {
    document.getElementById('end-screen').style.display = 'none';
    document.getElementById('main-menu').style.display = 'block';
    currentSongIndex = 0;
    score = 0;
    mistakes = 0;
}

// Event listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('record').addEventListener('click', recordAnswer);
document.getElementById('replay').addEventListener('click', startGame);
document.getElementById('main-menu-btn').addEventListener('click', showMainMenu);