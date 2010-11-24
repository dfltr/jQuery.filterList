/* Copyright (c) 2010 Micah Snyder <micah.snyder@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

(function($) {
    $.fn.filterList = function(lists, options) {
        if(!this.is(':text')) throw "jQuery.filterList must be called on a text input."

        options = options || {
            omit: false
        };

        var field = this,
            lists = $(lists),
            items = $(),
            omit = options.omit ? ':not(' + options.omit + ')' : '';

        lists.each(function() {
            var list = $(this);

            list.bind('filter:keyup', function(e, data) {
                if(e.target.parentNode === list.get(0)) {
                    e.stopPropagation();

                    var item = $(e.target);

                    if(item.text().indexOf(data.q) == -1) {
                        item.hide();
                    } else {
                        item.show();
                    }
                }
            });
        });

        field.live('keyup', function() {
            lists.children(omit).trigger('filter:keyup', [{ q: field.val() }]);
        });

        return this;
    }
}(jQuery));