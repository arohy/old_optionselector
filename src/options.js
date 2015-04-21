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