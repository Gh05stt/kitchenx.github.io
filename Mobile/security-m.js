document.addEventListener("DOMContentLoaded", function() {
    const revealButton = document.getElementById("revealBackupCodes");
    const modal = document.getElementById("backupCodesModal");
    const span = document.getElementsByClassName("close")[0];
    const backupCodesList = document.getElementById("backupCodesList");

    // Generate random words for backup codes
    function generateBackupCodes() {
        const words = ["XLWwR", "fgnuF", "FzDmq", "Vbhvx", "qbeAm", "wAESg", "GXOQv"];
        let codes = [];
        for (let i = 0; i < 5; i++) {
            const code = words[Math.floor(Math.random() * words.length)] + "-" + words[Math.floor(Math.random() * words.length)];
            codes.push(code);
        }
        return codes;
    }

    // Populate the backup codes list
    function populateBackupCodes() {
        const codes = generateBackupCodes();
        backupCodesList.innerHTML = "";
        codes.forEach(code => {
            const li = document.createElement("li");
            li.textContent = code;
            backupCodesList.appendChild(li);
        });
    }

    // When the user clicks the button, open the modal
    revealButton.onclick = function() {
        populateBackupCodes();
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
