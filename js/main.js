// создаем объект
var app = app || {};

//выполняем код после полной загрузки js-файлов
$(function () {
    app.router = new Router(); // Создаём экземпляр роутера
    $('#search').on('click',function(){ // Оживляем нашу кнопку поиска
        var query = $('#query').val(); // Получаем значение запроса
        var category = $('#category').val(); // Получаем название категории
        app.router.navigate("first/"+query+"/"+category, {trigger: true}); // Вручную осуществляем переход в роутере
        return false; // Что бы не сработал сам клик
    });
});