<?
Урок 1. Введение.

BackboneJS - JavaScript флеймворк, основаный на паттерне MV*. Используется для больших проектов,
что бы избежать груды запутанного jQuery кода(структурировать код).

Model - содержит события и JSON данные приложения(атребуты), а также логику для работы с ними:
вычисляемые свойства, валидация, права доступа. Модель может хранится как в браузере,
так и в базе данных на сервере. Collection - упорядоченная группа моделей.

View - содержит логику отображения данных модели и коллекций. View - позволяет отделить данные
от их конкретного отображения в DOM, что позволяет отображать одни и теже даннные в разных представлениях,
и реагировать ВСЕМ предтавлениям на изменения модели.

Controller — промежуточный слой между моделью и представлением, предназначенный для обмена данными между ними.

Урок 2. Основы.

Backbone состоит из 4-х основных классов:

Model (Модель)
Collection (Коллекция)
View (Представление)
Router (Роутер)

Backbone работает в связке с Underscore, который предназначен для более простой работы с
объектами, функциями, массивами.

Урок 3. Model

3.1 Создание прототипа модели.

Создание пустого объекта:
var Book = Book || {};

Наследуемся от главной модели
Book = Backbone.Model.extend({}); // Создаем прототип (наследуемся)

Создаем экземпляр:
var oBook = new Book({ title: 'Alice in Wonderland', author: 'Lewis Caroll' });

3.2 Стандартные поля - свойства объекта, которые мы можем определить при его создании.

Пример:

Book = Backbone.Model.extend({
	default: {
		title: 'No title',
		author: 'unknown',
		releaseDate: 2011,
		description: ''
	}
});

3.2 Методы

Существуют стандартные методы, для работы с моделью:

Initialize - вызывается после создания экземпляра класса.

Пример:
var Book = Backbone.Model.extend({
	initialize: function() {
		console.log('Object book created');
	}
});

Get - считывание атребута
var BookTitle = oBook.get('title');

Set - запись атребута
oBook.set({ releaseDate: '1865'});

Save - сохранение данных модели на сервер. При создании объекта - POST, обновлении - PUT

Урок 4. СОБЫТИЯ

4.1 Создание и вызов событий.

Пример:

var object = {}; // Создаем пустой объект

	_.extend(object, Backbone.Events); // Расширяем наш объект возможностями объекта Backbone.Events при помощи Underscore 
	// Теперь унас появилась возможность слушать и вызывать события
	object.on("alert", function(msg) { // Слушаем событие с именем "alert" и вызываем функцию. (event, callback, [context])
	  alert("Сработало " + msg);
	});

	object.trigger("alert", "событие"); // Вызываем событие (event, [*args]) 

!!!Слушателей у одного события может быть много.

Можно привязать событие к кнопке. И при клике вызывать событие.
$('#btn').on('click', function() {
	object.trigger("alert", "событие по клику"); // Вызываем событие.
});

!!!Если в качестве имени события написать "all", то это событие будет возникать при вызове любого события. 
И в функцию, первым параметром, прийдёт имя вызванного события.

Данные в обработчик можно передавать через хэш:
object.on({
  "change:title": titleView.update,
  "change:author": authorPane.update,
  "destroy": bookView.remove
}); 

4.2 Удаление обработчиков.
object.off([event], [callback], [context])
Если не указан контекст   - будут удалены все версии обработчика.
Если не указан обработчик - будут удалены все обработчики для указанного события.
Если не указано событие   - будут удалены ВСЕ обработчики.

// Удаляет только обработчик `onChange`.
object.off("change", onChange);

// Удаляет все обработчики события "change".
object.off("change");

// Удаляет все обработчики `onChange` для всех событий.
object.off(null, onChange);

// Удаляет все обработчики в контексте `context` для всех событий.
object.off(null, null, context);

// Удаляет все обработчики для объекта `object`.
object.off();

4.3 Метод once - тот же on но срабатывает всего один раз.
object.once(event, callback, [context]) 

4.4 Метод - listenTo - указывает оъекту прослушивать событие другого объекта.
Преимущество этого метода над ON в том, что затем можно удалить все события сразу. 
object.listenTo(other, event, callback) 

4.4 Метод - listenToOnce - тот же listenTo, только одноразовый.
object.listenToOnce(other, event, callback) 

4.5 Метод - stopListening - Прекращает прослушивание события у объекта.
Вызов метода stopListening без аргументов удалит все зарегистрированные обработчики.
Также можно указать определённый объект, событие или обработчик.

4.6 Каталог событий - список всех встроенных событий, которые может запускать Backbone.js

"add" (model, collection, options) — когда модель добавляется в коллекцию.
"remove" (model, collection, options) — когда модель удаляется из коллекции.
"reset" (collection, options) — когда всё содержимое коллекции заменяется.
"sort" (collection, options) — когда коллекция была отсортирована.
"change" (model, options) — когда атрибут модели меняется.
"change:[attribute]" (model, value, options) — когда меняется конкретный атрибут модели.
"destroy" (model, collection, options) — когда модель уничтожена.
"request" (model, xhr, options) — когда модель (или коллекция) отправляет запрос на сервер.
"sync" (model, resp, options) — когда модель была успешно синхронизирована с сервером.
"error" (model, xhr, options) — когда вызов save провалился на сервере.
"invalid" (model, error, options) — модель не прошла валидацию на клиенте.
"route:[name]" (params) — когда один конкретный роут находит соответствие.
"route" (router, route, params) — когда любой из роутов находит соответствие.
"all" — это специальное событие срабатывает каждый раз, когда срабатывает любое событие, передавая имя события первым аргументом.

