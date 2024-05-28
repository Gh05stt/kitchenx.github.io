document.addEventListener('DOMContentLoaded', function() {
    const settings = ['bookingsAlerts', 'messages', 'availabilityChanges', 'newLogins', 'unknownLogins', 'passwordChanges', 'twoFactorAlerts'];

    // Restore saved settings
    settings.forEach(function(id) {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            // Check if a saved state exists in localStorage
            const savedState = localStorage.getItem(id);
            if (savedState !== null) {
                checkbox.checked = savedState === 'true';
            }
        } else {
            console.error("Checkbox with ID '" + id + "' does not exist.");
        }
    });

    // Save settings to local storage
    settings.forEach(function(id) {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                localStorage.setItem(id, checkbox.checked);
            });
        }
    });
});
