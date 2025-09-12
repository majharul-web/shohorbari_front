export const tagTypes = {
  user: "user",
  category: "category",
  dashboard: "dashboard",
  ads: "ads",
} as const;

export type TagTypes = (typeof tagTypes)[keyof typeof tagTypes];

export const tagTypesList: TagTypes[] = [tagTypes.user, tagTypes.dashboard, tagTypes.category, tagTypes.ads];
