/*
* @Author: huanghongqiang
* @Date:   2016-07-14 13:36:19
* @Last Modified by:   FunctionRun
* @Last Modified time: 2017-01-07 15:30:40
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/router/app.router.js
* @File Name: app.router.js
* @Descript: app路由
*/

import router from 'koa-router';
import controller from '../api/app.controller';
import auth from '../auth/auth';

class AppRouter{
    static routes(app){

        let api = router();
        api.get('/apps',auth.isAuthenticated(),controller.getApps);
        api.post('/apps',auth.isAuthenticated(),controller.addApp);
        api.post('/apps/copy/:from_app_id', auth.isAuthenticated(), controller.copyData);
        api.post('/apps/:app_id/copy_pages/:to_page_id', auth.isAuthenticated(), controller.copyPages);
        
        api.get('/apps/:id',auth.isAuthenticated(),controller.getAppPages);
        api.put('/apps/:id',auth.isAuthenticated(),controller.updateApp);
        api.put('/apps/:id/pages', auth.isAuthenticated(), controller.updateAppPages);
        api.delete('/apps/:id',auth.isAuthenticated(),controller.delApp);

        api.post('/apps/:app_id/library', auth.isAuthenticated(), controller.addLibrary);
        api.get('/apps/:app_id/library', auth.isAuthenticated(), controller.getLibrary);

        api.post('/apps/:app_id/thumbnail', auth.isAuthenticated(), controller.addThumbnail);
        app.use(api.routes());
    
    }
}

export default AppRouter;