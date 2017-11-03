
//создаем прототип нашей модели
var RocketModel = Backbone.Model.extend({
    defaults: { // задаем дефолтные параметры
        name: 'name',
        description: 'desc',
        size: 100
    },

    initialize: function() {},

    validate: function (attrs) { // Создаем валидатор, для проверки актуальности данных
        if (!((attrs.size) > 0)) { // проверям размер
            console.log('Incorrect size');
            return 'Incorrect size';
        }
    }
});

//создаем прототип нашей коллекции
var RocketsCollection = Backbone.Collection.extend({
    model: RocketModel, // Указываем модель по умолчанию
    // Создаём свои свойства для сортитовки
    sortParam: 'size', // Указываем по какому параметру будем проводить сортировку
    sortMode: 1, // Указываем тип сортировки(по возрастанию или убыванию)
    comparator: function(a,b) { // Компоратор предназначен для поддержки коллекции в отсортированном виде
        // Должен возвращать
        // -1, если первая модель должна идти перед второй;
        //  0, если у них одинаковая позиция;
        //  1, если первая модель должна идти после второй.
        if (a.get(this.sortParam) > b.get(this.sortParam)) // Смотрим
            return -1 * this.sortMode;
        if (a.get(this.sortParam) < b.get(this.sortParam))
            return this.sortMode;
        return 0; // если одинаковы
    }
});
