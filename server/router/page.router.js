/*
* @Author: zhangyujie
* @Date:   2016-08-25 17:02:29
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-05 18:53:22
* @Email: zhangyujie3344521@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/router/page.router.js
* @File Name: page.router.js
* @Descript:
*/

'use strict';
import router from 'koa-router';
import controller from '../api/page.controller';
import auth from '../auth/auth';

class AppRouter{
    static routes(app){

        let api = router();
        api.post('/apps/:app_id/pages/:page_id', auth.isAuthenticated(), controller.setData);
        api.get('/apps/:app_id/pages/:page_id',auth.isAuthenticated(),controller.getData);
        api.delete('/apps/:app_id/pages/:page_id', auth.isAuthenticated(), controller.deleteData);
        api.put('/apps/:app_id/pages/:page_id', auth.isAuthenticated(), controller.updateData);
        api.post('/apps/:app_id/pages/:from_page_id/copyto/:to_page_id', auth.isAuthenticated(), controller.copyData);
        app.use(api.routes());
    
    }
}
export default AppRouter;