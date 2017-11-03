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
        $('.hero-unit').hide();
        $('#page-first').show();
        if (query) {
            $('#page-first').find('.query').text(query);
        }
        if (category) {
            $('#page-first').find('.category').text(category);
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