import {sequelize,Sequelize} from './sequelize';
/**
*	用户表
*/
const User = sequelize.define('User', 
								{
								    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
								    nickname:{type : Sequelize.STRING, allowNull : true},
								    username : {type : Sequelize.STRING, allowNull : false},
								    password : {type : Sequelize.STRING, allowNull : false}
								},
								{
							        'freezeTableName': true,
							        'tableName': 't_users',
							        'timestamps': false,
							        'paranoid': false,
							        'createdAt': 'created_at',
							        'updatedAt': 'updated_at',
							        'deletedAt': 'deleted_at'
								}
    						 )
export default User;