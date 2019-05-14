$(document).ready(() => {
  dropdowns()
})

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
