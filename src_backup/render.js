  /* Функции, связанные с рендером селекторов и обработкой их событий */

  this.render = function(){
    
    /*
      корректируем выбранное свойство на первое доступное

      $variants     - массив вариантов для данного уровня свойств
      option_index  - НЕ ИСПОЛЬЗУЕТСЯ!!!!!
      option_id     - номер опции
    */
    
    function firstAvailable( $variants, option_index, option_id ){
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
        options.set( index, option_id ); 
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
        option_id = firstAvailable( $variants, index, option_id );
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
        option_id = firstAvailable( $variants, index, option_id );
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
                        'name="radio-options-'+   index +'" '+        //wtf??

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
        option_id = firstAvailable( $variants, index, option_id );
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
      рендер блока с цветом (из фалов темы)  

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
        option_id = firstAvailable( $variants, index, option_id );
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
                      'data-option-index="'+    index +'" '+   // wtf??

                      'data-image-id="'+        $product_image.id +'" '+
                      'data-image-original="'+  $product_image.original +'" '
                      'data-image-sized="'+     $product_image.sized +'" '+

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
        option_id = firstAvailable( $variants, index, option_id );
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
                      'data-option-index="'+    index +'" '+         // wtf??

                      'data-image-id="'+        $product_image.id +'" '+
                      'data-image-original="'+  $product_image.original +'" '
                      'data-image-sized="'+     $product_image.sized +'" '+

                      'class="image variant-image variant-image--'+ $options[ index ].name +' ';
        if( !$variant.available ){
          html += 'variant-image--unavailable';
        };
          
        if( ($variant.position == option_id) && !options.is_disabled( index ) ){
          html += 'variant-image--active ';
        };
        html += '" >';

        html += '<img  src="'+    $product_image.url +'" '+
                      'title="'+  $variant.title +'" '+
                      'alt="'+    $variant.title +'" '+

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
        option_id =     $unit.attr( 'data-option-position' ),
        option_index =  $unit.attr( 'data-option-index' ),
        is_disabled =   false;
    
      // для select'а нужен свой обработчик
      if( $unit.is('select') ){
        option_id = $unit.val();
      };
      
      /*
      console.log('decorator: _bind: option_id: ', option_id);
      console.log('decorator: _bind: option_index: ', option_index);
      /**/

      options.set( option_index, option_id );
      options.inable( option_index );
        
      //console.log('_bind: $options: ', $options);
        
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