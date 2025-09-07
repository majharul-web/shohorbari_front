export const tagTypes = {
  user: "user",
} as const;

export type TagTypes = (typeof tagTypes)[keyof typeof tagTypes];

export const tagTypesList: TagTypes[] = [tagTypes.user];
