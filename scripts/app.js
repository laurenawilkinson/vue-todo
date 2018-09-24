Vue.component('todo-item', {
    props: ['todo'],
    template:
        `<div class="todo-item">
            <p>{{ todo.todo }}</p><button @click="$emit('remove-todo', todo)">Remove</button>
        </div>`
});

Vue.component('list-group', {
    props: ['type', 'todo-list'],
    template:
        `<div class="list">
            <h2>{{ type }}</h2>
            <slot :group="type"></slot>
        </div>`
})

let app = new Vue({
    el: '#app',
    data: {
        todoItem: { todo: '', type: 'Ungrouped' },
        todoTypes: ['Shopping', 'Work', 'Dailies', 'Ungrouped'],
        todoList: [],
        output: 'nothing'
    },
    methods: {
        addTodo: function(){
            if (this.todoItem.todo !== ''){
                this.todoList.push(this.todoItem);
                this.output = this.todoList;
                this.todoItem = { todo: '', type: this.todoItem.type };
            }
        },
        removeTodo: function(todo){
            this.todoList.splice(this.todoList.indexOf(todo), 1);
        },
        filteredTodos: function(type){
            return this.todoList.filter((todo)=>{
                if(todo.type === type){
                    return todo.type.match(type);
                }
            })
        }
    },
    watch: {
        todoList: {
            handler() {
                localStorage.setItem('todoList', JSON.stringify(this.todoList));
            },
            deep: true,
        },
    },
    mounted() {
        if (localStorage.getItem('todoList')) this.todoList = JSON.parse(localStorage.getItem('todoList'));
    }
})

