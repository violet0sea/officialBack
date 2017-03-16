/*
* @Author: zhangyujie
* @Date:   2016-08-25 16:55:04
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-05 18:59:56
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/model/widget.js
* @File Name: widget.js
* @Descript:
*/

'use strict';
import {sequelize,Sequelize} from './sequelize';
/**
*   元素表(控件、图表)
*/
const Widget = sequelize.define('Widget',
                                {
                                    id : {type : Sequelize.INTEGER, autoIncrement : true, primaryKey : true, unique : true},
                                    name:{type : Sequelize.STRING, allowNull : false},
                                    page_name: {type : Sequelize.STRING, allowNull : false},
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
                                    'tableName': 't_widgets',
                                    'timestamps': false,
                                    'paranoid': false,
                                    'createdAt': 'created_at',
                                    'updatedAt': 'updated_at',
                                    'deletedAt': 'deleted_at'
                                }
                             )
export default Widget;