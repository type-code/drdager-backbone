var RocketView = Backbone.View.extend({

        events: {
            "click .changeSize": "changeSize", // событие, jQuery селектор, имя события
            "click .deleteRow":  "deleteRow",
            "blur .desc": "editValue",
            "blur .name": "editValue",
            "change .size": "editValue"
        },

        initialize: function() {
            this.template = _.template($("#viewRocket").html());
            this.listenTo(this.model, "change", this.render); // слушаем нашу модель на собитие change
            this.listenTo(this.model, "destroy", this.remove); // слушаем нашу модель на собитие destroy
            this.render(); // отрисовываем нашу вьюшку
        },

        render: function() {
            var json = this.model.toJSON();// Получаем json из нашей модели
            var view = this.template(json);
            this.$el.html(view);
            console.log(json);
        },

        deleteRow: function() {
            this.model.destroy(); // просто удаляем нашу модель, а в месте сней удаляется и наша вьюшка
        },

        editValue: function () {
            this.model.set({
                name: this.$('.name').text(),
                description: this.$('.desc').text(),
                size: parseInt(this.$('input.size').val())
            }, {validate:true});
        },

        changeSize: function(event) {
            var diff = parseInt($(event.target).attr('data-rel'));// получаем значение
            var size = parseInt(this.model.get('size'));// выбираем текущее значение
            this.model.set({ // Перезаписываем размер модели
                size: size + diff
            }, {validate:true});
        }
});