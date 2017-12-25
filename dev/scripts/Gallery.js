(function(Gallery, $) {
  const $body     = $('.body');
  const $app      = $('.js-grid');
  const $slider   = $('.js-slider');

  const urlBase   = 'https://api.flickr.com/services/rest/?method=';
  const urlParams = '&api_key=110c16d81f9636495349925d27be79e8&user_id=139166448%40N07&format=json&nojsoncallback=1';

  const photoUrl  = `${urlBase}flickr.photosets.getPhotos${urlParams}`;
  const setUrl    = `${urlBase}flickr.photosets.getList${urlParams}`;

  let saveSets = {};

  const buildTitle = (str) => {
    let str_arr = str.split('_');
    if (str.indexOf('_') === -1) {
      return str;
    }

    if(!isNaN(parseInt(str_arr[0]))) {
      str_arr.shift();
    }

    return str_arr.join(' ');
  }

  const slickImages = (html) => {
    $slider.html(html);
    $slider.slick({
      'dots': false,
      'arrows': true,
      'prevArrow': '<span class="icon icon-padding slick-prev"><span class="icon-arrow left"></span></span>',
      'nextArrow': '<span class="icon icon-padding slick-next"><span class="icon-arrow right"></span></span>'
    });
  };

  const buildHtml = ({photo}) => {
    let html = '';
    for(let i = 0; i < photo.length; i++) {
      let curr = photo[i];
      let title = buildTitle(curr.title);
      html += `<div class="slide-wrap"><div class="slide">`;
      html += `<figure class="slide-img"><img src="https://c1.staticflickr.com/${curr.farm}/${curr.server}/${curr.id}_${curr.secret}.jpg" /></figure>`;
      html += `<div class="slide-body"><p class="slid-title h2">${title}</p></div>`;
      html += `</div></div>`;
    }
    slickImages(html);
  };

  const getImages = (index) => {
    let id = $(`.grid-item:eq(${index})`).attr('data-id');
    $slider.attr('class','js-slider slider');

    if(typeof saveSets[id] !== 'undefined') {
      buildHtml(saveSets[id]);
      return;
    }

    $.ajax({
      url: `${photoUrl}&photoset_id=${id}`,
      dataType: 'json',
      success: function ({photoset}) {
        saveSets[id] = photoset;
        buildHtml(photoset);
      }
    });
  };

  const getSet = () => {
    let html = '';

    $.ajax({
      url: setUrl,
      dataType: 'json',
      success: function ({photosets}) {
        for(let i = 0; i < photosets.photoset.length; i++) {
          let curr = photosets.photoset[i];

          html = `<div class="grid-item" data-id="${curr.id}">`;
          html += `<figure class="grid-img"><img src="https://c1.staticflickr.com/${curr.farm}/${curr.server}/${curr.primary}_${curr.secret}.jpg" /></figure>`;
          html += `<p class="grid-title h2">${curr.title._content}</p>`;
          html += `</div>`;

          $app.append(html);
        }
        getImages(0);
      }
    });
  };

  const bindUIActions = () => {
    $body.on('click', '.grid-item', function () {
      getImages($(this).index());
    });
  };

  Gallery.init = () => {
    getSet();
    bindUIActions();
  };

}(window.Gallery = window.Gallery || {}, jQuery));
