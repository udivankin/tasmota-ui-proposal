export function sendFormData(url, data) {
  if ('showToastNotification' in window) {
    window.showToastNotification('success', { text: `POST FormData to ${url}: ${JSON.stringify(data)}` });
  }
}

export function get(url) {
  if ('showToastNotification' in window) {
    window.showToastNotification('success', { text: `GET ${url}` });
  }
}