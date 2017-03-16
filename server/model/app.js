import {sequelize,Sequelize} from './sequelize';
/**
*	用户表
*/
const App = sequelize.define('App',
                             {
									    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
									    name:{type : Sequelize.STRING, allowNull : false},
									    description : {type : Sequelize.STRING, allowNull : true},
									    width : {type : Sequelize.STRING, allowNull : false},
									    height : {type : Sequelize.STRING, allowNull : false},
									    status: {type : Sequelize.STRING, allowNull : false},
									    auth_id:{type : Sequelize.INTEGER,allowNull:false},
									    start_time :{type : Sequelize.DATE, allowNull : false},
									    end_time :{type : Sequelize.DATE, allowNull : false},
									    pages: {type: Sequelize.TEXT('tiny'), allowNull: true},
									    create_time: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
									    delete_flag: {type: Sequelize.INTEGER, defaultValue: 1},
									    thumbnail: {type: Sequelize.STRING, allowNull: true}
                             },
                             {
									    'freezeTableName': true,
									    'tableName': 't_apps',
									    'timestamps': false,
									    'paranoid': false,
									    'createdAt': 'created_at',
									    'updatedAt': 'updated_at',
									    'deletedAt': 'deleted_at'
                             }

    						 );
export default App;