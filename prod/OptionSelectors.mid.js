function OptionSelectors(a, b) {
    function c() {
        var a = "", b = "";
        if (k.collection) var c = n.find("div.select-wrapper"); else var c = $("div.select-wrapper");
        c.remove(), i.val() != f.get_variant(), $.each(m, function(c, d) {
            var e = d.title.toLowerCase(), g = d.selected, i = k.labels[e] || d.title;
            $variants = f.get_level(c), a = k.params[e] || k.default_type, 
            selector = "", selector += '<div class="select_wrapper select-wrapper select_wrapper--' + d.name + '" ><label class="select_wrapper-label select_wrapper-label--' + d.name + '">' + i + '</label><div class="select_wrapper-varaint variant select_wrapper-variant--' + d.name + " variant-select-option-" + c + '" >' + h[a]($variants, c, g) + "</div></div>", 
            b += selector;
        }), n.append(b), h.onClick();
    }
    this.render = function() {
        function a(a, b, c) {
            var d = !0, e = !1, f = 0, h = c;
            return $.each(a, function(a, b) {
                d && b.available && (d = !1, f = b.position), b.position == c && b.available && (e = !0);
            }), e || (c = f), h != c && g.set(index, c), c;
        }
        function b(a) {
            var b = a.attr("data-option-position"), c = a.attr("data-option-index");
            a.is("select") && (b = a.val()), g.set(c, b), g.inable(c), 
            i.val(f.get_variant()).trigger("change");
        }
        this.span = function(b, c, d) {
            var e = "";
            return k.firstOption && (d = a(b, c, d)), $.each(b, function(a, b) {
                e += '<span data-option-id="' + b.id + '" data-option-position="' + b.position + '" data-option-index="' + c + '" class="span variant-span variant-span--' + m[c].name + " ", 
                b.available || (e += "variant-span--unavailable "), 
                b.position != d || g.is_disabled(c) || (e += "variant-span--active "), 
                e += '" >' + b.title + "</span>";
            }), e;
        }, this.radio = function(b, c, d) {
            var e = "";
            return k.firstOption && (d = a(b, c, d)), $.each(b, function(a, b) {
                e += '<div class="radio variant-radio ', b.available || (e += "variant-radio--unavailable "), 
                e += '">', e += '<input  type="radio" name="radio-options-' + c + '" data-option-id="' + b.id + '" data-option-position="' + b.position + '" data-option-index="' + c + '" class="radio-switch variant-radio_switch" ', 
                !b.available && k.disable && (e += 'disabled="disabled" '), 
                b.position != d || g.is_disabled(c) || (e += 'checked="checked" '), 
                e += " />", e += '<label class="radio-label variant-radio_label">' + b.title + "</label></div>";
            }), e;
        }, this.select = function(b, c, d) {
            var e = m[c].title.toLowerCase();
            return disable_text = k.start_disable.labels[e] || k.start_disable.default_text, 
            html = "", selected = "", k.firstOption && (d = a(b, c, d)), 
            k.start_disable.disable && (html += '<option value="">' + disable_text + "</option>"), 
            $.each(b, function(a, b) {
                html += '<option value="' + b.position + '" data-option-id="' + b.id + '" ', 
                !b.available && k.disable && (html += 'disabled="disabled" '), 
                b.position != d || g.is_disabled(c) || (html += 'selected="selected" ', 
                selected = b.position), html += ">" + b.title + "</option>";
            }), html = '<select class="select variant-select variant-select--' + m[c].name + '" data-option-index="' + c + '" value="' + selected + '" >' + html + "</select>", 
            html;
        }, this.color = function(b, c, d) {
            var e = "";
            return k.firstOption && (d = a(b, c, d)), $.each(b, function(a, b) {
                var f = b.title.toLowerCase(), h = k.color[f], i = {};
                i = k.images[f] ? k.images[f] : k.images.first_image, 
                e += '<span data-option-id="' + b.id + '" data-option-position="' + b.position + '" data-option-index="' + c + '" data-image-id="' + i.id + '" data-image-original="' + i.original + '" ', 
                'data-image-sized="' + i.sized + '" class="color variant-color variant-color--' + m[c].name + " ", 
                b.available || (e += "variant-color--unavailable "), 
                b.position != d || g.is_disabled(c) || (e += "variant-color--active "), 
                e += '" >', e += '<img  src="' + h + '" title="' + b.title + '" alt="' + b.title + '" class="variant-color_image" />', 
                e += "</span>";
            }), e;
        }, this.image = function(b, c, d) {
            var e = $variant.title.toLowerCase(), f = "";
            return k.firstOption && (d = a(b, c, d)), $.each(b, function(a, b) {
                var h = {};
                h = k.images[e] ? k.images[e] : k.images.first_image, 
                f += '<span data-option-id="' + b.id + '" data-option-position="' + b.position + '" data-option-index="' + c + '" data-image-id="' + h.id + '" data-image-original="' + h.original + '" ', 
                'data-image-sized="' + h.sized + '" class="image variant-image variant-image--' + m[c].name + " ", 
                b.available || (f += "variant-image--unavailable"), 
                b.position != d || g.is_disabled(c) || (f += "variant-image--active "), 
                f += '" >', f += '<img  src="' + h.url + '" title="' + b.title + '" alt="' + b.title + '" class="variant-image_image" />', 
                f += "</span>";
            }), f;
        }, this.onClick = function() {
            var a = n.find(".variant-select");
            a.on("change", function() {
                b($(this));
            });
            var c = n.find(".radio-switch");
            c.on("change", function() {
                b($(this));
            });
            var d = n.find(".variant-span");
            k.disable && (d = d.not(".variant-span--unavailable")), 
            d.on("click", function() {
                b($(this));
            });
            var e = n.find(".variant-color");
            k.disable && (e = e.not(".variant-color--unavailable")), 
            e.on("click", function() {
                b($(this));
            });
            var f = n.find(".variant-image");
            k.disable && (f = f.not(".variant-image--unavailable")), 
            f.on("click", function() {
                b($(this));
            });
        };
    }, this.settings = function() {
        this.init = function() {
            var c = {};
            c.disable = b.settings.disable || !1, c.default_type = b.settings.default_type || "select", 
            c.firstOption = b.settings.firstOption || !1, c.labels = {}, 
            b.settings.labels && $.each(b.settings.labels, function(a, b) {
                c.labels[a.toLowerCase()] = b;
            }), c.collection = b.settings.collection || !1, c.start_disable = b.settings.start_disable || {}, 
            c.start_disable.disable = c.start_disable.disable || !1, 
            c.start_disable.first = !0, c.start_disable.default_text = c.start_disable.default_text || "Выберите вариант";
            var d = {};
            if (b.settings.start_disable.labels && $.each(b.settings.start_disable.labels, function(a, b) {
                d[a.toLowerCase()] = b;
            }), c.start_disable.labels = d || {}, c.params = {}, 
            b.settings.template) {
                var e = b.settings.template.span.replace(/\s+/g, "").split(","), f = b.settings.template.radio.replace(/\s+/g, "").split(","), g = b.settings.template.color.replace(/\s+/g, "").split(","), h = b.settings.template.image.replace(/\s+/g, "").split(",");
                $.each(e, function(a, b) {
                    "" != b && (c.params[b.toLowerCase()] = "span");
                }), $.each(f, function(a, b) {
                    "" != b && (c.params[b.toLowerCase()] = "radio");
                }), $.each(g, function(a, b) {
                    "" != b && (c.params[b.toLowerCase()] = "color");
                }), $.each(h, function(a, b) {
                    "" != b && (c.params[b.toLowerCase()] = "image");
                });
            }
            b.settings.params && $.each(b.settings.params, function(a, b) {
                c.params[a.toLowerCase()] = b;
            }), c.color = b.settings.color || {}, c.image = b.settings.image || {}, 
            c.image.size = c.image.size || "small_url", c.image.preview = c.image.preview || "large_url", 
            c.images = {}, c.images.first_image = {
                id: j.first_image.id,
                url: j.first_image[c.image.size],
                preview: j.first_image[c.image.preview],
                original: j.first_image.url
            };
            var k = j.images;
            return $.each(k, function(a, b) {
                b.title && (c.images[b.title.toLowerCase()] = {
                    id: b.id,
                    url: b[c.image.size],
                    preview: b[c.image.preview],
                    original: b.url
                });
            }), i = c.collection ? $('form[data-product-id="' + j.id + '"]').find("select#" + a) : $("select#" + a), 
            c.hide_unavailable = $("option", i).length < j.variants.length ? !0 : !1, 
            c;
        }, this.disableOnStart = function() {
            return k.start_disable.disable && k.start_disable.first;
        };
    }, this.tree = function() {
        function a(b) {
            if ("" == b.variant_id) {
                var c = !1;
                $.each(b.tree, function(b, d) {
                    a(d) && (c = !0);
                }), b.available = c;
            }
            return b.available;
        }
        this.init = function() {
            var b = {};
            return $.each(j.variants, function(a, c) {
                var d = c.id, e = b;
                $.each(c.option_values, function(a, b) {
                    var f = "";
                    if (a == c.option_values.length - 1) {
                        f = d;
                        var g = c.available;
                    }
                    e[b.position] || (e[parseInt(b.position)] = {
                        id: parseInt(b.id),
                        tree: {},
                        title: b.title,
                        variant_id: f,
                        position: parseInt(b.position)
                    }, void 0 !== g && (e[b.position].available = g)), 
                    e = e[b.position].tree;
                });
            }), $.each(b, function(b, c) {
                a(c);
            }), b;
        }, this.get_variant = function() {
            var a = l, b = 0;
            return $.each(m, function(c, d) {
                var e = d.selected;
                "" == a[e].variant_id ? a = a[e].tree : b = a[e].variant_id;
            }), b;
        }, this.get_level = function(a) {
            var b = l, c = [], d = [];
            return $.each(m, function(c, e) {
                var f = e.selected;
                return c == a ? ($.each(b, function(a) {
                    d.push(parseInt(a));
                }), !1) : void (b = b[f].tree);
            }), d.sort(function(a, b) {
                return a - b;
            }), $.each(d, function(a) {
                c.push({
                    title: b[d[a]].title,
                    available: b[d[a]].available,
                    tree: b[d[a]].tree,
                    position: b[d[a]].position,
                    id: b[d[a]].id
                });
            }), c;
        }, this.get_first = function(a) {
            var b = {}, c = [], d = !1;
            return $.each(a, function(a, b) {
                c[b.position] = b;
            }), c.forEach(function(a) {
                d || (k.hide_unavailable ? a.available && (b = a, 
                d = !0) : (b = a, d = !0));
            }), b;
        };
    }, this.options = function() {
        this.init = function() {
            var a = l, b = {};
            return $.each(j.option_names, function(c, d) {
                var g = f.get_first(a), h = !1;
                e.disableOnStart() && (h = !0), b[c] = {
                    id: d.id,
                    title: d.title,
                    selected: g.position,
                    name: translit(d.title),
                    disabled: h
                }, a = g.tree;
            }), b;
        }, this.set = function(a, b) {
            var a = parseInt(a), b = parseInt(b);
            m[a].selected = b;
            var c = f.get_level(a), d = {};
            c.forEach(function(a) {
                a.position == b && (d = a.tree);
            }), $.each(m, function(b) {
                if (b > a) {
                    var c = f.get_first(d);
                    m[b].selected = c.position, d = c.tree;
                }
            }), console.log("options: set: $options: ", m);
        }, this.get = function(a) {
            return m[a].selected;
        }, this.by_variant = function(a, b, c) {
            var d = !1;
            return $.each(b, function(b, e) {
                e.variant_id == a && (d = !0, m[c].selected = e.position);
            }), d;
        }, this.is_disabled = function(a) {
            return m[a].disabled;
        }, this.inable = function(a) {
            m[a].disabled = !1;
            var b = !1;
            return $.each(m, function(a, c) {
                c.disabled && (b = !0);
            }), b || (k.start_disable.disable = !1), b;
        };
    };
    var d = this, e = new d.settings(), f = new d.tree(), g = new d.options(), h = new d.render(), i = {}, j = b.product, k = e.init(), l = f.init(), m = g.init(), n = i.parent();
    console.log("$product: ", j), console.log("$settings: ", k), 
    console.log("$tree: ", l), console.log("$options: ", m), 
    i.hide(), i.on("change", function() {
        if (c(), b.callback) {
            var a = $(this).val(), d = {};
            d.is_disabled = e.disableOnStart(), $.each(j.variants, function(c, e) {
                e.id == a && b.callback(e, d);
            });
        }
    }), i.trigger("change");
}

