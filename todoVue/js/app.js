(function(Vue) {
    'use strict';
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
    var app = new Vue({
        el: ".todoapp",
        data: {
            msg: "todos",
            todos,
        },
        computed: {
            // 定义计算属性 leftNum本质是函数 但使用的时候当属性
            // 计算属性依赖data中数据 加入数据一变 计算属性会重新执行 但是会缓存起来
            // 后面假如再次用到的话 直接用之前的缓存结果
            // 未完成个数显示
            leftNum: function() {
                return todos.filter(item => !item.completed).length
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
                    var id = this.todos[this.todos.length - 1].id + 1;
                    console.log(id);
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
        }
    })

})(Vue);