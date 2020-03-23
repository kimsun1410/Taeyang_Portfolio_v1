
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return !!right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}

function _classCallCheck(instance, Constructor) {
    if (!_instanceof(instance, Constructor)) {
        throw new TypeError("");
    }
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
}


var $window = $(window);
var $body = $('body');

var Slideshow = function() {
    function Slideshow() {
        var _this = this;

        var userOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Slideshow);

        var defaultOptions = {
            $el: $('.main_slide'),
            showArrows: false,
            showPagination: false,
            duration: 8000,
            autoplay: true
        };
        var options = Object.assign({}, defaultOptions, userOptions);
        this.$el = options.$el;
        this.maxSlide = this.$el.find($('.item')).length;
        this.showArrows = this.maxSlide > 1 ? options.showArrows : false;
        this.showPagination = options.showPagination;
        this.currentSlide = 1;
        this.isAnimating = false;
        this.animationDuration = 1000;
        this.autoplaySpeed = options.duration;
        this.interval;
        this.$controls = this.$el.find('.js-slider-home-button');
        this.autoplay = this.maxSlide > 1 ? options.autoplay : false;
        this.$el.on('click', '.js-slider-home-next', function(event) {
            return _this.nextSlide();
        });
        this.$el.on('click', '.js-slider-home-prev', function(event) {
            return _this.prevSlide();
        });
        /*this.$el.on('click', '.js-pagination-item', function(event) {
            if (!_this.isAnimating) {
                _this.preventClick();

                _this.goToSlide(event.target.dataset.slide);
            }
        });*/
        this.init();

    }

    _createClass(Slideshow, [{
        key: "init",
        value: function init() {
            this.goToSlide(1);

            if (this.autoplay) {
                this.startAutoplay();
            }

            if (this.showPagination) {
                var paginationNumber = this.maxSlide;
                var pagination = '<div class="pagination"><div class="list_box" data-hover="4">';

                for (var i = 0; i < this.maxSlide; i++) {
                    var item = "<span class=\"list ".concat(i === 0 ? 'active' : '', "\" data-slide=").concat(i + 1, ">").concat(i + 1, "</span>");
                    pagination = pagination + item;
                }

                pagination = pagination + '</div></div>';
                this.$el.append(pagination);
            }
        }
    }, {
        key: "preventClick",
        value: function preventClick() {
            var _this2 = this;

            this.isAnimating = true;
            this.$controls.prop('disabled', true);
            clearInterval(this.interval);
            setTimeout(function() {
                _this2.isAnimating = false;

                _this2.$controls.prop('disabled', false);

                if (_this2.autoplay) {
                    _this2.startAutoplay();
                }
            }, this.animationDuration);
        }
    }, {
        key: "goToSlide",
        value: function goToSlide(index) {
            this.currentSlide = parseInt(index);

            if (this.currentSlide > this.maxSlide) {
                this.currentSlide = 1;
            }

            if (this.currentSlide === 0) {
                this.currentSlide = this.maxSlide;
            }

            var newCurrent = this.$el.find('.item[data-slide="' + this.currentSlide + '"]');
            var newPrev = this.currentSlide === 1 ? this.$el.find('.item').last() : newCurrent.prev('.item');
            var newNext = this.currentSlide === this.maxSlide ? this.$el.find('.item').first() : newCurrent.next('.item');
            this.$el.find('.item').removeClass('prev next current');
            this.$el.find('.list').removeClass('active');

            if (this.maxSlide > 1) {
                newPrev.addClass('prev');
                newNext.addClass('next');
            }

            newCurrent.addClass('current');
            this.$el.find('.list[data-slide="' + this.currentSlide + '"]').addClass('active');
        }
    }, {
        key: "nextSlide",
        value: function nextSlide() {
            this.preventClick();
            this.goToSlide(this.currentSlide + 1);
        }
    }, {
        key: "prevSlide",
        value: function prevSlide() {
            this.preventClick();
            this.goToSlide(this.currentSlide - 1);
        }
    }, {
        key: "startAutoplay",
        value: function startAutoplay() {
            var _this3 = this;

            this.interval = setInterval(function() {
                if (!_this3.isAnimating) {
                    _this3.nextSlide();
                }
            }, this.autoplaySpeed);
        }
    }, {
        key: "destroy",
        value: function destroy() {
            this.$el.off();
        }
    }]);

    return Slideshow;
}();

(function() {
    "use strict";
    var loaded = false;
    var maxLoad = 4000;

    function load() {
        var options = {
            showPagination: true
        };
        var slideShow = new Slideshow(options);
    }

    function addLoadClass() {
        $body.addClass('animate');
    }

    $window.on('load', function() {
        if (!loaded) {
            loaded = true;
            load();
        }
    });
    setTimeout(function() {
        if (!loaded) {
            loaded = true;
            load();
        }
    }, maxLoad);
    addLoadClass(); 

})();
