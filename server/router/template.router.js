/*
* @Author: FunctionRun
* @Date:   2016-12-28 11:55:35
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-03 15:59:38
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/router/template.router.js
* @File Name: template.router.js
* @Descript:
*/

'use strict';
import router from 'koa-router';
import controller from '../api/template.controller';
import auth from '../auth/auth';

class TemplateRouter {
    static routes(app) {

        let api = router();
        api.get('/apps/:app_id/templates', auth.isAuthenticated(), controller.getDataset);
        api.post('/templates', auth.isAuthenticated(), controller.setData);
        api.get('/templates/:template_id', auth.isAuthenticated(), controller.getData);
        api.put('/templates/:template_id', auth.isAuthenticated(), controller.updateData);
        api.delete('/templates/:template_id', auth.isAuthenticated(), controller.deleteData);
        app.use(api.routes());
    
    }
}
export default TemplateRouter;