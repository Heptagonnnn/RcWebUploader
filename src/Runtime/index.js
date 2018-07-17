/**class Runtime
 * @description
 * 作为组件运行的底层环境，主要职责有
 * 1. namespace，负责创建组件池，使用mountModule方法进行组件挂载
 * 2. setModuleMethod，对uploader暴露接口，使用户可以重新定义hook
 * 3. 装饰器最用，使注册的对象都具有trigger功能，可以触发指定路径的函数
 *
 *
 * todo
 * 1. options设置
 * 2. 组件注册路径方式
 *
 */
export default class Runtime {


  constructor() {
    /* 组件池 */
    this.model = {};
    this.model['Runtime'] = this;
  }


  /**function mountModule
   * @description 挂载功能模块
   * @param module 被挂载模块
   * @param name 手动指定模块名，若无则从constructor中获取
   *
   * todo 路径化解析
   */
  mountModule(module, name) {
    const moduleName = name ? name : module.constructor.name;
    this.model[moduleName] = module;


    module.trigger = this.trigger;

  }


  /**function  setModuleMethod
   * @description
   * @param moduleName 被重写的组件名
   * @param methodName 被重写方法名
   * @param method 重写方法
   *
   * todo 路径化解析
   */
  setModuleMethod(moduleName, methodName, method) {
    this.model[moduleName][methodName] = method;
  }


  /**function trigger
   * @description 触发指定路径的方法
   *
   * @param name 被触发组件名
   * @param method 被触发方法名
   * @param args 参数
   * todo 路径化解析
   */
  trigger = (name, method, args) => {
    return this.model[name][method](args);
  };


  /**function catchGlobalError
   * @description
   *
   */
  catchGlobalError(err) {
    console.log(err);
  }

}