export const AVATAR_STYLES = [
  "adventurer",
  "adventurer-neutral",
  "avataaars",
  "avataaars-neutral",
  "big-ears",
  "big-ears-neutral",
  "big-smile",
  "bottts",
  "bottts-neutral",
  "croodles",
  "croodles-neutral",
  "dylan",
  "fun-emoji",
  "icons",
  "identicon",
  "initials",
  "lorelei",
  "micah",
  "miniavs",
  "notionists",
  "notionists-neutral",
  "open-peeps",
  "personas",
  "pixel-art",
  "pixel-art-neutral",
  "rings",
  "shapes",
  "thumbs",
  "user",
  "user-neutral",
] as const;

export type AvatarStyle = (typeof AVATAR_STYLES)[number];

export function getRandomAvatar(email: string): string {
  const randomStyle =
    AVATAR_STYLES[Math.floor(Math.random() * AVATAR_STYLES.length)];
  return `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${email}`;
}
