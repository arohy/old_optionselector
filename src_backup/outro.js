  /*
    старт отрисовки
    готовим настройки, дерево вариантов модификаций, общие переменные и прочее
  */
    
  var 
    Base =                 this,
    settings =             new Base.settings(),
    tree =                 new Base.tree(),
    options =              new Base.options(),
    render =               new Base.render(),
    $modification_select = {},
    $product =             $config.product,
    $settings =            settings.init(), 
    $tree =                tree.init(),
    $options =             options.init(),
    $main_owner =          $modification_select.parent();
  
  /* 
    запускаем отрисовку и вешаем обновление на первый селектор.
    В теории совместимо с ajax и выводом выбора модификации в категории
  */
  /**/
  console.log('$product: ', $product);
  console.log('$settings: ', $settings);
  console.log('$tree: ', $tree);
  console.log('$options: ', $options);
  /**/
  
  $modification_select.hide();

  $modification_select.on( 'change', function(){
    build();

    if( $config.callback ){
      var 
        variant_id = $(this).val(),
        $output = {};

      /* передаем в callback необходимую инфу */
      $output.is_disabled = settings.disableOnStart();

      $.each( $product.variants, function( index, $variant ) {
        if( $variant.id == variant_id ){

          $config.callback( $variant, $output );
        }
      });
    };
  });

  $modification_select.trigger('change');
};

function translit( string ){
  /* производим транслитерацию Строки */

  var 
    space = '_';
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
    result = '',
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