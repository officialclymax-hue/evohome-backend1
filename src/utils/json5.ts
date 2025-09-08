import JSON5 from 'json5';

export function tryParseJSON5(input: string) {
  try { return JSON5.parse(input); } catch { return null; }
}
