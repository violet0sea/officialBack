/*
* @Author: zhangyujie
* @Date:   2016-08-29 13:53:30
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-09-21 21:19:05
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/router/widget.router.js
* @File Name: widget.router.js
* @Descript:
*/

'use strict';
import router from 'koa-router';
import controller from '../api/widget.controller';
import auth from '../auth/auth';

class WidgetRouter{
    static routes(app){
        let api = router();
        api.get('/widgets/:widget_id', auth.isAuthenticated(), controller.getData);
        api.post('/widgets/:widget_id', auth.isAuthenticated(), controller.setData);
        api.put('/widgets/:widget_id',auth.isAuthenticated(),controller.updateData);
        api.delete('/widgets/:widget_id', auth.isAuthenticated(), controller.deleteData);
        app.use(api.routes());
    }
}
export default WidgetRouter;