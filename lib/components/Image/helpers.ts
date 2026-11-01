export const maxAttempts = 5;
export const attemptCooldown = 1000;
export const transparentImg =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

/** Adds the attempt number to a url, keeping its query and fragment */
export function withAttempt(url: string, attempt: number): string {
  const hash = url.indexOf('#');
  const head = hash < 0 ? url : url.slice(0, hash);
  const fragment = hash < 0 ? '' : url.slice(hash);
  const separator = head.includes('?') ? '&' : '?';
  return `${head}${separator}attempt=${attempt}${fragment}`;
}
