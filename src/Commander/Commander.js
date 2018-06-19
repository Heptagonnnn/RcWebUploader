export class Commander {
    /*
    插件可能由4部分组成
    View， Queue， File，Request

    每个部分有不同的事件组成
    但一定包括事件
    init
    destroy
    想要让组件的事件能被触发，需要在组件内request，然后在别的组件通过trigger触发
     */
    constructor() {
        this.modulePool = {
            View: {},
            Queue: {},
            File: {},
            Request: {}
        };
    }


    addView(viewName, module) {
        this.modulePool.View[viewName] = module;
    }

    setView(viewName, module) {
        this.modulePool.View = {
            [viewName]: module
        };
    }

    deleteView(viewName) {
        delete this.modulePool.View[viewName];
    }

    setModule(moduleName, module) {
        if (moduleName === 'View') {

        } else {
            module.register = this.register(moduleName);
            module.trigger = this.trigger();
        }
    }

    deleteModule(moduleName) {
        this.modulePool[moduleName] = {};
    }

    register = (moduleName) => {
        return (eventName, cb) => {
            this.modulePool[moduleName][eventName] = cb;
        }
    };

    trigger = () => {
        return function(modulePath, ...args) {
            const pathArray = modulePath.split('.');
            let srcFunction = this;
            pathArray.forEach((v) => {
                srcFunction = srcFunction[v];
            });
            srcFunction.apply(this, args);
        }
    };
}