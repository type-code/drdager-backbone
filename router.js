var Router = Backbone.Router.extend({

    routes: {
        "":                      "first", // Список роутингов и вызываемых функций при переходе
        "first":                 "first",
        "first/:query":          "first",
        "first/:query/:category":"first",
        "second":                "second",
        "third":                 "third"
    },

    initialize: function() {
        Backbone.history.start(); // Задаем начальное состояние
    },

    first: function(query,category) { // Описываем функцию
        console.log(query,category);
        $('.hero-unit').hide(); // Скрываем все отображения
        $('#page-first').show(); // Показываем текущее
        if (query) { // Если нам передали параметр
            $('#page-first').find('.query').text(query); // Находим его и вставляем данные с роутера
        }
        if (category) { // Если нам передали второй параметр
            $('#page-first').find('.category').text(category); // Находим его и вставляем данные с роутера
        }
    },

    second: function() {
        $('.hero-unit').hide();
        $('#page-second').show();
    },

    third: function() {
        $('.hero-unit').hide();
        $('#page-third').show();
    }

});