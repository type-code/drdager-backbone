// создаем объект
var app = app || {};

$(function () {
    app.rocketsView = new RocketsView({ // Создаем экземпляр view
        el: '#rockets' // Указываем в каком элементе отрисовывать
    });
});
