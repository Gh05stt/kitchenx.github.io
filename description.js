document.addEventListener("DOMContentLoaded", () => {
    const kitchenTypeElement = document.getElementById("kitchenType");
    const descriptionElement = document.querySelector(".description p");

    const descriptions = {
        "Ice Cream Parlor": `
            Transform your ice cream business dreams into reality with this perfectly equipped kitchen space,
            ideal for an ice cream parlor. Situated in a bustling neighborhood with high foot traffic, 
            this space offers everything you need to start serving your delicious creations to eager customers.

            <br> <br>
            Features:
            <br>
            1. Prime Location: Nestled in a vibrant community, surrounded by popular retail stores, cafes, and family-friendly venues, ensuring a steady stream of potential customers.
            <br> <br>
            2. Spacious Layout: With ample room for ice cream production, storage, and customer service, this kitchen space is designed for efficiency and comfort.
            <br> <br>
            3. Equipment Included: The space comes with essential ice cream-making equipment, including:
            - Prep tables and storage units
            - Wash sinks and sanitation areas
            <br> <br>
            4. Modern Amenities: Benefit from up-to-date facilities such as high-speed internet, air conditioning, and robust security systems to ensure a safe and comfortable working environment.
        `,
        "Bakery Kitchen": `
            Step into the world of baking with this well-equipped bakery kitchen space, ideal for creating delightful pastries, breads, and cakes. Located in a high-traffic area, this kitchen offers all the tools and space you need to succeed.

            <br> <br>
            Features:
            <br>
            1. Excellent Location: Positioned in a busy neighborhood, surrounded by shops and cafes, providing a constant flow of potential customers.
            <br> <br>
            2. Spacious Design: Plenty of room for baking, storage, and customer interaction, making it easy to manage your bakery business.
            <br> <br>
            3. Fully Equipped: The kitchen includes all necessary baking equipment, such as:
            - Mixers and ovens
            - Prep tables and storage units
            <br> <br>
            4. Modern Facilities: Enjoy modern amenities like high-speed internet, air conditioning, and top-notch security systems for a productive and safe working environment.
        `,
        "Restaurant Kitchen": `
            Elevate your culinary creations in this top-tier restaurant kitchen, designed for professional chefs and restaurateurs. Located in a prime area, this kitchen provides the perfect environment to prepare gourmet dishes and serve a diverse clientele.

            <br> <br>
            Features:
            <br>
            1. Prime Location: Situated in a bustling urban center, surrounded by popular dining establishments and attractions, ensuring a steady flow of customers.
            <br> <br>
            2. Spacious Layout: Ample space for food preparation, cooking, and plating, allowing for efficient workflow and team collaboration.
            <br> <br>
            3. State-of-the-Art Equipment: The kitchen is equipped with high-end appliances and tools, including:
            - Commercial-grade stoves and ovens
            - Refrigerators and freezers
            - Prep stations and storage units
            - Dishwashing facilities
            <br> <br>
            4. Modern Amenities: Enjoy cutting-edge amenities like high-speed internet, air conditioning, and advanced security systems, providing a comfortable and secure working environment.
            <br> <br>
            5. Hygiene and Safety: The kitchen is designed with hygiene and safety in mind, featuring easy-to-clean surfaces, proper ventilation, and compliance with health and safety regulations.
            <br> <br>
            6. Customizable Space: The layout can be adjusted to suit specific culinary needs, making it ideal for a variety of restaurant concepts, from fine dining to casual eateries.
        `,
        "Catering Kitchen": `
            Expand your catering business with this fully-equipped catering kitchen, perfect for preparing large quantities of food for events and gatherings. This kitchen space offers everything needed to streamline your catering operations and deliver exceptional service.

            <br> <br>
            Features:
            <br>
            1. Strategic Location: Conveniently located for easy access to major event venues, ensuring timely delivery and service.
            <br> <br>
            2. Large Capacity: Ample space to prepare and store large quantities of food, allowing for efficient workflow and scalability.
            <br> <br>
            3. Professional Equipment: Equipped with high-capacity ovens, refrigerators, and prep areas, including:
            - Walk-in coolers and freezers
            - High-volume stoves and ovens
            - Large prep tables and storage units
            <br> <br>
            4. Modern Amenities: Enjoy facilities such as high-speed internet, air conditioning, and comprehensive security systems for a productive working environment.
            <br> <br>
            5. Compliance and Safety: Designed to meet all health and safety regulations, with features like proper ventilation, sanitation stations, and easy-to-clean surfaces.
        `,
        "Pizzeria Kitchen": `
            Bring your pizza creations to life in this specialized pizzeria kitchen, designed for making the perfect pizzas. Located in a high-traffic area, this kitchen is equipped to handle everything from dough preparation to baking delicious pizzas.

            <br> <br>
            Features:
            <br>
            1. Prime Location: Positioned in a busy area with high visibility, surrounded by complementary businesses that attract pizza lovers.
            <br> <br>
            2. Spacious Design: Plenty of room for dough preparation, topping assembly, and baking, ensuring a smooth and efficient pizza-making process.
            <br> <br>
            3. Specialized Equipment: The kitchen includes all necessary pizza-making equipment, such as:
            - Pizza ovens and prep tables
            - Refrigeration for ingredients
            - Dough mixers and storage units
            <br> <br>
            4. Modern Amenities: Benefit from facilities like high-speed internet, air conditioning, and advanced security systems to create a comfortable and secure working environment.
            <br> <br>
            5. Hygiene and Safety: Designed with hygiene and safety in mind, featuring easy-to-clean surfaces, proper ventilation, and compliance with health and safety regulations.
        `,
        "Fast Food Kitchen": `
            Streamline your fast food operations with this efficiently designed fast food kitchen, perfect for preparing a variety of quick-serve meals. Located in a high-traffic area, this kitchen is equipped to handle high volumes and deliver fast service.

            <br> <br>
            Features:
            <br>
            1. Strategic Location: Situated in a bustling area with high foot traffic, ensuring a steady flow of customers.
            <br> <br>
            2. Efficient Layout: Designed for quick preparation and service, with separate areas for cooking, assembly, and packaging.
            <br> <br>
            3. Commercial Equipment: Equipped with high-efficiency appliances and tools, including:
            - Deep fryers and grills
            - Refrigeration units and prep tables
            - Fast food assembly stations
            <br> <br>
            4. Modern Amenities: Enjoy modern facilities like high-speed internet, air conditioning, and robust security systems for a productive working environment.
            <br> <br>
            5. Hygiene and Safety: Built to meet all health and safety standards, with features like proper ventilation, easy-to-clean surfaces, and sanitation stations.
        `
    };

    function updateDescription() {
        const kitchenType = kitchenTypeElement.textContent.trim();
        if (descriptions[kitchenType]) {
            descriptionElement.innerHTML = descriptions[kitchenType];
        } else {
            descriptionElement.innerHTML = "Description not available for this kitchen type.";
        }
    }

    updateDescription();
});
