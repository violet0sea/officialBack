/*
* @Author: huanghongqiang
* @Date:   2016-07-14 17:41:42
* @Last Modified by:   FunctionRun
* @Last Modified time: 2016-09-21 21:19:00
* @Email: st8817@163.com
* @File Path: /Users/zhangyujie/node/www/tueasy5.0/tueasy-api/server/router/user.router.js
* @File Name: user.router.js
* @Descript: 用户接口
*/

import router from 'koa-router';
import controller from '../api/user.controller';
import auth from '../auth/auth';

class UserRouter{
    static routes(app){
        let api = router();
        api.post('/users/token',controller.login);
        api.get('/users',auth.isAuthenticated(),controller.getAllUsers);
        app.use(api.routes());
    }
}
export default UserRouter;