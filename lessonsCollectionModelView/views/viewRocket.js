var RocketView = Backbone.View.extend({

    tagName: 'tr',

    events: { // Навешиваем наши события
        'click .changeSize': 'changeSize', // При клике на одну из кнопок размера
        'click .deleteRow':  'deleteRow', // Удаление
        'blur .desc, .name, .size': 'editValue' // При смене фокуса
    },

    initialize: function () { // Инициализация
        this.template = _.template($('#viewRocket').html()); // Подгружаем шаблон из скрипта
        // Подписываемся на событие модели
        this.listenTo(this.model,'change', this.render); // При изменении выбранной модели - вызывать Render
        this.listenTo(this.model,'destroy', this.remove); // При удалениии модели вызовет remove,
        // который удалит привязанные события и удалит объект из DOM
    },

    render: function () {
        var view = this.template(this.model.toJSON()); // переводим нашу модель в JSON, рендерим
        this.$el.html(view); // вставляем в нашу таблицу
        return this.$el; // возвращаем
    },

    deleteRow: function() {
        this.model.destroy(); // Модель удалится, сработает event - destroy
    },

    editValue: function () { // Функция для обновления значений модели
        var res = this.model.set({
            name: this.$('.name').text(), // Обращаеимя напрямую к элементу
            description: this.$('.desc').text(),
            size: parseInt(this.$('input.size').val())
        },{validate: true});
        if (!res)  // Смотрим, успешна ли валидация, если успешна - перерисовываем.
            this.render();
    },

    changeSize: function(event) {
        var diff = parseInt($(event.target).data('rel'));
        var size = this.model.get('size');
        var res = this.model.set({ // Устанавливаем новые значения
            size: size + diff
        },{validate: true});
        console.log(res);
        if (!res) // Смотрим, успешна ли валидация, если успешна - перерисовываем.
            this.render();
    }
});