ПРИМЕР РАБОТЫ С МОДЕЛЬЮ И СОБЫТИЯМИ
app.classRocket = Backbone.Model.extend({ // Наследуемся от главной модели Backbone
	defaults: { // Устанавливаем стандартные значения
		name: "name",
		description: "-",
		size: 100
	},

	initialize: function () { // Описываем метод, вызываемый после создания экземпляра класса
	   console.log('obj created');

		this.on('change', function () { // Навешиваем событие на изменение объекта
			console.log('obj changed');

			var json = this.changedAttributes(); // Возвращаем JSON(хэш) только измененных параметров
			console.log(json);
		});
	},

	validate: function (attrs) { // Метод отбора данных, что бы они были актуальны
		if(attrs.size>1000) {
			console.log('Incorrect size');
			return 'Incorrect size';
		}
	},

	increaseSize: function () { // Пользовательская функция, для увеличения размера.
		this.set({ // Устанавливаем значение свойству
			size: this.get('size')+100 // Вытаскиваем текущее значение, изменяем его и отдаем.
		}, {validate:true}); // передаем наш валидатор
	}
});

// Работа с экземпляром
app.rocket = new app.classRocket({ // Создаем экземпляр класса, переопределяем дефолтные значения
	name: "rocket",
	description: "super"
});

app.rocket.set({ // Изменяем свойства объекта
	size: 250,
	type: 'active' // Добавляем новое свойство
});

$('#btn').on('click', function () { // Навешиваем на кнопку событие с нашей пользовательской функцией.
	app.rocket.increaseSize();
});

Урок 5. View
По-русски его называют «вид» или «представление», и нужны он главным образом для того,
чтобы отображать в браузере изменения(change) модели, коллекций и реагировать на события, вроде click, submit и пр.

Пример
SearchView = Backbone.View.extend({
	initialize: function() {
		alert(‘Initialized!’);
	}
});
var searchView = new SearchView();

5.1 Свойство el - ссылка на DOM элемент. Сначала формируется отображение в el а затем он уже вставляется на страницу.
!!!Все представления должны быть связаны с DOM-элементом, если не определить свойство el то backbone сам создаст новый элемент.
Управлять созданием элемента можно 3-мя свойствами: tagName, className, id. 
Если ни один из них не задан - будет создан пустой div.

Также, для вызова jQuery существует свойство $el, которое хранить хэш объекта.

Например - привяжем наше представлдение к кнопке:
var searchView = new SearchView({ el: $('#btn') });

5.2 Рендеринг представления
Что бы наше представление появилось в DOM - необходимо реализовать метод render, и вызвать его при создании.

SearchView = Backbone.View.extend({
	initialize: function() {
		alert('Initialized!');
	},

	render: function() {
		var template = _.template($('#search_template').html(), {}); // ищем наш шаблон по айди
		this.$el.html(template);

		return this;
	}
});

var searchView = new SearchView({ el: $('#search_container') });

5.3 Templater - шаблонизатор

Пример:
<script>
	$(function() {
		var compiled = _.template($('#rocketTpl').html());
		var obj = {
			name: 'Super',
			size: 190,
			color: 'red',
			nice: true
		};
		$('#rocket').append(compiled(obj));
	});
</script>

<script type="text/template" id="rocketTpl">
	<div>Name: <%= name %></div>
	<div>Size: <%= size %></div>
	<div>Color: <%= color %></div>
	<% if(nice) { %>
		<div>Nice Obj</div>
	<% } %>
</script>

Урок 6. Коллекции - группа моделей.

var MyModel = Backbone.Model.extend({ // Создаём прототип(класс) модели
	defaults: {
		size:10
	}
});

var MyCollection = Backbone.Collection.extend({ // Создаём прототип(класс) коллекции
	model:MyModel
});

var coll = new MyCollection(); // Создаем экземпляр коллекции (можно уже при создании передать объект)

var car = new MyModel({ // Создаем экземпляр модели, которую затем можем добавить в коллекцию.
	size: 75
});
// Добавление моделей
coll.add(car); // Добавляем уже созданную модель в коллекцию
coll.add({}); // Добавляем пустой объект, будет использоваться модель по умолчанию
coll.add([ {size:80}, {color:'white'}, {} ]) // Добавляем массив объектов в коллекцию.
// Удаляем модель из коллекции
coll.remove(car);
// Вывод коллекции
coll.toJSON();

Урок 7. Роутеры - предназначены для маршрутизации на стороне клиента, а также связывания этих действий с событиями.

!!!При инициализации роутера обязательно нужно вызвать
Backbone.history.start()
чтобы задать начальное состояние приложения.