export const getAbsolutePath = (relative: string, meta: ImportMeta) => {
  return new URL(relative, meta.url).pathname;
};
