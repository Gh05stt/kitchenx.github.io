window.addEventListener('load', () => {
    document.getElementById('splash-screen').style.display = 'flex';

    const phrases = [
        'Marinating the Servers',
        'Sharpening the Processors',
        'Hiding the kids',
        'Tenderising the TCP',
    ];

    const getRandomIndex = () => Math.floor(Math.random() * phrases.length);
    const splashTextElement = document.getElementById("splash-text");
    if (splashTextElement) {
        splashTextElement.textContent = phrases[getRandomIndex()];
    }

    localStorage.setItem('splashShown', 'true');

    setTimeout(() => {
        document.getElementById('splash-screen').style.display = 'none';
    }, 1000); 
});
