var MY_NAMESPACE = MY_NAMESPACE || {};

(function ($, MY_NAMESPACE) {
  "use strict";

  MY_NAMESPACE.init = function () {
    console.log('test');
  };

  /* READY FUNCTION
    ============================= */

  $(function () {

    MY_NAMESPACE.init();

  });

})(jQuery, MY_NAMESPACE);