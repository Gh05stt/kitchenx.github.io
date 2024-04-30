document.addEventListener('DOMContentLoaded', function() {
    const transitionOverlay = document.querySelector('.fade-overlay');
    const transitionButton = document.getElementById('transition'); // Button that triggers the fade

    if (transitionButton) {
        transitionButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent the default link behavior
            const targetUrl = transitionButton.getAttribute('href'); // Get the URL from the button

            // Start the fade effect
            transitionOverlay.classList.add('fade-in');

            // Wait for the fade to complete before changing the page
            setTimeout(function() {
                window.location.href = targetUrl;
            }, 500); // This timeout should match the duration of the fade effect
        });
    }
});
