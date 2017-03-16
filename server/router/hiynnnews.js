/*
* @Author: haiwang
* @Date:   2017-03-15 13:15:09
* @Last Modified by:   haiwang
* @Last Modified time: 2017-03-16 13:23:35
*/

'use strict';

import router from 'koa-router';
import controller from '../api/news.controller';


class HiynnNewsRouter{
    static routes(app){
        let api = router({
            prefix: '/hiynn'
        });
        api.get('/getInitialNews',controller.getInitialNews);
        app.use(api.routes());
    }
}
export default HiynnNewsRouter;