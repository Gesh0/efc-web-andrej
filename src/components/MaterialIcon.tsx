/**
 * Google Material Symbols (Outlined), loaded as the Google Fonts icon font.
 * Only the glyphs listed in ICONS are requested — add a name here to use a new icon.
 */
const ICONS = [
  "alt_route",
  "assignment_return",
  "block",
  "fact_check",
  "flight",
  "flight_land",
  "groups",
  "handshake",
  "inventory_2",
  "local_shipping",
  "location_on",
  "login",
  "move_to_inbox",
  "package_2",
  "password",
  "payments",
  "receipt_long",
  "route",
  "savings",
  "shelves",
  "storefront",
  "trending_up",
  "verified_user",
  "videocam",
  "visibility",
  "warehouse",
] as const;

export type MaterialName = (typeof ICONS)[number];

/** Stylesheet URL for the root layout; Google requires icon_names sorted alphabetically. */
export const MATERIAL_SYMBOLS_HREF =
  "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" +
  `&icon_names=${[...ICONS].sort().join(",")}&display=block`;

export default function MaterialIcon({ name, size = 24 }: { name: MaterialName; size?: number }) {
  return (
    <span
      aria-hidden="true"
      className="material-symbols-outlined"
      style={{ fontSize: size, lineHeight: 1, fontVariationSettings: `"FILL" 0, "wght" 400, "GRAD" 0, "opsz" ${size}` }}
    >
      {name}
    </span>
  );
}
