const questions = [
    {
        question: "Siapa orang yang menciptakan Ambatron?",
        options: ["A: Farhan kebab", "B: Rusdi", "C: Mr.ironi", "D: Prof.ironi"],
        correct: "D"
    },
    {
        question: "Siapa yang bertanggung jawab atas pembunuhan munir?",
        options: ["A: ****", "B: ....", "C: Saya masih ingin hidup tenang", "D: Meg"],
        correct: "C"
    },
    {
        question: "2x3/4*100*2/²lobang lobang² ²lobang lobang*lobang 2lobang ²lobang",
        options: ["A: 2 lobang", "B: 1027", "C: ²lobang", "D: lobang²"],
        correct: "C"
    },
    {
        question: "Saat kalian main mobile legend di ranked, apabila kalian di menit 5 sudah mati 10, apa yang akan kalian lakukan",
        options: ["A: Menyerah", "B: Ketik musik dan spam stiker sheeesss", "C: Menyalahkan Pemerintah", "D: Jaringan telkomsel macam taik"],
        correct: "B"
    },
    {
        question: "Fatur adalah orang yang suka ke warnet, suatu hari dia kehilangan motornya di warnet karna lupa mengambil kuncinya. berapakah 2+2+8*0",
        options: ["A: 0", "B: 12", "C: 4", "D: 25🤣"],
        correct: "C"
    },
    
    // Tambahkan soal lainnya sesuai keinginanmu
];

let currentQuestionIndex = 0;

// Fungsi untuk mengacak array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        window.location.href = 'congratulations.html'; // Redirect ke halaman selamat
        return;
    }
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').innerText = currentQuestion.question;
    const optionButtons = document.querySelectorAll('.option');
    optionButtons.forEach((button, index) => {
        button.innerText = currentQuestion.options[index];
        button.onclick = () => checkAnswer(button.innerText[0]);
    });
}

function checkAnswer(answer) {
    const correctAnswer = questions[currentQuestionIndex].correct;
    if (answer === correctAnswer) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        window.location.href = 'scare.html'; // Redirect ke halaman "scare"
    }
}

// Acak soal sebelum memulai quiz
shuffle(questions);
loadQuestion(); // Mulai quiz
