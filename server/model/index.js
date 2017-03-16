import User from './user';
import Role from './role';
import UserRole from './user.role';
import App from './app';
import AppManager from './app.manager';
import AppDeveloper from './app.developer';
import Page from './page';
import Widget from './widget';
import Template from './template';
//清空、同步数据库


//关系绑定
// User.belongsToMany(Role, {'through': UserRole});
// Role.belongsToMany(User, {'through': UserRole});



// App.belongsToMany(User,{'through': AppManager});
// User.belongsToMany(App, {'through': AppManager});

// App.belongsToMany(User,{'through': AppDeveloper})
// User.belongsToMany(App, {'through': AppDeveloper});


//同步数据库

//单表
// User.sync({force: false});
// Role.sync({force: false});
// App.sync({force: false});
// Page.sync({force: false});
// Widget.sync({force: false});
// Template.sync({force: false});
// //关系表
// UserRole.sync({force: false});
// AppManager.sync({force: false});
// AppDeveloper.sync({force: false});



export  {
	User,
	Role,
	UserRole,
	App,
	AppManager,
	AppDeveloper,
    Page,
    Widget,
    Template
};