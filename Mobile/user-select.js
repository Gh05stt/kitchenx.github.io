document.addEventListener('DOMContentLoaded', function() {
    const role = localStorage.getItem('userRole');
    const logoLink = document.getElementById('logoLink');
    if (role === 'host') {
        logoLink.href = 'listings-m.html';
    } else if (role === 'tenant') {
        logoLink.href = 'book-m.html';
    } else {
        logoLink.href = '#';
    }
});
