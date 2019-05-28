function mobileMenu() {
  const toggleBtn = document.querySelector('.main-header__menu-icon')
  const menu = document.querySelector('.sidebar')

  toggleBtn.addEventListener('click', () => {
    menu.classList.toggle('sidebar--show')
  })
}

function dropdowns() {
  const dropdowns = Array.prototype.slice.call(
    document.querySelectorAll('.dropdown')
  )

  dropdowns.forEach(dropdown => {
    const list = dropdown.querySelector('.dropdown__list')

    if (list) {
      dropdown.addEventListener('click', () => {
        list.classList.add('dropdown__list--show')

        function onClose(event) {
          if (!dropdown.contains(event.target)) {
            list.classList.remove('dropdown__list--show')
            window.removeEventListener('click', onClose)
          }
        }

        window.addEventListener('click', onClose)
      })
    }
  })
}

function modals() {
  const modalBtns = Array.prototype.slice.call(
    document.querySelectorAll('[data-toggle="modal"]')
  )

  const overlay = document.createElement('div')
  overlay.classList.add('overlay')

  modalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const { target } = btn.dataset
      const modal = document.querySelector(`#${target}`)
      const appendedOverlay = document.body.appendChild(overlay)
      const closeBtn = modal.querySelector('.modal__close-btn')

      modal.classList.add('modal--show')

      closeBtn.addEventListener('click', close)
      appendedOverlay.addEventListener('click', close)

      function close() {
        appendedOverlay.remove()
        modal.classList.remove('modal--show')
      }
    })
  })
}

function accordions() {
  const accordions = Array.prototype.slice.call(
    document.querySelectorAll('.accordion')
  )

  accordions.forEach(acc => {
    acc.addEventListener('click', event => {
      const panel = acc.querySelector('.accordion__panel')
      if (panel.contains(event.target)) return
      acc.classList.toggle('accordion--active')
    })
  })
}

function selects() {
  $('select').each(function() {
    var $this = $(this),
      numberOfOptions = $(this).children('option').length

    $this.addClass('select-hidden')
    $this.wrap('<div class="select"></div>')
    $this.after('<div class="select-styled"></div>')

    var $styledSelect = $this.next('div.select-styled')
    $styledSelect.text(
      $this
        .children('option')
        .eq(0)
        .text()
    )

    var $list = $('<ul />', {
      class: 'select-options'
    }).insertAfter($styledSelect)

    for (var i = 0; i < numberOfOptions; i++) {
      var li = $('<li />', {
        text: $this
          .children('option')
          .eq(i)
          .text(),
        rel: $this
          .children('option')
          .eq(i)
          .val(),
        class: $this.children('option').eq(i)[0].classList.value
      })

      var href = $this
        .children('option')
        .eq(i)
        .attr('data-href')

      if (href) {
        li.click(function() {
          window.location.href = href
        })
      }

      li.appendTo($list)
    }

    var $listItems = $list.children('li')

    $styledSelect.click(function(e) {
      e.stopPropagation()
      $('div.select-styled.active')
        .not(this)
        .each(function() {
          $(this)
            .removeClass('active')
            .next('ul.select-options')
            .hide()
        })
      $(this)
        .toggleClass('active')
        .next('ul.select-options')
        .toggle()
    })

    $listItems.click(function(e) {
      e.stopPropagation()
      if ($(this)[0].classList.value !== 'addNew') {
        $styledSelect.text($(this).text()).removeClass('active')
        $this.val($(this).attr('rel'))
        $list.hide()
      } else {
        console.log('Add new Event')
      }
    })

    $(document).click(function() {
      $styledSelect.removeClass('active')
      $list.hide()
    })
  })
}

$(document).ready(() => {
  mobileMenu()
  dropdowns()
  modals()
  accordions()
  selects()
})
