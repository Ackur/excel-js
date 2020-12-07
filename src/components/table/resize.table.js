import {$} from '@core/dom'

export function resizeTableHandling(event, $root) {
  const resDirection = event.target.dataset.resize
  const $resize = $(event.target)
  const $parent = $resize.closest('[data-type="resizeble"]')
  const coords = $parent.getCoords()
  let value

  $resize.$el.classList.add('active')

  document.onmousemove = e => {
    if (resDirection === 'col') {
      const delta = e.pageX - coords.right
      value = coords.width + delta
      $resize.css({right: -delta + 'px'})
    } else {
      const delta = e.pageY - coords.bottom
      value = coords.height + delta
      $resize.css({bottom: -delta + 'px'})
    }
  }

  document.onmouseup = e => {
    if (resDirection === 'col') {
      $root.querySelectorAll(`[data-col="${$parent.data.col}"]`)
          .forEach(el => el.style.width = value + 'px')
      $resize.css({right: 0})
    } else {
      $parent.css({height: value + 'px'})
      $resize.css({bottom: 0})
    }

    document.onmousemove = null
    document.onmouseup = null
    $resize.$el.classList.remove('active')
  }
}
