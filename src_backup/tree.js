  /* функции для работы с деревом модификаций */
  this.tree = function(){
    /*   инициализайия дерева модификаций   */
    this.init = function(){
      var $tree = {};

      /* перебираем все варианты модификаций */
      $.each( $product.variants, function( variants_index, $variant ) {
        var
          variant_id =  $variant.id,
          $leaf =       $tree;

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

      //console.log('tree: init: ', $tree);
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
      
      //console.log('tree: get_variant: variant_id: ', variant_id);
      return variant_id;
    };

    /*
      возвращает массив значений с уровня
      level - уровень дерева
    */
    this.get_level = function( level ){
      var
        $leaf =   $tree,
        $level =  [],
        sort =    [];

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
          title:      $leaf[ sort[ index ] ].title,
          available:  $leaf[ sort[ index ] ].available,
          tree:       $leaf[ sort[ index ] ].tree,
          position:   $leaf[ sort[ index ] ].position,
          id:         $leaf[ sort[ index ] ].id
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
        $first =  {},
        temp =    [],
        flag =    false;
      
      $.each( $level, function( position, $variant ){ // WTF???? сюда и так должен приходит массив!!!!
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
      
      //console.log('_get_first_at_level: $first: ', $first);
      
      return $first;
    };
  };