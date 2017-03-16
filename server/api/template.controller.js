/*
* @Author: FunctionRun
* @Date:   2016-12-28 11:18:03
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-06 12:57:17
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/api/template.controller.js
* @File Name: template.controller.js
* @Descript:
*/

'use strict';
import ResponseFactory from '../util/response';
import {Template} from '../model';

class TemplateController {
    static *setData() {

        const {appId, userId, name, type, mainType, subType, 
            layout, dataSource, option, events, style} = this.request.body;

        const template = {
            name: name,
            app_id: appId,
            user_id: userId,
            type: type,
            main_type: mainType,
            sub_type: subType,
            layout: layout,
            data_source: dataSource,
            option: option,
            events: events,
            style: style,
            delete_flag: 1
        };

        let added = yield Template.create(template);
        const id = added.get({'plain': true}).id;
        
        this.state = 200;
        this.body = ResponseFactory.makeResponse({
            templateId: id
        });

    }

    static *getData() {

        const template_id = this.params.template_id;
        const template = yield Template.findAll({
            where: {
                id: template_id
            }
        });

        this.state = 200;
        let templates = [];

        template.forEach((t) => {

            templates.push(t.dataValues);

        });
        this.body = ResponseFactory.makeResponse(templates);

    }
    /**
     * 获取缩略图的
     */
    static *getDataset() {

        const app_id = this.params.app_id;
        const templateInstances = yield Template.findAll({
            where: {
                app_id: app_id,
                delete_flag: 1
            }
        });

        let templates = [];

        templateInstances.forEach((templateInstance) => {

            let template = templateInstance.get({'plain': true});

            templates.push({
                id: template.id,
                name: template.name
            });
        
        });

        this.state = 200;
        this.body = ResponseFactory.makeResponse(templates);
    
    }

    static *updateData() {

        const template_id = this.params.template_id;
        const {name} = this.request.body;
        yield Template.update({
            name: name
        }, {
            where: {
                id: [template_id]
            }
        });

        this.state = 200;
        this.body = ResponseFactory.makeResponse(null);
    
    }

    static *deleteData() {

        const template_id = this.params.template_id;
        yield Template.update({
            delete_flag: 0
        }, {
            where: {
                id: [template_id]
            }
        });

        this.state = 200;
        this.body = ResponseFactory.makeResponse(null);
    
    }
}

export default TemplateController;