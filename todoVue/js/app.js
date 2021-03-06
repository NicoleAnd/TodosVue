;
(function(Vue) {
    // 注册一个全局自定义指令 `v-focus`
    // 什么时候使用自定义指令：需要进行底层DOM操作的时候
    // 定义指令的时候 不要加v-前缀
    Vue.directive('focus', {
        // 当被绑定的元素插入到DOM中时....
        inserted: function(el) {
            // 聚焦元素
            console.log(el);
            el.focus()
        }
    });
    Vue.directive('auto-active', {
        // 当被绑定的元素插入到DOM中时....
        inserted: function(el) {
            // 聚焦元素
            console.log(el);
            var links = el.getElementsByTagName("a");
            links = Array.from(links);
            links.forEach(function(link) {
                link.onclick = function() {
                    console.log(this);
                    links.forEach(function(link) {
                        link.className = "";
                    });
                    this.className = "selected";
                }
            });

        }
    });
    const todos = [{
            id: 1,
            title: "预习",
            completed: false //未完成
        },
        {
            id: 2,
            title: "游戏",
            completed: false
        },
        {
            id: 3,
            title: "睡觉",
            completed: true
        }
    ];
    var app = window.app = new Vue({
        el: ".todoapp",
        data: {
            msg: "todos",
            toggleStat: true,
            currentItem: null,
            filterStat: "all",
            todos,
        },
        computed: {
            toggleAllStat: function() {
                return this.todos.every(item => item.completed);
            },
            // 定义计算属性 leftNum本质是函数 但使用的时候当属性
            // 计算属性依赖data中数据 加入数据一变 计算属性会重新执行 但是会缓存起来
            // 后面假如再次用到的话 直接用之前的缓存结果
            // 未完成个数显示
            leftNum: function() {
                return todos.filter(item => !item.completed).length
            },
            // 数据过滤
            filterTodos: function() {
                if (this.filterStat == "all") {
                    return this.todos;
                } else if (this.filterStat == "active") {
                    return this.todos.filter(item => !item.completed);
                } else {
                    return this.todos.filter(item => item.completed);
                }
            }
        },
        methods: {
            addTodo(event) {
                // 4 回车添加数据
                if (event.keyCode == 13) {
                    // 1 获取用户输入的任务
                    // console.log(event);
                    var title = event.target.value;
                    if (title == "") {
                        return;
                    }
                    // 2 把用户的任务添加到todos数组中
                    var lastTodo = this.todos[this.todos.length - 1];
                    var id = lastTodo ? lastTodo.id + 1 : 1;
                    this.todos.push({
                        id,
                        title,
                        completed: false
                    });
                    // 3 清空输入框
                    event.target.value = "";
                }
            },

            // 切换所有完成/未完成
            toggleAll(event) {
                // 1 获取单击的复选框的状态
                // console.log(event.target.checked);
                var completed = event.target.checked;
                console.log(completed);
                // 2 让所有的任务的完成状态设置为复选框的状态
                // this.todos.forEach((item) => {
                //     item.completed = completed;
                // })
                this.todos.forEach(item => item.completed = completed);
            },

            // 删除单个任务
            removeTodo(index, $event) {
                // console.log(index);
                // console.log($event);
                this.todos.splice(index, 1);
            },

            // 删除所有的已完成的任务
            removeCompleted() {
                // console.log(123);
                // 想办法把todos中完成的任务删除
                // for (let i = 0; i < app.todos.length; i++) {
                //     if (app.todos[i].completed) {
                //         app.todos.splice(i, 1);
                //         i--;
                //     }
                // }
                // 另一种方法
                // app.todos = app.todos.filter(function(item) {
                //     return !item.completed;
                // })
                app.todos = app.todos.filter((item) => !item.completed);
            },

            // 未完成个数显示
            // 采用的普通方法 返回结果作用于模板 一旦视图发生改变 则该方法会被重新调用 只要绑定该方法的地方 都会执行
            // leftNum() {
            //     return todos.filter(item => !item.completed).length
            // },

            // 保存编辑 按回车或失去焦点
            saveEdit(item, index, event) {
                // 1 拿到文本框的值
                console.log(event.target.value);
                var editText = event.target.value.trim();
                // 2 对文本框进行非空校验
                if (!editText.length) {
                    // 从todos数组中删除该元素
                    return this.todos.splice(index, 1);
                }
                // 假如文本框不是空
                item.title = editText;

                // 优化
                // !editText.length?this.todos.splice(index,1):item.title = editText;
                // 3 去除editing样式
                this.currentItem = null;
            },

            // 全选联动效果
            toggle(item, event) {
                console.log(event.target.checked); //dom元素的状态
                console.log(item.completed);

                Vue.nextTick(() => {
                    // 遍历todos
                    var bool = this.todos.every(function(item) {
                        return item.completed;
                    });
                    console.log(bool);
                    this.toggleStat = bool;
                });


                // some方法 只要有一个为真 结果是真
            }

        },
        // 自定义局部指令
        directives: {
            // 指令名称 可以驼峰式命名/ 也可以为字符串 使用指令统一用v-editing-focus
            // "editing-focus": {
            editingFocus: {
                // // 钩子函数
                // // 找不到父元素
                // bind: function(el) {
                //     console.log("bind");
                //     console.log(el.parentElement);
                // },
                // // 能找到父元素
                // inserted: function(el) {
                //     console.log(el);
                //     console.log("inserted");
                // },
                update: function(el, binding) {
                    // console.log(binding.value);
                    if (binding.value) {
                        // console.log(el);
                        el.focus();
                    }
                },
                // componentUpdated: function() {
                //     console.log("componentUpdated");
                // },
                // unbind: function() {
                //     console.log("unbind");
                // }
            }
        }
    });

})(Vue);

// 点击显示all active completed
window.onhashchange = function() {
        var hash = window.location.hash.substring(2) || "all";
        console.log(hash);
        app.filterStat = hash;
    }
    // 刷新重新默认 已点击的active 或 completed
window.onhashchange();