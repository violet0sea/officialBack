/*
* @Author: FunctionRun
* @Date:   2016-12-28 10:52:47
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-05 18:59:56
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/model/template.js
* @File Name: template.js
* @Descript: 负责控件模版(模版仅仅是一个快速的控件, 由模版生成的控件可以任意修改控件)
*/

import {sequelize, Sequelize} from './sequelize';
/**
 *  模版表
 */
const Template = sequelize.define('Template', 
                                  {
                                      id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true},
                                      name: {type: Sequelize.STRING, allowNull: false},
                                      app_id: {type: Sequelize.INTEGER, allowNull: false},
                                      user_id: {type: Sequelize.INTEGER, allowNull: false},
                                      main_type: {type: Sequelize.STRING, allowNull: false},
                                      type: {type: Sequelize.STRING, allowNull: false},
                                      sub_type: {type: Sequelize.STRING, allowNull: false},
                                      layout: {type: Sequelize.STRING, allowNull: false},
                                      data_source: {type: Sequelize.TEXT('tiny'), allowNull: false},
                                      option: {type: Sequelize.TEXT('tiny'), allowNull: true},
                                      events: {type: Sequelize.TEXT('tiny'), allowNull: true},
                                      style: {type: Sequelize.STRING, allowNull: true},
                                      create_time: {type: Sequelize.DATE, defaultValue: Sequelize.NOW},
                                      delete_flag: {type: Sequelize.INTEGER, defaultValue: 1}
                                  }, 
                                  {
                                      'freezeTableName': true,
                                      'tableName': 't_templates',
                                      'timestamps': false,
                                      'paranoid': false,
                                      'createdAt': 'created_at',
                                      'updatedAt': 'updated_at',
                                      'deletedAt': 'deleted_at'
                                  }
                        );

export default Template;