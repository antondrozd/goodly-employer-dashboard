// // $(document).ready(function() {
// //   $('select').niceSelect();
// // });

// window.onload = function () {
//   $('select').each(function(){
//       var $this = $(this), numberOfOptions = $(this).children('option').length;

//       $this.addClass('select-hidden');
//       $this.wrap('<div class="select"></div>');
//       $this.after('<div class="select-styled"></div>');

//       var $styledSelect = $this.next('div.select-styled');
//       $styledSelect.text($this.children('option').eq(0).text());

//       var $list = $('<ul />', {
//           'class': 'select-options'
//       }).insertAfter($styledSelect);

//       for (var i = 0; i < numberOfOptions; i++) {
//           $('<li />', {
//               text: $this.children('option').eq(i).text(),
//               rel: $this.children('option').eq(i).val(),
//               class: $this.children('option').eq(i)[0].classList.value,
//           }).appendTo($list);
//       }

//       var $listItems = $list.children('li');

//       $styledSelect.click(function(e) {
//           e.stopPropagation();
//           $('div.select-styled.active').not(this).each(function(){
//               $(this).removeClass('active').next('ul.select-options').hide();
//           });
//           $(this).toggleClass('active').next('ul.select-options').toggle();
//       });

//       $listItems.click(function(e) {
//           e.stopPropagation();
//           if ($(this)[0].classList.value !== 'addNew') {
//               $styledSelect.text($(this).text()).removeClass('active');
//               $this.val($(this).attr('rel'));
//               $list.hide();
//           } else {
//               console.log('Add new Event')
//           }
//       });

//       $(document).click(function() {
//           $styledSelect.removeClass('active');
//           $list.hide();
//       });

//   });
// };