function translit(a) {
    var b = "_";
    for ($translit = {
        "а": "a",
        "б": "b",
        "в": "v",
        "г": "g",
        "д": "d",
        "е": "e",
        "ё": "e",
        "ж": "zh",
        "з": "z",
        "и": "i",
        "й": "j",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "h",
        "ц": "c",
        "ч": "ch",
        "ш": "sh",
        "щ": "sh",
        "ъ": b,
        "ы": "y",
        "ь": b,
        "э": "e",
        "ю": "yu",
        "я": "ya",
        " ": b,
        _: b,
        "`": b,
        "~": b,
        "!": b,
        "@": b,
        "#": b,
        $: b,
        "%": b,
        "^": b,
        "&": b,
        "*": b,
        "(": b,
        ")": b,
        "-": b,
        "=": b,
        "+": b,
        "[": b,
        "]": b,
        "\\": b,
        "|": b,
        "/": b,
        ".": b,
        ",": b,
        "{": b,
        "}": b,
        "'": b,
        '"': b,
        ";": b,
        ":": b,
        "?": b,
        "<": b,
        ">": b,
        "№": b
    }, result = "", current = "", a = a.toLowerCase(), 
    i = 0; i < a.length; i++) result += void 0 != $translit[a[i]] ? $translit[a[i]] : a[i];
    return result;
}