/*
* @Author: zhangyujie
* @Date:   2016-08-25 16:21:19
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-12-28 10:59:14
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/model/page.js
* @File Name: page.js
* @Descript:
*/

import {sequelize,Sequelize} from './sequelize';
/**
*   页面表
*/
const Page = sequelize.define('Page',
                              {
                                  id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
                                  name:{type : Sequelize.STRING, allowNull : false},
                                  app_id:{type : Sequelize.INTEGER,allowNull:false},
                                  thumbnail: {type: Sequelize.STRING, allowNull: true},
                                  option: {type: Sequelize.STRING, allowNull: true},
                                  create_time: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
                                  delete_flag: {type: Sequelize.INTEGER, defaultValue: 1}
                              },
                              {
                                  'freezeTableName': true,
                                  'tableName': 't_pages',
                                  'timestamps': false,
                                  'paranoid': false,
                                  'createdAt': 'created_at',
                                  'updatedAt': 'updated_at',
                                  'deletedAt': 'deleted_at'
                              }
                             );
export default Page;