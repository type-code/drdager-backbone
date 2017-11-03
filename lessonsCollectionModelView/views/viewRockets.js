var RocketsView = Backbone.View.extend({

    events: {
        "click .addObject": "addObject", // Привязываем события
        "click .toJSON": "toJSON",
        "click [data-sort]": "renderList"
    },

    initialize: function() {
        this.template = _.template($('#viewRockets').html()); // Берем наш шаблон виджета
        this.$el.html(this.template()); // Записываем элемент в DOM
        this.coll = new RocketsCollection(); // Создаём коллекцию
        // Подписываемся на события
        this.listenTo(this.coll, "all", this.render); // При любом изменении коллекции - вызывать render для перерисовки
        this.listenTo(this.coll, "add", this.addOne); // При добавлении модели - вызывать функцию addOne
    },

    render: function() { // Используем функцию render, что бы при любом изменении переписать общий размел и кол-во эл.
        var size = 0;
        this.coll.each(function(obj,index){ // Проходимся по коллекции и суммируем элементы
            size += obj.get('size');
        });
        this.$('.rockets-count').text(this.coll.length); // Перезаписываем кол-во элементов, вызвав свойство length
        this.$('.rockets-size').text(size); // Перезаписываем общий размер, посчитаный выше.
    },

    addObject: function() { // Вызывается при клике на кнопку
        this.coll.add({}); // Запихивает пустую модель в коллекцию, с дефолтными значениями
    },

    addOne: function(model) { // Вызывается при добавлении модели в коллекции
        var view = new RocketView({model: model}); // Создает новый экземпляр ракеты
        this.$('.rocketsList').append(view.render()); // Подвешиваем нашу новую вьюшку на древо
    },

    renderList: function (evt) { // Функция сортировки, очищаем список и добавляем значения заново.
        this.$('.rocketsList').html(''); // Удаляем все ракеты
        this.coll.sortParam = $(evt.target).attr('data-sort'); // Получаем имя колонки, по которой будем сортировать
        this.coll.sortMode = this.coll.sortMode*(-1); // Меняем тип сортировки на противоположную
        this.coll.sort(); // Выполняем саму сортировку коллекции
        var that = this; // сохраняем ссылку на нашу вью
        this.coll.each(function(model,index){ // Проходим циклом ко коллекции
            that.addOne(model); // Отрисовываем модели по очереди
        });
    },

    toJSON: function() {
        var json = this.coll.toJSON();
        this.$('.json-out').html(JSON.stringify(json));
    }

});
