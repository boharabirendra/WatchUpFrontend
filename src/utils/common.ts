export function spinnerStart(spinner: HTMLSpanElement) {
  spinner.classList.remove("hidden");
}

export function spinnerStop(spinner: HTMLSpanElement) {
  spinner.classList.add("hidden");
}
