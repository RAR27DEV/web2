// Variabel global
let songs = [
    { title: "Lagu 1", audio: "../html/mp3/akhir.mp3", lyrics: "lirik lanjutan lagu 1" },
    { title: "Lagu 2", audio: "../html/mp3/akhir.mp3", lyrics: "lirik lanjutan lagu 2" },
    { title: "Lagu 3", audio: "../html/mp3/akhir.mp3", lyrics: "lirik lanjutan lagu 3" },
];
let currentSongIndex = 0;
let score = 0;
let recognition;

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
    setupSpeechRecognition();
    score = 0;
    updateScore();
    currentSongIndex = 0;
    playNextSong();
}

// Fungsi untuk memutar lagu berikutnya
function playNextSong() {
    if (currentSongIndex < songs.length) {
        let currentSong = songs[currentSongIndex];
        document.getElementById('current-song').textContent = currentSong.title;
        
        let audio = new Audio(currentSong.audio);
        audio.play();
        
        // Hanya memutar 10 detik pertama
        setTimeout(() => {
            audio.pause();
            document.getElementById('record').disabled = false;
        }, 10000);

        currentSongIndex++;
    } else {
        endGame();
    }
}

// Fungsi untuk mengakhiri permainan
function endGame() {
    document.getElementById('game-screen').style.display = 'none';
    document.getElementById('end-screen').style.display = 'block';
    document.getElementById('final-score').textContent = `Skor Akhir: ${score}`;
}

// Fungsi untuk setup pengenalan suara
function setupSpeechRecognition() {
    window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = 'id-ID';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = function(event) {
        var userLyrics = event.results[0][0].transcript;
        checkLyrics(userLyrics);
    };

    recognition.onerror = function(event) {
        console.error('Error occurred in recognition: ' + event.error);
        showMessage('Terjadi kesalahan dalam pengenalan suara. Coba lagi.');
        document.getElementById('record').disabled = false;
        document.getElementById('record').textContent = 'Rekam Jawaban';
    }
}

// Fungsi untuk merekam jawaban
function recordAnswer() {
    recognition.start();
    document.getElementById('record').disabled = true;
    document.getElementById('record').textContent = 'Mendengarkan...';
}

// Fungsi untuk memeriksa lirik
function checkLyrics(userLyrics) {
    let currentSong = songs[currentSongIndex - 1];
    if (currentSong.lyrics.toLowerCase().includes(userLyrics.toLowerCase())) {
        score += 10;
        updateScore();
        showMessage('Benar! +10 poin. Lanjut ke lagu berikutnya.');
        playNextSong();
    } else {
        showMessage('Maaf, jawaban tidak tepat. Coba lagi.');
    }
    document.getElementById('record').disabled = false;
    document.getElementById('record').textContent = 'Rekam Jawaban';
}

// Fungsi untuk memperbarui skor
function updateScore() {
    document.getElementById('score').textContent = 'Skor: ' + score;
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
}

// Event listeners
document.getElementById('start-game').addEventListener('click', startGame);
document.getElementById('record').addEventListener('click', recordAnswer);
document.getElementById('replay').addEventListener('click', startGame);
document.getElementById('main-menu-btn').addEventListener('click', showMainMenu);