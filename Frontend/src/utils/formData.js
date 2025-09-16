export const objectToFormData = (object) => {
  const formData = new FormData();
  for (const key in object) {
    if (object[key] !== null && object[key] !== undefined) {
      formData.append(key, object[key]);
    }
  }
  return formData;
};
