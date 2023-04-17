function debounce(fn: Function) {
  let timer: any = null
  return function (...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args)
    }, 500)
  }
}

export default debounce
