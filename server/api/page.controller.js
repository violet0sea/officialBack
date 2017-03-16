/*
* @Author: zhangyujie
* @Date:   2016-08-25 16:14:58
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-05 18:55:21
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/api/page.controller.js
* @File Name: page.controller.js
* @Descript:
*/

'use strict';
import Auth from '../auth/auth';
import ResponseFactory from '../util/response';
import SqlUtils from '../util/sql';
import {Page, Widget} from '../model';
import {sequelize,Sequelize} from '../model/sequelize';
import Format from '../util/format';
import {UnauthorizedError,InvalidParametersException} from '../error';
import Validation from '../util/validation';

class PageController {
    static *getData() {

        let result = {};
        const page_id = this.params.page_id;
        
        //@TODO 首先验证auth_id ,app_id, 有没有访问page_id 数据库对应page_name字段的权限
        const sql = SqlUtils.getWidgets(page_id);
        const sql_result = yield sequelize.query(sql,{'type':Sequelize.QueryTypes.SELECT,'nest':true});
        const sql_option = SqlUtils.getOption(page_id);
        const sql_option_result = yield sequelize.query(sql_option,{'type':Sequelize.QueryTypes.SELECT,'nest':true});

        //Array => Object
        sql_result.forEach((d) => {

            result[d.name] = d;
        
        });
        // result = Format.json2app(result);
        this.state = 200 ;
        this.body = ResponseFactory.makeResponse({
            data: result,
            option:  JSON.parse(sql_option_result[0].option || '{}')
        });
    
    }

    static *setData() {

        const name = this.params.page_id;
        const appId = this.params.app_id;
        const {option} = this.request.body;
        const page = yield Page.create({
            name: name,
            app_id: appId,
            thumbnail: '',
            option: JSON.stringify(option)
        });

        const id = page.get({'plain': true}).id;
        this.state = 200;
        this.body = ResponseFactory.makeResponse({
            id: id
        });
    
    }

    static *copyData() {

        const name = this.params.from_page_id;
        const newPageName = this.params.to_page_id;

        const sql = SqlUtils.copyPages(name, newPageName);
        yield sequelize.query(sql,{'type': Sequelize.QueryTypes.INSERT,'nest':true});

        //复制t_widgets 数据
        const sql_widgets = SqlUtils.copyWidgets(name, newPageName);
        yield sequelize.query(sql_widgets,{'type': Sequelize.QueryTypes.INSERT,'nest':true});

        this.state = 200;
        this.body = ResponseFactory.makeResponse({
            id: name
        });


    }
    static *updateData() {

        const page_name = this.params.page_id;
        const {name, option } = this.request.body;
        const page = {};

        name && (page.name = name);
        option && (page.option = option);

        yield Page.update(page, {
            'where': {'name': [page_name]}
        });
        this.state = 200;
        this.body = ResponseFactory.makeResponse(null);

    }

    static *deleteData() {

        const pageId = this.params.page_id;
        const appId = this.params.app_id;

        yield Page.update({
            'delete_flag': 0
        }, {
            'where': {
                'name': pageId,
                'app_id': appId
            }
        });

        this.state = 200;
        this.body = ResponseFactory.makeResponse(null);
    
    }
}
export default PageController;
