document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.option-button');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent.trim().toLowerCase();
            switch(buttonText) {
                case 'story':
                    window.location.href = 'html/substory.html';
                    break;
                case 'kuis':
                    window.location.href = 'html/game.html';
                    break;
                case 'puzzle':
                    window.location.href = 'html/starpuzzle.html';
                    break;
                case 'musik':
                    window.location.href = 'html/musik.html';
                    break;
                }
        });
    });
});
