document.addEventListener("DOMContentLoaded", function () {
    const facilityTypeSelect = document.getElementById("facility-type");
    const mainImage = document.querySelector(".main-image img");
    const thumbnails = document.querySelectorAll(".thumbnail");

    facilityTypeSelect.addEventListener("change", function () {
        const selectedType = facilityTypeSelect.value;

        const indexes = [2, 3, 4, 5, 6, 7];

        indexes.sort(() => Math.random() - 0.5);

        if (selectedType) {
            mainImage.src = `Images/Facilities/${selectedType.replace(/\s+/g, '_')}/1.jpeg`;

            for (let i = 0; i < 3; i++) {
                thumbnails[i].src = `Images/Facilities/${selectedType.replace(/\s+/g, '_')}/${indexes[i]}.jpeg`;
            }
        } else if(selectedType === "") { 
            mainImage.src = "Images/grey.jpeg"; 
            thumbnails.forEach(thumbnail => {
                thumbnail.src = "Images/grey.jpeg";
            });
        }
    });
});
