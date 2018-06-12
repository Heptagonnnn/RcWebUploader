import {MEDIATOR_SEPARATOR} from "./constant";


/** findHandlers
 * @description 根据条件找出目标事件
 * @param src: Array 查询源
 * @param name: String 匹配的事件名
 * @param cb: Function 匹配callback
 * @param ctx: Object 匹配context
 * @return Array
 * todo 1源码处有一个 ._cb作用暂时不明?可能是用与findHandlers有cb参数，切是通过once注册的事件的校验？？？
 */
function findHandlers(src, name, cb, ctx) {
    return src.filter((handler) => {
        return handler &&
            (!name || handler.name === name) &&
            (!cb || handler.cb === cb) &&
            (!ctx || handler.ctx === ctx);

    })
}

/** eachEvent
 * @description 对events数组遍历执行iterator,参数为events数组的每个元素，和统一回调cb
 * @param events: Array 事件数组
 * @param cb: Function 统一回调
 * @param iterator: Function
 * finishedTodo iterator的具体作用 --- 以key和cb作为参数，批量执行那个iterator
 */
function eachEvent(events, cb, iterator) {
    events.split(MEDIATOR_SEPARATOR).forEach((key) => {
        iterator(key, cb);
    })
}

/** triggerHandlers
 * @description
 * @param events 需要执行的事件数组
 * @param args 统一参数
 */
function triggerHandlers(events, args) {
    let stopped = false,
        i = -1,
        len = events.length,
        handler;


    // finishedTodo 提前将events.length给len是为了避免while中重复读取events.length浪费性能？---是的
    while (++i < len) {
        handler = events[i];
        if (handler.cb.apply(handler.ctx2, args) === false) {
            stopped = true;
            break;
        }
    }

    return !stopped;
}

/*
源码中，将ctx参数同时赋值给ctx和ctx2，若ctx为undefined，则给ctx2，赋值this？
 */
class Handler {
    constructor(name, cb, ctx, id) {
        this.name = name;
        this.cb = cb;
        this.ctx = ctx;
        this.id = id;
    }
}


/** Mediator
 * @description
 *  事件队列机制
 *  每个Uploader都有一个mediator单例
 * finishedTodo 1-使用装饰器机制实现此功能---finish
 * @createDate 2018/6/12
 * @author heptagonnnn
 */
export default function Mediator(target) {
    const proto = target.prototype;

    proto.on = function (name, cb, ctx) {
        let set = this._events || (this._events = []);

        if (!cb) {
            return this;
        }
        eachEvent(name, cb, (name, cb) => {

            const tmp = new Handler(name, cb, ctx, set.length);
            !tmp.ctx && (tmp.ctx2 = this);
            set.push(tmp);

        });

        return this;
    };

    proto.once = function (name, cb, ctx) {
        if (!cb) {
            return this;
        }

        eachEvent(name, cb, (name, cb) => {
            let once = () => {
                this.off(name, once);
                return cb.apply(ctx || this, arguments);
            };

            //todo once._cb = cb; 用于校验？？
            this.on(name, once, ctx);

        })
    };


    proto.off = function (name, cb, ctx) {
        let events = this._events;
        if (!events) {
            return this;
        }

        if (!name && !cb && !ctx) {
            this._events = [];
            return this
        }

        eachEvent(name, cb, function (name, cb) {
            findHandlers(events, name, cb, ctx).forEach(function (item) {
                delete events[item.id];
            })
        });
    };


    proto.trigger = function (type) {
        let args, events, allEvents;

        if (!this._events || !type) {
            return this;
        }

        args = [...arguments].slice(1);
        events = findHandlers(this._events, type);
        allEvents = findHandlers(this._events, 'all');

        return triggerHandlers(events, args) &&
            triggerHandlers(allEvents, arguments);
    };
}




