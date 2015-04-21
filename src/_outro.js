  // старт отрисовки
  // готовим настройки, дерево вариантов модификаций, общие переменные и прочее
  var
    $search        = window.location.search.replace( '?', '' ).split( '&' ),
    url_variant_id = '';

  $.each( $search, function( index, $value ){
    var
      temp = $value.split( '=' );

    if( temp[ 0 ] == 'variant_id' ){
      url_variant_id = temp[1];
      return false;
    };
  });

  var
    Base                 = this,
    settings             = new Base.settings(),
    tree                 = new Base.tree(),
    options              = new Base.options(),
    render               = new Base.render(),

    $modification_select = {},
    $product             = $config.product,

    $settings            = settings.init(),
    $tree                = tree.init(),
    $options             = options.init(),

    $main_owner          = $modification_select.parent();

  /*
  console.log('$product: ', $product);
  console.log('$settings: ', $settings);
  console.log('$tree: ', $tree);
  console.log('$options: ', $options);
  /**/

  // проверяем, есть ли в адресной строке выбранный вариант. Фикс для Яндекса-херандекса.

  if (url_variant_id != '') {
    $modification_select.val( url_variant_id );
  };

  // запускаем отрисовку и вешаем обновление на первый селектор.
  $modification_select.hide();

  $modification_select.on( 'change', function(){
    build();

    // выполняем callback
    if( $config.callback ){
      var
        variant_id = tree.get_variant(),
        $selector  = {};

      // передаем в callback необходимую инфу
      // выбраны ли у нас все свойства? Да, это - чертова магия
      $selector.is_disabled = settings.disableOnStart();

      $.each( $product.variants, function( index, $variant ) {
        if( $variant.id == variant_id ){
          $config.callback( $variant, $selector );
        }
      });
    };
  });

  $modification_select.trigger('change');
};

/* производим транслитерацию строки */
function translit( string ){
  var 
    space     = '_',
    $translit = {
      'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh', 
      'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
      'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
      'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': space, 'ы': 'y', 'ь': space, 'э': 'e', 'ю': 'yu', 'я': 'ya',
      ' ': space, '_': space, '`': space, '~': space, '!': space, '@': space,
      '#': space, '$': space, '%': space, '^': space, '&': space, '*': space, 
      '(': space, ')': space,'-': space, '\=': space, '+': space, '[': space, 
      ']': space, '\\': space, '|': space, '/': space,'.': space, ',': space,
      '{': space, '}': space, '\'': space, '"': space, ';': space, ':': space,
      '?': space, '<': space, '>': space, '№':space
    },
    result  = '',
    current = '';

  string = string.toLowerCase();

  for( i = 0; i < string.length; i++ ){
    if( $translit[ string[i] ] != undefined ){
      result += $translit[ string[i] ];
    }else{
      result += string[ i ];
    };
  };

  return result;
};