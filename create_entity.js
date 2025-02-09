const Entity = require('./models/entity');
 
async function addEntity() {
    try {
        const newEntity = await Entity.create({
            entity_name: "Manual Insert"
        });
        console.log("Inserted entity:", newEntity.toJSON());
    } catch (err) {
        console.error("Error inserting entity:", err);
    }
}
 
addEntity();