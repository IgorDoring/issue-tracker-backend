import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize
} from 'sequelize'

export class UserModel extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
> {
    declare id: CreationOptional<number>
    declare username: string
    declare password: string
}

export function initUserModel(sequelize: Sequelize): void {
    UserModel.init(
        {
            id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
            username: { type: DataTypes.STRING, unique: true, allowNull: false },
            password: { type: DataTypes.STRING, allowNull: false }
        },
        { sequelize }
    )
}
