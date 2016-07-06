
var re = (function () {
    'use strict';

    // REObj class
    function REObj(args) {
        'use strict';

        var value = ''
        for (var ai in args) {
            var a = args[ai];
            if (a instanceof REObj)
                value += a.value;
            else
                value += a;
        }
        this.value = value;
    }
    REObj.prototype.value = '';
    REObj.prototype.render = function(){
        'use strict';
        var that = this;

        var tag = '';
        for(var i in arguments){
            if( (arguments[i] =='g') || (arguments[i] =='i') || (arguments[i] =='m'))
                    tag += arguments[i];
            else
                return 'render function parameter is only FIND_ALL(g), IGNORE_CASE(i), MULTILINE(m).' 
        }

        return RegExp(that.value, tag);
    };

    
    REObj.prototype.repeat = function(above, below){
        'use strict';

        var that = new REObj([this.value]);

        // above 
        if((!Number.isInteger(above)) && (above < 0))  
            return 'First parameter needs be a integer and a positive number.';

        //below
        if(below === undefined){
            that.value = that.value + '{' + above + '}';

        }else if(below === re_wrapper.INF){
            that.value = that.value + '{' + above + ',}';

        }else if(Number.isInteger(below) && (below >= 0)){
            that.value = that.value + '{' + above + ','+ below+ '}';
        }else
            return 'Second parameter needs be a integer and a positive number, Or Infinity.';

        return that;
    };
    REObj.prototype.above       = function(value) { return this.repeat(value, re_wrapper.INF); };
    REObj.prototype.above_one   = function() { return this.above(1); };
    REObj.prototype.above_zero  = function() { return this.above(0); };
    REObj.prototype.zero_one    = function() { return this.repeat(0, 1); };
    REObj.prototype.valueOf     = function() { return this.value; };
    // end of REObj class

    // re_wrapper
    var re_wrapper = function() {
        'use strict';
        return new REObj(arguments);
    };

    re_wrapper.INF                  = Infinity;
    re_wrapper.ANY                  = re_wrapper('.');
    re_wrapper.ALPHA                = re_wrapper('[a-zA-Z]');
    re_wrapper.LOWER_ALPHA          = re_wrapper('[a-z]');
    re_wrapper.UPPER_ALPHA          = re_wrapper('[A-Z]');
    re_wrapper.DIGIT                = re_wrapper('\\d');
    re_wrapper.NON_DIGIT            = re_wrapper('\\D');
    re_wrapper.BLANK                = re_wrapper('[\s\t]');

    // special character
    re_wrapper.DOT                  = re_wrapper('\\.');              
    re_wrapper.CARET                = re_wrapper('\\^');              
    re_wrapper.DOLLAR_SIGN          = re_wrapper('\\$');              
    re_wrapper.BACK_SLASH           = re_wrapper('\\\\');              
    re_wrapper.SLASH                = re_wrapper('\\/');              
    re_wrapper.PLUS                 = re_wrapper('\\+');              
    re_wrapper.ASTERRISK            = re_wrapper('\\*');              
    re_wrapper.QUESTION_MARK        = re_wrapper('\\?');              
    re_wrapper.OPEN_PARENTHESIS     = re_wrapper('\\(');              
    re_wrapper.CLOSE_PARENTHESIS    = re_wrapper('\\)');              
    re_wrapper.OPEN_BRACKET         = re_wrapper('\\[');              
    re_wrapper.CLOSE_BRACKET        = re_wrapper('\\]');              
    re_wrapper.PIPE                 = re_wrapper('\\|');              

    re_wrapper.DATE                 = re_wrapper('\\d{4}([\\s\\D]*)(1|(0?))\\d\\1([123]|(0?))\\d');
    re_wrapper.TIME                 = re_wrapper('([12]|(0?))\\d:[0-5]?\\d');

    // start
    re_wrapper.START_ANY                  = re_wrapper('^.');
    re_wrapper.START_ALPHA                = re_wrapper('^[a-zA-Z]');
    re_wrapper.START_LOWER_ALPHA          = re_wrapper('^[a-z]');
    re_wrapper.START_UPPER_ALPHA          = re_wrapper('^[A-Z]');
    re_wrapper.START_DIGIT                = re_wrapper('^\\d');
    re_wrapper.START_NON_DIGIT            = re_wrapper('^\\D');
    re_wrapper.START_BLANK                = re_wrapper('^[\s\t]');

    re_wrapper.START_DOT                  = re_wrapper('^\\.');              
    re_wrapper.START_CARET                = re_wrapper('^\\^');              
    re_wrapper.START_DOLLAR_SIGN          = re_wrapper('^\\$');              
    re_wrapper.START_BACK_SLASH           = re_wrapper('^\\\\');              
    re_wrapper.START_SLASH                = re_wrapper('^\\/');              
    re_wrapper.START_PLUS                 = re_wrapper('^\\+');              
    re_wrapper.START_ASTERRISK            = re_wrapper('^\\*');              
    re_wrapper.START_QUESTION_MARK        = re_wrapper('^\\?');              
    re_wrapper.START_OPEN_PARENTHESIS     = re_wrapper('^\\(');              
    re_wrapper.START_CLOSE_PARENTHESIS    = re_wrapper('^\\)');              
    re_wrapper.START_OPEN_BRACKET         = re_wrapper('^\\[');              
    re_wrapper.START_CLOSE_BRACKET        = re_wrapper('^\\]');              
    re_wrapper.START_PIPE                 = re_wrapper('^\\|');              

    //end
    re_wrapper.END_ANY                  = re_wrapper('.$');
    re_wrapper.END_ALPHA                = re_wrapper('[a-zA-Z]$');
    re_wrapper.END_LOWER_ALPHA          = re_wrapper('[a-z]$');
    re_wrapper.END_UPPER_ALPHA          = re_wrapper('[A-Z]$');
    re_wrapper.END_DIGIT                = re_wrapper('\\d$');
    re_wrapper.END_NON_DIGIT            = re_wrapper('\\D$');
    re_wrapper.END_BLANK                = re_wrapper('[\s\t]$');

    re_wrapper.END_DOT                  = re_wrapper('\\.$');              
    re_wrapper.END_CARET                = re_wrapper('\\^$');              
    re_wrapper.END_DOLLAR_SIGN          = re_wrapper('\\$$');              
    re_wrapper.END_BACK_SLASH           = re_wrapper('\\\\$');              
    re_wrapper.END_SLASH                = re_wrapper('\\/$');              
    re_wrapper.END_PLUS                 = re_wrapper('\\+$');              
    re_wrapper.END_ASTERRISK            = re_wrapper('\\*$');              
    re_wrapper.END_QUESTION_MARK        = re_wrapper('\\?$');              
    re_wrapper.END_OPEN_PARENTHESIS     = re_wrapper('\\($');              
    re_wrapper.END_CLOSE_PARENTHESIS    = re_wrapper('\\)$');              
    re_wrapper.END_OPEN_BRACKET         = re_wrapper('\\[$');              
    re_wrapper.END_CLOSE_BRACKET        = re_wrapper('\\]$');              
    re_wrapper.END_PIPE                 = re_wrapper('\\|$');              

    //render_tag
    re_wrapper.FIND_ALL = 'g';
    re_wrapper.IGNORE_CASE = 'i';
    re_wrapper.MULTILINE = 'm';

    // we use re_wrapper
    return re_wrapper;
}());
