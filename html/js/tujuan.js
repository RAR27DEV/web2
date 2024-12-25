let currentDialog = -1;
let isSoundOn = true;
const dialogs = [
    // Tambahkan dialog dan path gambar Anda di sini
    {text: ".......", image: "../html/img/story1.jpg"},
    {text: "ara~ara", image: "../html/img/story1.jpg"},
    {text: "cup cup cup", image: "../html/img/story1.jpg"},
    {text: "kamu terlihat sangat lemah", image: "../html/img/story1.jpg"},
    {text: "kasihan sekali", image: "../html/img/story1.jpg"},
    {text: "ikut lah pulang denganku", image: "../html/img/story2.jpg"},
    {text: "akan ku buatkan semangkuk sup kacang hangat", image: "../html/img/story3.jpg"},
    {text: "~ara~", image: "../html/img/story4.jpg"},
    {text: "sekarang kamu sudah besar", image: "../html/img/story4.jpg"},
    {text: "kurasa pesona ku mulai berkurang sedikit", image: "../html/img/story4.jpg"},
    {text: "tidak kok", image: "../html/img/story5.jpg"},
    {text: "ibu masih sama cantiknya", image: "../html/img/story5.jpg"},
    {text: "seperti dulu saat kita berjumpa", image: "../html/img/story5.jpg"},
    {text: "ara~ara", image: "../html/img/story5.jpg"},
    {text: "kau pandai memuji, ya?", image: "../html/img/story5.jpg"},
    {text: "baiklah", image: "../html/img/story5.jpg"},
    {text: "makan malam hari ini adalah sup kacang favoritmu", image: "../html/img/story5.jpg"},
    {text: "ayo kita buat bersama", image: "../html/img/story5.jpg"},
    {text: "bu, aku bermimpi", image: "../html/img/story6.jpg"},
    {text: "masa masa sebelum ibu memungutku", image: "../html/img/story6.jpg"},
    {text: "sudah lama sekali", image: "../html/img/story6.jpg"},
    {text: ".......", image: "../html/img/story6.jpg"},
    {text: "mungkin itu yang mereka maksud dengan", image: "../html/img/story6.jpg"},
    {text: "seseorang akan melihat kilas balik hidupnya sebelum kematiannya", image: "../html/img/story6.jpg"},
    {text: "hahaha", image: "../html/img/story6.jpg"},
    {text: "mungkin saja", image: "../html/img/story6.jpg"},
    {text: "saat itu", image: "../html/img/story7.jpg"},
    {text: "tubuhku sudah sangat sekarat", image: "../html/img/story7.jpg"},
    {text: "bahkan waktu itu kupikir aku sudah mati", image: "../html/img/story7.jpg"},
    {text: "lalu ibu menolongku yang sudah putus asa", image: "../html/img/story7.jpg"},
    {text: "sejak hati itu", image: "../html/img/story8.jpg"},
    {text: "IBU", image: "../html/img/story9.jpg"},
    {text: "Engkaulah satu satunya alasanku untuk tetap hidup", image: "../html/img/story10.jpg"},
    {text: ".......", image: "../html/img/story11.jpg"},
    {text: "Terimakasih karna telah membesarkanku", image: "../html/img/story11.jpg"},
    {text: "Ibu", image: "../html/img/story12.jpg"},
    {text: "tiba tiba sekali", image: "../html/img/story13.jpg"},
    {text: "biasanya kau terlalu malu untuk mengatakan hal semacam itu", image: "../html/img/story13.jpg"},
    {text: "apakah malaikat maut akhirnya menjemput mu", image: "../html/img/story13.jpg"},
    {text: ".......", image: "../html/img/story14.jpg"},
    {text: "mungkin", image: "../html/img/story14.jpg"},
    {text: "apa boleh buat", image: "../html/img/story14.jpg"},
    {text: "dari tadi", image: "../html/img/story15.jpg"},
    {text: "aku merasa sangat mengantuk", image: "../html/img/story15.jpg"},
    {text: "apa boleh buat", image: "../html/img/story15.jpg"},
    {text: ".......", image: "../html/img/story15.jpg"},
    {text: "........", image: "../html/img/story16.jpg"},
    {text: "(menepuk pelan kepalanya)", image: "../html/img/story17.jpg"},
    {text: ".......", image: "../html/img/story18.jpg"},
    {text: "tidurlah yang nyeyak...", image: "../html/img/story18.jpg"},
    {text: "ANAKKU YANG MANIS", image: "../html/img/story19.jpg"},
    
    // ...
];

function startGame() {
    document.getElementById('intro-container').style.display = 'none';
    document.getElementById('game-container').style.display = 'block';
    document.getElementById('background-music').play();
    nextDialog();
}

function nextDialog() {
    if (currentDialog < dialogs.length - 1) {
        currentDialog++;
        updateDialog();
    } else {
        showEndDialog();
    }
}

function showEndDialog() {
    document.getElementById('end-dialog').style.display = 'block';
}

function goToMainMenu() {
    document.getElementById('end-dialog').style.display = 'none';
    document.getElementById('game-container').style.display = 'none';
    document.getElementById('intro-container').style.display = 'block';
    currentDialog = -1;
    document.getElementById('background-music').pause();
    document.getElementById('background-music').currentTime = 0;
}

function restartStory() {
    document.getElementById('end-dialog').style.display = 'none';
    currentDialog = -1;
    nextDialog();
}

function previousDialog() {
    if (currentDialog > 0) {
        currentDialog--;
        updateDialog();
    }
}

function updateDialog() {
    const dialog = dialogs[currentDialog];
    document.getElementById('dialog-text').innerText = dialog.text;
    document.getElementById('story-image').src = dialog.image;
}

function toggleSound() {
    const music = document.getElementById('background-music');
    const soundToggle = document.getElementById('sound-toggle');
    if (isSoundOn) {
        music.pause();
        soundToggle.innerText = '🔈';
    } else {
        music.play();
        soundToggle.innerText = '🔇';
    }
    isSoundOn = !isSoundOn;
}
