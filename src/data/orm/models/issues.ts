import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Sequelize
} from 'sequelize'

export class IssuesModel extends Model<
    InferAttributes<IssuesModel>,
    InferCreationAttributes<IssuesModel>
> {
    declare issueNo: CreationOptional<number>
    declare title: string
    declare description: string
    declare priority: string
    declare type: string
    declare completed: Date | null
}

export function initIssuesModel(sequelize: Sequelize): void {
    IssuesModel.init(
        {
            issueNo: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true
            },
            title: {
                type: DataTypes.STRING
            },
            description: {
                type: DataTypes.TEXT
            },
            priority: {
                type: DataTypes.ENUM('low', 'high')
            },
            type: {
                type: DataTypes.ENUM('Feature', 'Bug', 'Documentation')
            },
            completed: {
                type: DataTypes.DATE
            }
        },
        {
            sequelize
        }
    )
}
