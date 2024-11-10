export function raf(callback: () => void) {
  let rafId: number | undefined

  const frameFn = () => {
    callback()
    rafId = window.requestAnimationFrame(frameFn)
  }

  frameFn()

  return () => {
    if (rafId !== undefined) {
      cancelAnimationFrame(rafId)
    }
  }
}

export function waitFrames(frames = 0) {
  return new Promise<void>((res) => {
    let count = 0
    const cancel = raf(() => {
      if (count === frames) {
        cancel()
        res()
        return
      }
      count++
    })
  })
}

export async function wait(duration = 0) {
  return new Promise<void>((res) => {
    setTimeout(res, duration)
  })
}

/**
 * this is needed for
 */
export async function waitForFullFrame() {
  return new Promise<void>((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        res()
      })
    })
  })
}
