  this.settings = function(){
    // инициализация настроек, установка дефолтов
    this.init = function(){
      var
        $settings = {};

      // инициализация параметров рендера
      $settings.disable      = $config.settings.disable      || false;
      $settings.default_type = $config.settings.default_type || 'select';
      $settings.firstOption  = $config.settings.firstOption  || false;

      // кусок магии на случай нежданчика
      if (url_variant_id != '') {
        $settings.firstOption = false;
      };

      $settings.labels = {};

      if( $config.settings.labels ){
        $.each( $config.settings.labels, function( index, value ){
          $settings.labels[ index.toLowerCase() ] = value;
        });
      };

      // используем ли мы скрипт в коллекции?
      $settings.collection = $config.settings.collection || false;

        // выставляем настройки принудительного выбора модификации
        $settings.start_disable         = $config.settings.start_disable  || {};
        $settings.start_disable.disable = $settings.start_disable.disable || false;
        $settings.start_disable.first   = true;

        // дефолтный текст для селекторов
        $settings.start_disable.default_text = $settings.start_disable.default_text || 'Выберите вариант';

        // пишим свои надписи в селеты
        var
          $temp = {};

        if( $config.settings.start_disable != undefined && $config.settings.start_disable.labels ){
          $.each( $config.settings.start_disable.labels, function( index, value ){
            $temp[ index.toLowerCase() ] = value;
          });
        };

        // делаем магию на случай, если не определяли этот пааметр во входных настройках
        $settings.start_disable.labels = $temp;

      // подготавливаем список типов рендера
      $settings.params = {};

      // добавляем настройки вывода из шаблона?
      if( $config.settings.template ){
        var
          span  = $config.settings.template.span  .replace( /\s+/g, '' ).split( ',' ),
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

      // делаем lowCase входных данных, на всякий случай
      if( $config.settings.params ){
        $.each( $config.settings.params, function( index, value ){
          $settings.params[ index.toLowerCase() ] = value;
        });
      };

      // настройки для файлов цветов из файлов file_url
      $settings.color =  {};
      if( $config.settings.color ){
        $.each( $config.settings.color, function( index, value ){
          $settings.color[ index.toLowerCase() ] = value;
        });
      }

      // настройки изображений из карточки товара
      $settings.image         = $config.settings.image  || {};
      $settings.image.size    = $settings.image.size    || 'small_url';
      $settings.image.preview = $settings.image.preview || 'large_url';

      // собираем необходимые пути изображений из карточки товара
      $settings.images = {};

      // сохраняем первую картинку товара

      $settings.images[ 'first_image' ] = {
        id:       $product.first_image.id,
        url:      $product.first_image[ $settings.image.size ],
        preview:  $product.first_image[ $settings.image.preview ],
        original: $product.first_image.original_url,
      };

      var
        $images = $product.images;

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

      //  определяем глобального родителя в DOM в зависимости от шаблона.
      //  для коллекции добавляем уточнение по форме. Требуется указать аттрибут data-product-id, куда закатываем id товара.
      if( !$settings.collection ){
        $modification_select = $('select#'+ selector_id);
      }else{
        $modification_select = $('form[data-product-id="'+ $product.id +'"]').find('select#'+ selector_id);
      };
      
      // отлавливаем вариант, когда в бек-офисе поставлена галочка "скрывать отсутствующие модификации"
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