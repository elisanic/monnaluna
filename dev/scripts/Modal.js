(function(Modal, $) {
  const $body = $('body');
  const $wrapAll = $('html,body');
  const $modal = $('.js-modal');
  const $modalShow = $('.js-modal-show');

  Modal.show = (modalName) => {
    Scroll.lock();
    $body.addClass('window-active');
    $modal.addClass('is-active').find(`.modal-body[data-modal="${modalName}"]`).addClass('is-visible').siblings().removeClass('is-visible');
  };

  Modal.hide = () => {
    Scroll.unlock();
    $body.removeClass('window-active');
    $('.js-modal').removeClass('is-active').find('.is-visible').removeClass('is-visible');
  };

  const bindUIActions = () => {
    $modalShow.on('click', function () {
      let modalName = $(this).attr('data-modal-show');
      Modal.show(modalName);
      return false;
    });
  };

  Modal.init = () => {
    bindUIActions();
  };

}(window.Modal = window.Modal || {}, jQuery));
