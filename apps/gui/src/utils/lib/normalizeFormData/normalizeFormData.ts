export const normalizeFormData = <T>(formData: T, items: string[] = [], cb?: (result: Record<string, any>) => void) => {
  const result: any = { ...formData };

  for (const item of items) {
    delete result[item];
  }

  cb && cb(result);

  return result;
};
