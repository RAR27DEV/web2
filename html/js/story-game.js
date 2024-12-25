// Array untuk dialog cerita
const storyDialog = [
    "Fatur adalah anak yang baik, suatu hari dia tidak sengaja bertemu dengan seseorang saat ingin pergi ke warnet",
    "Orang itu tampak lesu, fatur sangat ingin menolongnya namun dia juga sedang buru buru ingin kewarnet untuk login valorant",
    "Saat fatur hendak pergi tiba tiba orang itu memengang tangan fatur. fatur bingung harus melakukan apa"
];

// Array gambar yang sesuai dengan dialog
const storyImages = [
    "../html/img/baik.jpg", // Gambar untuk dialog pertama
    "../html/img/capek.png",   // Gambar untuk dialog kedua
    "../html/img/curiga.jpg"    // Gambar untuk dialog ketiga
];

let currentDialogIndex = 0;
const dialogTextElement = document.getElementById('dialog-text');
const dialogBoxElement = document.getElementById('dialog-box');
const choicesContainer = document.getElementById('choices-container');
const storyImageElement = document.getElementById('story-image');

// Fungsi untuk menampilkan dialog berikutnya dan mengubah gambar
function showNextDialog() {
    if (currentDialogIndex < storyDialog.length - 1) {
        currentDialogIndex++;
        dialogTextElement.textContent = storyDialog[currentDialogIndex];
        storyImageElement.src = storyImages[currentDialogIndex];
        storyImageElement.style.display = 'block'; // Tampilkan gambar
    } else {
        // Setelah dialog terakhir, munculkan opsi pilihan
        choicesContainer.style.display = 'block';
        dialogBoxElement.style.display = 'none'; // Sembunyikan kolom teks
        storyImageElement.style.display = 'none'; // Sembunyikan gambar
    }
}

// Tampilkan gambar pertama saat halaman dimuat
window.onload = function() {
    storyImageElement.src = storyImages[0];
    storyImageElement.style.display = 'block';
};

// Event listener untuk dialog box (klik untuk melanjutkan dialog)
dialogTextElement.addEventListener('click', showNextDialog);

// Fungsi untuk menangani pilihan pengguna
function chooseOption(option) {
    if (option === 'option1') {
        window.location.href = 'good.html';
    } else if (option === 'option2') {
        window.location.href = 'bad.html';
    } else if (option === 'option3') {
        window.location.href = 'nguwaur.html';
    }
}
