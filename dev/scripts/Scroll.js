(function(Scroll, $) {
  const $wrapAll = $('html,body');

  Scroll.lock = () => {
    $wrapAll.addClass('no-scroll');
  };

  Scroll.unlock = () => {
    $wrapAll.removeClass('no-scroll');
  };

}(window.Scroll = window.Scroll || {}, jQuery));
