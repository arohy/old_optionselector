/*
ver 0.7

ВНИМАНИЕ!!!!! Верстка может быть НЕ СОВМЕСТИМА с предыдущими версиями скриптов, прочтите мануал
*/

function OptionSelectors(selector_id, $config){

  /* Функции, связанные с рендером селекторов и обработкой их событий */

  this.render = function(){
    
    /*
      корректируем выбранное свойство на первое доступное

      $variants     - массив вариантов для данного уровня свойств
      option_index  - НЕ ИСПОЛЬЗУЕТСЯ!!!!! -
      option_id     - номер опции
    */
    
    function firstAvailable( $variants, option_id, option_index ){
      /*
      console.log( 'firstAvailable: $variants: ', $variants );
      console.log( 'firstAvailable: start: option_id: ', option_id );
      /**/

      var
        is_first =            true,
        is_available =        false,
        available_option_id = 0,
        temp_id =             option_id;
        
      $.each( $variants, function( index, $variant ){
        if( is_first && $variant.available ){
          is_first = false;
          available_option_id = $variant.position;
        };
          
        if( $variant.position == option_id && $variant.available ){
          is_available = true;
        };
      });
    
      if (!is_available ){
        option_id = available_option_id;
      };
        
      //console.log( 'firstAvailable: end: option_id: ', option_id );
      if( temp_id != option_id ){ 
        options.set( option_index, option_id ); 
      };

      return option_id;
    };
    
    /*
      рендер блоков со значениями

      $variants  - объект c вариантами для данного уровня
      index      - порядковый номер свойства модификации для которого производим отрисовку
      option_id  - id варианта свойства, который выбран сейчас, на него навешивается .active
    */
    this.span = function( $variants, index, option_id ){
      var html = '';
      
      if( $settings.firstOption ){
        option_id = firstAvailable( $variants, option_id, index );
      };
           
      $.each( $variants, function( variant_id, $variant ){
        /*
        console.log('render: span: each: $variant: ', $variant);
        console.log('render: span: each: index: ', variant_id);
        /**/

        html += '<span data-option-id="'+       $variant.id +'" '+
                      'data-option-position="'+ $variant.position +'" '+
                      'data-option-index="'+    index +'" '+

                      'class="span variant-span variant-span--'+ $options[ index ].name +' ';
        if( !$variant.available ){
          html += 'variant-span--unavailable ';
        };
        if( ($variant.position == option_id) && !options.is_disabled( index ) ){
          html += 'variant-span--active ';
        };
        html += '" >'+
                  $variant.title +
                '</span>';
      });

      //console.log('render: span: html: ', html);
      
      return html;
    };

    /*
      рендер radio
      
      $variants  - объект вариантами для данного шага
      index      - порядковый номер свойства модификации для которого производим отрисовку
      option_id  - id варианта свойства, который выбран сейчас, на него навешивается .active
    */
    this.radio = function( $variants, index, option_id ){
      /*
      console.log('render: radio: $variants: ', $variants);
      console.log('render: radio: index: ', index);
      console.log('render: radio: option_id: ', option_id);
      /**/
           
      var html = '';

      if( $settings.firstOption ){
        option_id = firstAvailable( $variants, option_id, index );
      };
        
      //console.log('render: radio: variants: ', $variants);
        
      $.each( $variants, function(variant_id, $variant ){
        /*
        console.log('render: radio: each: $variant: ', $variant);
        console.log('render: radio: each: index: ', variant_id);
        /**/

        html += '<div class="radio variant-radio ';
        if( !$variant.available ){
          html +='variant-radio--unavailable ';
        };
        html += '">';
        html +='<input  type="radio" '+
                        'name="radio-options-'+   index +'" '+

                        'data-option-id="'+       $variant.id +'" '+
                        'data-option-position="'+ $variant.position +'" '+
                        'data-option-index="'+    index +'" '+

                        'class="radio-switch variant-radio_switch" ';
        if( !$variant.available && $settings.disable ){
          html +='disabled="disabled" ';
        };
        if(($variant.position == option_id) && !options.is_disabled( index ) ){
          html += 'checked="checked" ';
        };
        html += ' />';
        html += '<label class="radio-label variant-radio_label">'+
                  $variant.title +
                '</label></div>';
      });

      //console.log('render: radio: html: ', html);
      return html;
    };

    /*
      рендер select'а

      $variants  - объект вариантами для данного шага
      index      - порядковый номер свойства модификации для которого производим отрисовку
      option_id  - id варианта свойства, который выбран сейчас, на него навешивается .active
    */
    this.select = function( $variants, index, option_id ){
      /*
      console.log('render: select: $variants: ', $variants);
      console.log('render: select: index: ', index);
      console.log('render: select: option_id: ', option_id);
      /**/
           
      var 
        title =        $options[ index ].title.toLowerCase();
        disable_text = $settings.start_disable.labels[ title ] || $settings.start_disable.default_text;
        html =         '',
        selected =     '';
        
      if( $settings.firstOption ){
        option_id = firstAvailable( $variants, option_id, index );
      };
        
      if( $settings.start_disable.disable ){
        html += '<option value="">'+ disable_text +'</option>';
      };
        
      $.each( $variants, function( variant_id, $variant ){
        /*
        console.log('render: select: each: $variant: ', $variant);
        console.log('render: select: each: index: ', variant_id);
        /**/

        html += '<option value="'+          $variant.position +'" '+
                        'data-option-id="'+ $variant.id +'" ';    // wtf????

        if( !$variant.available && $settings.disable ){
          html += 'disabled="disabled" ';
        };

        if( ($variant.position == option_id) && !options.is_disabled( index ) ){
          html += 'selected="selected" ';
          selected = $variant.position;
        };
        html += '>'+
                  $variant.title+
                '</option>';
      });
        
      html =  '<select class="select variant-select variant-select--'+ $options[ index ].name +'" '+

                      'data-option-index="'+ index +'" '+

                      'value="'+ selected +'" '+
              '>'+ 
                html +
              '</select>';

      //console.log('render: select: html: ', html);
        
      return html;
    };

    /*
      рендер блока с цветом (из фалов)  

      $variants  - объект вариантами для данного шага
      index      - порядковый номер свойства модификации для которого производим отрисовку
      option_id  - id варианта свойства, который выбран сейчас, на него навешивается .active
    */
    this.color = function( $variants, index, option_id ){
      /*
      console.log('render: color: $variants: ', $variants);
      console.log('render: color: index: ', index);
      console.log('render: color: option_id: ', option_id);
      /**/
           
      var 
        html =        '';
        
      if( $settings.firstOption ){
        option_id = firstAvailable( $variants, option_id, index );
      };

      $.each( $variants, function( variant_id, $variant ){
        /*
        console.log('render: color: variant: ', $variant);
        console.log('render: color: index: ', variant_id);
        /**/
          
        var 
          image_name =     $variant.title.toLowerCase(),
          color_path =     $settings.color[ image_name ],
          $product_image = {};

        /* 
          вытаскиваем пути к картинкам для детального просмотра
          учитываем вариант, что для данного варианта может не присутствовать и берем пути для первой картинки
        */
        if( $settings.images[ image_name ] ){
          $product_image = $settings.images[ image_name ];
        }else{
          $product_image = $settings.images.first_image;
        };

        html += '<span data-option-id="'+       $variant.id +'" '+
                      'data-option-position="'+ $variant.position +'" '+
                      'data-option-index="'+    index +'" '+

                      'data-image-id="'+        $product_image.id +'" '+
                      'data-image-original="'+  $product_image.original +'" '+
                      'data-image-preview="'+     $product_image.preview +'" '+

                      'class="color variant-color variant-color--'+ $options[ index ].name +' ';
        if( !$variant.available ){
          html += 'variant-color--unavailable ';
        };
          
        if( ($variant.position == option_id) && !options.is_disabled( index ) ){
          html += 'variant-color--active ';
        };
        html += '" >';

        html += '<img  src="'+   color_path +'" '+
                      'title="'+ $variant.title +'" '+
                      'alt="'+   $variant.title +'" '+
                      'class="variant-color_image" '+
                '/>';

        html += '</span>';
      });

      //console.log('render: color: html: ', html);
      return html;
    };

    /*
      рендер блока с фото товара из карточки
      
      $variants  - объект вариантами для данного шага
      index      - порядковый номер свойства модификации для которого производим отрисовку
      option_id  - id варианта свойства, который выбран сейчас, на него навешивается .active
    */
    this.image = function( $variants, index, option_id ){
      /*
      console.log('render: image: $variants: ', $variants);
      console.log('render: image: index: ', index);
      console.log('render: image: option_id: ', option_id);
      /**/
           
      var 
        image_name = $variant.title.toLowerCase(),
        html =       '';
        
      if( $settings.firstOption ){
        option_id = firstAvailable( $variants, option_id, index );
      };
        
      $.each( $variants, function( variant_id, $variant ){
        /*
        console.log('render: image: variant: ', $variant);
        console.log('render: image: index: ', variant_id);
        /**/
          
        var 
          image_path = '',
          $product_image = {};

        /* 
          вытаскиваем пути к картинкам для детального просмотра
          учитываем вариант, что для данного варианта может не присутствовать и берем пути для первой картинки
        */
        if( $settings.images[ image_name ] ){
          $product_image = $settings.images[ image_name ];
        }else{
          $product_image = $settings.images.first_image;
        };

        html += '<span data-option-id="'+       $variant.id +'" '+
                      'data-option-position="'+ $variant.position +'" '+
                      'data-option-index="'+    index +'" '+

                      'data-image-id="'+        $product_image.id +'" '+
                      'data-image-original="'+  $product_image.original +'" '
                      'data-image-preview="'+     $product_image.preview +'" '+

                      'class="image variant-image variant-image--'+ $options[ index ].name +' ';
        if( !$variant.available ){
          html += 'variant-image--unavailable';
        };
          
        if( ($variant.position == option_id) && !options.is_disabled( index ) ){
          html += 'variant-image--active ';
        };
        html += '" >';

        html += '<img  src="'+   $product_image.url +'" '+
                      'title="'+ $variant.title +'" '+
                      'alt="'+   $variant.title +'" '+

                      'class="variant-image_image" '+
                '/>';

        html += '</span>';
      });

      //console.log('render: image: html: ', html);
      return html;
    };

    /*
      прибивает все действия по изменению Основного селектора и внесение измененинй к глобальным данным
      $unit - ссылка на jQuery объект, который был выбран как свойство модификации
    */
    function _bind( $unit ){
      var 
        option_id =    $unit.attr( 'data-option-position' ),
        option_index = $unit.attr( 'data-option-index' ),
        is_disabled =  false;
    
      // для select'а нужен свой обработчик
      if( $unit.is('select') ){
        option_id = $unit.val();
      };
      
      /*
      console.log('render: _bind: option_id: ', option_id);
      console.log('render: _bind: option_index: ', option_index);
      /**/

      options.set( option_index, option_id );
      options.inable( option_index );
        
      //console.log('render: _bind: $options: ', $options);
        
      $modification_select.val( tree.get_variant() ).trigger('change');
    };

    /* навешиваем обработку клика на отрисованный селектор */
    this.onClick = function (){
      /* select */
      var $select = $main_owner.find('.variant-select');

      $select.on( 'change', function(){
        _bind( $(this) );
      });
      
      /* radio */
      var $radio = $main_owner.find('.radio-switch');

      $radio.on( 'change', function(){
        _bind( $(this) );
      });

      /* span */
      var $span = $main_owner.find('.variant-span');
      
      if( $settings.disable ){
        $span = $span.not('.variant-span--unavailable');
      };

      $span.on( 'click', function(){
        _bind( $(this) );
      });

      /* color */
      var $color = $main_owner.find('.variant-color');
      
      if( $settings.disable ){
        $color = $color.not('.variant-color--unavailable');
      };

      $color.on( 'click', function(){
        _bind( $(this) );
      });
      
      /* image */
      var $image = $main_owner.find('.variant-image');
      
      if( $settings.disable ){
        $image = $image.not('.variant-image--unavailable');
      };

      $image.on( 'click', function(){
        _bind( $(this) );
      });
    };
  }

  this.settings = function(){
    /*
    инициализация настроек, установка дефолтов
    */
    this.init = function(){
      var $settings = {};
      
      /* инициализация параметров рендера */
      $settings.disable =      $config.settings.disable      || false;
      $settings.default_type = $config.settings.default_type || 'select';
      $settings.firstOption =  $config.settings.firstOption  || false;

      /* кусок магии на случай нежданчика */
      if (url_variant_id != '') {
        $settings.firstOption = false;
      };
      
      $settings.labels = {};

      if( $config.settings.labels ){
        $.each( $config.settings.labels, function( index, value ){
          $settings.labels[ index.toLowerCase() ] = value;
        });
      };

      /* используем ли мы скрипт в коллекции? */
      $settings.collection = $config.settings.collection || false;

      /* выставляем настройки принудительного выбора модификации */
        $settings.start_disable =         $config.settings.start_disable  || {};
        $settings.start_disable.disable = $settings.start_disable.disable || false;
        $settings.start_disable.first =   true;

        /* дефолтный текст для селекторов */
        $settings.start_disable.default_text = $settings.start_disable.default_text || 'Выберите вариант';

        /* пишим свои надписи в селеты */
        var $temp = {};

        if( $config.settings.start_disable != undefined && $config.settings.start_disable.labels ){
          $.each( $config.settings.start_disable.labels, function( index, value ){
            $temp[ index.toLowerCase() ] = value;
          });
        };

        /* делаем магию на случай, если не определяли этот пааметр во входных настройках */
        $settings.start_disable.labels = $temp;

      /* подготавливаем список типов рендера */
      $settings.params = {};

      /* добавляем настройки вывода из шаблона? */
      if( $config.settings.template ){
        var
          span =  $config.settings.template.span  .replace( /\s+/g, '' ).split( ',' ),
          radio = $config.settings.template.radio .replace( /\s+/g, '' ).split( ',' ),
          color = $config.settings.template.color .replace( /\s+/g, '' ).split( ',' ),
          image = $config.settings.template.image .replace( /\s+/g, '' ).split( ',' );
        
        $.each( span, function( index, value ){
          if( value != '' ){
            $settings.params[ value.toLowerCase() ] = 'span';
          };
        });
          
        $.each( radio, function( index, value ){
          if( value != '' ){
            $settings.params[ value.toLowerCase() ] = 'radio';
          };
        });
          
        $.each( color, function( index, value ){
          if( value != '' ){
            $settings.params[ value.toLowerCase() ] = 'color';
          };
        });

        $.each( image, function( index, value ){
          if( value != '' ){
            $settings.params[ value.toLowerCase() ] = 'image';
          };
        });
      };

      /* делаем lowCase входных данных, на всякий случай */
      if( $config.settings.params ){
        $.each( $config.settings.params, function( index, value ){
          $settings.params[ index.toLowerCase() ] = value;
        });
      };

      /* настройки для файлов цветов из файлов file_url */
      $settings.color =  {};
      if( $config.settings.color ){
        $.each( $config.settings.color, function( index, value ){
          $settings.color[ index.toLowerCase() ] = value;
        });
      }
      
      /* настройки изображений из карточки товара */
      $settings.image =         $config.settings.image  || {};
      $settings.image.size =    $settings.image.size    || 'small_url';
      $settings.image.preview = $settings.image.preview || 'large_url';

      /* собираем необходимые пути изображений из карточки товара */
      $settings.images = {};

      /* сохраняем первую картинку товара */

      $settings.images[ 'first_image' ] = {
        id:       $product.first_image.id,
        url:      $product.first_image[ $settings.image.size ],
        preview:  $product.first_image[ $settings.image.preview ],
        original: $product.first_image.original_url,
      };

      var $images = $product.images;
      
      $.each( $images, function( index, $image ){
        if( $image.title ){
          $settings.images[ $image.title.toLowerCase() ] = {
            id:       $image.id,
            url:      $image[ $settings.image.size ],
            preview:  $image[ $settings.image.preview ],
            original: $image.original_url,
          };
        };
      });
      
      /* 
        определяем глобального родителя в DOM в зависимости от шаблона.
        для коллекции добавляем уточнение по форме. Требуется указать аттрибут data-product-id, куда закатываем id товара.
      */

      if( !$settings.collection ){
        $modification_select = $('select#'+ selector_id);
      }else{
        $modification_select = $('form[data-product-id="'+ $product.id +'"]').find('select#'+ selector_id);
      };
      
      /* отлавливаем вариант, когда в бек-офисе поставлена галочка "скрывать отсутствующие модификации" */
      if( $('option', $modification_select).length < $product.variants.length ){
        $settings.hide_unavailable = true;
      }else{
        $settings.hide_unavailable = false;
      };
              
      return $settings;
    };

    this.disableOnStart = function(){
      return $settings.start_disable.disable && $settings.start_disable.first;
    };
  };

  /* функции для работы с деревом модификаций */
  this.tree = function(){
    /*   инициализайия дерева модификаций   */
    this.init = function(){
      var $tree = {};

      /* перебираем все варианты модификаций */
      $.each( $product.variants, function( variants_index, $variant ) {
        var
          variant_id = $variant.id,
          $leaf =      $tree;

        /*
        console.log('tree: init: variants_index: ', variants_index);
        console.log('tree: init: $variant: ', $variant);
        /**/

        /*
          перебираем варианты свойств модификаций и вносим их в дерево модификаций
          так же дополняем каждый узел нужными нам свойствами
          если потребуется добавить информацию - делаем это тут, в нужных местах тянем нужную инфу
        */
        $.each( $variant.option_values, function(index, $value) {
          /*
          console.log('tree: init: index: ', index);
          console.log('tree: init: $value:', $value);
          /**/

          var id = '';
          /* если дошли до последнего уровня, то записываем вариант модификации и ее доступность */
          if( index == ($variant.option_values.length - 1) ){
            id = variant_id;
            var is_available = $variant.available;
          };
          
          /* если такого свойства модификации еще нет, то загоняем все параметры в ноду */
          if( !$leaf[ $value.position ] ){
            $leaf[ parseInt( $value.position ) ] = {
              id:           parseInt( $value.id ),
              tree:         {},
              title:        $value.title,
              variant_id:   id,
              position:     parseInt( $value.position ), 
            };

            if( is_available !== undefined ){
              $leaf[ $value.position ].available = is_available;
            }
          };

          $leaf = $leaf[ $value.position ].tree;
        });
        
      });
      
      /* проставляем доступность опций модификаций по дереву */
      $.each( $tree, function( index, $leaf ) {
        leaf_available( $leaf );
      });

      return $tree;
    };

    /* фиксим доступность свойств модификаций прямо в дереве */
    function leaf_available( $leaf ){
      if( $leaf.variant_id == '' ){
        var is_available = false;

        $.each( $leaf.tree, function( index, $child ){
          if( leaf_available( $child ) ){
            is_available = true;
          };
        });

        $leaf.available = is_available;
      };

      return $leaf.available;
    };

    /*
      получаем вариант модификации, основываясь на выбранных опциях
      возвращает id варианта модификации
    */
    this.get_variant = function(){
      var 
        $leaf =       $tree,
        variant_id =  0;
      
      /*
      console.log('tree: get_variant: $leaf: start: ', $leaf);
      console.log('');
      /**/
      
      $.each( $options, function( index, $option ){
        var option_id = $option.selected;
        
        /*
        console.log('tree: get_variant: each: $option: ',$option);
        console.log('tree: get_variant: each: $leaf: ',$leaf);
        /**/
        
        if( $leaf[ option_id ].variant_id == '' ){
          $leaf = $leaf[ option_id ].tree;
        }else{
          variant_id = $leaf[ option_id ].variant_id;
        };
        
      });
      
      return variant_id;
    };

    /*
      возвращает массив значений с уровня
      level - уровень дерева
    */
    this.get_level = function( level ){
      var
        $leaf =  $tree,
        $level = [],
        sort =   [];

      $.each( $options, function( option_level, $option ){
        var option_id = $option.selected;

        if( option_level == level ){
          $.each( $leaf, function( leaf_index, $variant ){
            sort.push( parseInt( leaf_index ) );
          });

          return false;
        };
        
        $leaf = $leaf[ option_id ].tree;
        
      });

      sort.sort( function( a, b ){ 
        return a - b;
      });
      
      $.each( sort, function( index ){
        $level.push({
          title:     $leaf[ sort[ index ] ].title,
          available: $leaf[ sort[ index ] ].available,
          tree:      $leaf[ sort[ index ] ].tree,
          position:  $leaf[ sort[ index ] ].position,
          id:        $leaf[ sort[ index ] ].id
        });
      });

      return $level;
    };

    /*
      выбор первого ДОСТУПНОГО элемента на уровне дерева
      возвращает объект
    */
    this.get_first = function( $level ){
      var 
        $first = {},
        temp =   [],
        flag =   false;
      
      $.each( $level, function( position, $variant ){
        temp[ $variant.position ] = $variant;
      });
        
      temp.forEach( function( $key ){
        if( !flag ){
          if( $settings.hide_unavailable ){
            if( $key.available ){
              $first = $key;
              flag = true;
            };
          }else{
            $first = $key;
            flag = true;
          };
        };
      });
            
      return $first;
    };
  };

  /* функции для работы со свойствами модификаций */
  this.options = function(){
    /* инициализация */
    this.init = function(){
      var 
        $level =    $tree,
        $otpions =  {};

      $.each( $product.option_names, function( index, $option ) {
        var 
          $first =      tree.get_first( $level ),
          is_disabled = false;

        if( settings.disableOnStart() ){ is_disabled = true };
        
        $otpions[ index ] = {
          id:       $option.id,
          title:    $option.title,
          selected: $first.position,
          name:     translit( $option.title ),
          disabled: is_disabled,
        };

        $level = $first.tree;
      });

      return $otpions;
    };

    /*
      устанавливаем новое значение выбранного свойства
      option_index - порядковый номер свойства
      value - новое значение
    */
    this.set = function( option_index, value ){
      var
        option_index = parseInt( option_index ),
        value =        parseInt( value );

      $options[ option_index ].selected = value;
      
      /*  фиксим опции, которые идут выше */
      var
        $level = tree.get_level( option_index ),
        $leaf =  {};
      
      $level.forEach( function( $variant ){      
        if( $variant.position == value ){
          $leaf = $variant.tree;
        };
      });
      
      $.each( $options, function( index, $option ) {
        
        if( index > option_index ){    
          var $first = tree.get_first( $leaf );
                  
          $options[ index ].selected = $first.position;
          
          $leaf = $first.tree;
        };
      });      
    };

    /*
      получаем значение выбранной опции на уровне
      option_index - уровень, который проверяем
    */
    this.get = function( option_index ){
      return $options[ option_index ].selected;
    };

    /* 
      обновляем выбранные опции исходя из варианта модификации 
      не дописана! используется, если у нас вариант выбран внешним образом, сразу в корневом select'е
    */
    this.set_by_variant = function( variant_id ){
      by_variant( variant_id, $tree, 0 );
    };
   
    function by_variant( variant_id, $leaf, option_index ){
      var
        is_finded = false;

      $.each( $leaf, function( index, $variant){
        if( $variant.variant_id == variant_id ){
          is_finded = true;
          
        }else{
          if( $variant.tree ){
            is_finded = by_variant( variant_id, $variant.tree, option_index + 1 );
          };
        };

        if( is_finded ){
          $options[ option_index ].selected = $variant.position;
        };
      })

      return is_finded;
    };

    /*
      проверяем, было ли выбрано данное свойство
      используется при start_disable
    */
    this.is_disabled = function( option_index ){
      return $options[ option_index ].disabled;
    };

    /* разлочиваем свойство */
    this.inable = function( option_index ){
      $options[ option_index ].disabled = false;

      var is_disabled = false;

      $.each( $options, function( key, $option ){
        if( $option.disabled ){ is_disabled = true };
      });

      if( !is_disabled ){
        $settings.start_disable.disable = false;
      };

      return is_disabled;
    };
  };

  /* основная логика вывода и построения селекторов */
  function build(){
    /*
    ** готовим общие переменные и прочие ништяки
    */
    var
      $select_wrapper = $main_owner.find('div.option_selector'),
      render_type =     '',
      selectors =       '';

    $select_wrapper.remove();

    /* проверяем, было ли измнено значение основного селекта внешним способом */
    if( $modification_select.val() != tree.get_variant() ){
      options.set_by_variant( parseInt( $modification_select.val() ) );
    };
    
    /* основной цикл отрисовки селетора */
    $.each( $options, function( option_index, $option ) {
      
      var 
        title =            $option.title.toLowerCase(),
        selected_option =  $option.selected,
        option_title =     $settings.labels[ title ] || $option.title;
        render_type =      $settings.params[ title ] || $settings.default_type,
        $variants =        tree.get_level( option_index ),
        selector =         '';

      /* сборка селектора */

      selector += '<div class="select-wrapper option_selector option_selector--'+ $option.name +'" >'+
                    '<label class="option_selector-label option_selector-label--'+ $option.name +'">'+ option_title +'</label>'+
                    '<div class="variant option_selector-container option_selector-container--'+ $option.name +' container-select-option-'+ option_index +'" >'+
                      render[render_type]( $variants, option_index, selected_option ) +
                    '</div>'+
                  '</div>';

      selectors += selector;
    });

    $main_owner.append(selectors);
    //$main_owner.prepend(selectors);

    render.onClick();
  };

  /*
    старт отрисовки
    готовим настройки, дерево вариантов модификаций, общие переменные и прочее
  */
  var
    $search =              window.location.search.replace( '?', '' ).split( '&' ),
    url_variant_id =      '';

  $.each( $search, function( index, $value ){
    var temp = $value.split( '=' );
    if( temp[ 0 ] == 'variant_id' ){
      url_variant_id = temp[1];
      return false;
    }
  });
    
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
  console.log('$product: ', $product);
  console.log('$settings: ', $settings);
  console.log('$tree: ', $tree);
  console.log('$options: ', $options);
  /**/

  /* проверяем, есть ли в адресной строке выбранный вариант. Фикс для Яндекса-херандекса. */

 

  if (url_variant_id != '') {
    $modification_select.val( url_variant_id );
  };
  
  /* запускаем отрисовку и вешаем обновление на первый селектор. */
  
  $modification_select.hide();

  $modification_select.on( 'change', function(){
    build();

    /* выполняем callback */
    if( $config.callback ){
      var 
        variant_id = tree.get_variant(); //$(this).val(),
        $selector =  {};

      /* передаем в callback необходимую инфу */
      $selector.is_disabled = settings.disableOnStart();  // выбраны ли у нас все свойства? Да, это - чертова магия

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
    space = '_',
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
    result =  '',
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