import {sequelize,Sequelize} from './sequelize';
/**
*	项目管理员
*/
const AppManager = sequelize.define('AppManager', 
                                    {
								    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
								    user_id : {type : Sequelize.INTEGER, allowNull : false},
								    app_id : {type : Sequelize.INTEGER, allowNull : false}
                                    },{
							        'freezeTableName': true,
							        'tableName': 't_app_managers',
							        'timestamps': false,
							        'paranoid': false,
							        'createdAt': 'created_at',
							        'updatedAt': 'updated_at',
							        'deletedAt': 'deleted_at'
                                    }
    						 );
export default AppManager;