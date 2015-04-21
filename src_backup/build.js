  /* основная логика вывода и построения селекторов */
  function build(){
    /*
    ** готовим общие переменные и прочие ништяки
    */
    var
      $select_wrapper = $main_owner.find('div.option_selector'),
      render_type = '',
      selectors =   '';

    $select_wrapper.remove();

    /* проверяем, было ли измнено значение основного селекта внешним способом */
    if( $modification_select.val() != tree.get_variant() ){
      //console.log('joke');
    };
    
    /* основной цикл отрисовки селетора */
    $.each( $options, function( option_index, $option ) {
      
      var 
        title =             $option.title.toLowerCase(),
        selected_option =   $option.selected,
        option_title =      $settings.labels[ title ] || $option.title;
        $variants =         tree.get_level( option_index ),
        render_type =       $settings.params[ title ] || $settings.default_type,
        selector =          '';

      /*
      if( $settings.params[ title ] ){
        render_type = $settings.params[ title ];
      }else{
        render_type = $settings.default_type;
      };

      if( $settings.labels[ title ] ){
        option_title = $settings.labels[ title ];
      };
      /**/

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