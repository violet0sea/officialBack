/*
* @Author: zhangyujie
* @Date:   2016-08-29 13:54:11
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-12-28 14:43:24
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/api/widget.controller.js
* @File Name: widget.controller.js
* @Descript:
*/

'use strict';
import Auth from '../auth/auth';
import ResponseFactory from '../util/response';
import SqlUtils from '../util/sql';
import {Widget} from '../model';
import {sequelize,Sequelize} from '../model/sequelize';
import Format from '../util/format';
import {UnauthorizedError,InvalidParametersException} from '../error';
import Validation from '../util/validation';

class WidgetController {
    static *setData() {
        
        const {type, mainType, subType, layout, name,
            dataSource, option, events, style, pageId
        } = this.request.body;

        const widget = {
            type: type,
            main_type: mainType,
            sub_type: subType,
            layout: layout,
            data_source: dataSource,
            option: option,
            events: events,
            style: style,
            page_name: pageId,
            name: name
        };

        let added = yield Widget.create(widget);
        const id = added.get({'plain': true}).id;

        this.state = 200;
        this.body = ResponseFactory.makeResponse({
            widgetId: id
        });
    
    }

    static *updateData() {

        const widget_id = this.params.widget_id;
        const newData = this.request.body;
        // console.log('widget_id', widget_id)
        let widgetData = {};
        const constants = ['type', 'layout', 'option', 'events', 'style', 'name'];
        constants.forEach((d, index) => {

            newData[d] && (widgetData[d] = newData[d]);
        
        });
        newData['mainType'] && (widgetData['main_type'] = newData['mainType']);
        newData['subType'] && (widgetData['sub_type'] = newData['subType']);
        newData['dataSource'] && (widgetData['data_source'] = newData['dataSource']);
        newData['pageId'] && (widgetData['page_name'] = newData['pageId']);

        // console.log('widgetData', widgetData)
        yield Widget.update(widgetData, {
            'where': {'name': [widget_id]}
        });
        this.state = 200;
        this.body = ResponseFactory.makeResponse(null);

    }

    static *deleteData() {

        const widgetId = this.params.widget_id;
        yield Widget.update({
            'delete_flag': 0
        }, {
            'where': {'name': [widgetId]}
        });

        this.state = 200;
        this.body = ResponseFactory.makeResponse(null);
    
    }

    static *getData() {

        const widget_id = this.params.widget_id;
        const widget = yield  Widget.findOne({
            where: {
                name: widget_id
            }
        });
        // console.log('获取的数据是： ', widget.dataValues)
        this.state = 200;
        this.body = ResponseFactory.makeResponse(widget.dataValues);
    
    }
}
export default WidgetController;