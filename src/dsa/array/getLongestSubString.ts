export function lengthOfLongestSubstring(s: string): number {
  const map = new Map();
  let length = 0;
  let j = 0;
  for (let i = 0; i < s.length; i++) {
    if (map.has(s[i])) {
      j = Math.max(j, map.get(s[i]) + 1);
    }
    map.set(s[i], i);
    length = Math.max(length, i - j + 1);
  }
  return length;
}
