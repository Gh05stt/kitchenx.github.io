document.addEventListener('DOMContentLoaded', function() {
    const profileBtn = document.getElementById('profileBtn');
    const profileWrapper = document.getElementById('profileWrapper');

    profileBtn.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent default link behavior
        profileWrapper.classList.toggle('show');
    });

    document.addEventListener('click', function(event) {
        if (!profileWrapper.contains(event.target) && event.target !== profileBtn) {
            profileWrapper.classList.remove('show');
        }
    });
});
