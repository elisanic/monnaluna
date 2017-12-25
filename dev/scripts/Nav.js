(function(Nav, $) {
  const $body = $('body');
  const $nav = $('.js-nav');
  const $modal = $('.js-modal');
  const $toggleNav = $('.js-toggle-nav');

  Nav.show = () => {
    Scroll.lock();
    $body.addClass('window-active');
    $nav.addClass('is-active');
  };

  Nav.hide = () => {
    Modal.hide();
    $body.removeClass('window-active');
    $nav.removeClass('is-active');
    Scroll.unlock();
  };

  const bindUIActions = () => {
    $toggleNav.on('click', function () {
      if($nav.hasClass('is-active')) {
        Nav.hide();
      } else {
        Nav.show();
      }
      return false;
    });
  };

  Nav.init = () => {
    bindUIActions();
  };

}(window.Nav = window.Nav || {}, jQuery));
