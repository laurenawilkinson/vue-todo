Vue.component('todo-item', {
    props: ['todo'],
    template:
        `<div class="todo-item">
            <p>{{ todo.todo }}</p><button @click="$emit('remove-todo')">Remove</button>
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
        removeTodo: function(index){
            this.todoList.splice(index, 1);
        },
        filteredTodos: function(type){
            return this.todoList.filter((todo)=>{
                if(todo.type === type){
                    return todo.type.match(type);
                }
            })
        }
    }
})

