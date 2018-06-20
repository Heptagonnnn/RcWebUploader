export class Commander {
    /*
    插件可能由4部分组成
    View， Queue， File，Request

    每个部分有不同的事件组成
    但一定包括事件
    init
    destroy
    想要让组件的事件能被触发，需要在组件内register，然后在别的组件通过trigger触发
     */
    constructor() {
        this.modulePool = {
            View: {},
            Queue: {},
            File: {},
            Request: {}
        };
    }


    inject = (moduleName, module) => {
        module.prototype.register = this.register(moduleName);
        module.prototype.trigger = this.trigger();
    };

    register = (moduleName) => {
        return (eventName, cb) => {
            this.modulePool[moduleName][eventName] = cb;
        }
    };

    trigger = () => {
        return (modulePath, ...args) => {
            const pathArray = modulePath.split('.');
            let srcFunction = this.modulePool;
            pathArray.forEach((v) => {
                srcFunction = srcFunction[v];
            });
            return srcFunction.apply(this, args);
        }
    };
}