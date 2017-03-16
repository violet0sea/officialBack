import  Sequelize from 'sequelize';
import config from '../config'
const sequelize = new Sequelize(
									config.db.dbname,                  
								    config.db.username,              
								    config.db.password,             
								    {
								        'dialect': config.db.dialect,  
								        'host': config.db.host, 
								        'port': config.db.port,      
								        'timestamp': false,
								        'define': {
           											 'underscored': true // 字段以下划线（_）来分割（默认是驼峰命名风格）
        										  }
								    }
								); 
export {sequelize,Sequelize};