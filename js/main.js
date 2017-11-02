$(function() {
    var MyModel = Backbone.Model.extend({ // Создаём прототип(класс) модели
        defaults: {
            size:10
        }
    });

    var MyCollection = Backbone.Collection.extend({ // Создаём прототип(класс) коллекции
        model:MyModel
    });

    var coll = new MyCollection(); // Создаем экземпляр коллекции (можно уже при создании передать объект)

    var car = new MyModel({
        size:75
    });
    // Добавление моделей
    coll.add(car); // Добавляем нашу модель в коллекцию
    coll.add({}); // Если передадим пустой объект - будет использоваться модель по умолчанию
    coll.add([ {size:80}, {color:'white'}, {} ]) //  Мы можем передавать массив с объектами
    // Удаление моделей
    coll.remove(car);
    // Вывод коллекции
    coll.toJSON();
});