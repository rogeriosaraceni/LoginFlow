/* ////////////////////////////////////////////////////////////////////
*
*  bootstrap.config.js
*
* - activate the tooltips
* -
* -
*
* //////////////////////////////////////////////////////////////////// */

/* --------------------------------------------------------------------
* - activate the tooltips
* -------------------------------------------------------------------- */
$(document).ready(function() {
    $('[rel="tooltip"]').tooltip({
        boundary: 'window',
    })
});
