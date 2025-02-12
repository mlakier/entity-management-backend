module.exports = (sequelize, DataTypes) => {
    const Entity = sequelize.define('Entity', {
        entity_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        entity_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        parent_entity_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'Entities', // Assumes Entities table exists
                key: 'entity_id'
            }
        },
        base_currency: {
            type: DataTypes.STRING,
            allowNull: false
        },
        region: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tax_id: {
            type: DataTypes.STRING,
            allowNull: false
        },
        created_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        updated_by: {
            type: DataTypes.STRING,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        timestamps: false,  // ❌ Turning off automatic timestamps because we defined them manually
        underscored: true,   // ✅ Ensures column names use snake_case (`created_at` instead of `createdAt`)
        tableName: "Entities" // ✅ Explicit table name
    });

    return Entity;
};
