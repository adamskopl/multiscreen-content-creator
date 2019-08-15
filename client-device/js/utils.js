export function getDeviceId() {
  // http://localhost:3000/devices/01aa6930/
  return window.location.pathname.split('/')[2];
}
