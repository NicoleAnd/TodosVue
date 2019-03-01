(function(Vue) {
    'use strict';

    new Vue({
        el: ".todoapp",
        data: {
            msg: "todos",
            todos: [{
                    id: 1,
                    title: "预习",
                    completed: false //完成
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
            ]
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

            }
        }
    })

})(Vue);