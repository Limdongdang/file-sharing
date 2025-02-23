import { DataTypes } from "sequelize";
import { sequelize } from "./index.js";
import { User } from "./user.model.js";

const File = sequelize.define('File', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    originalname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    filename: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    path: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    size: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    mimetype: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    uploader: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        }
    },
},{
    tableName: 'TB_FILE',
    timestamps: true,
});

User.hasMany(File, {foreignKey: 'uploader'});
File.belongsTo(User, { foreignKey: 'uploader'});


export { File };
