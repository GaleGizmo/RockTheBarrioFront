export const getLocalizedField = (value, language = "gl", fallbackLanguage = "gl") => {
  if (value == null) return "";
  if (typeof value === "string") return value;
  if (typeof value !== "object") return String(value);

  const lang = String(language || "").slice(0, 2);
  const fallback = String(fallbackLanguage || "").slice(0, 2);

  const preferred = value[lang];
  if (typeof preferred === "string" && preferred.trim()) return preferred;

  const fallbackValue = value[fallback];
  if (typeof fallbackValue === "string" && fallbackValue.trim()) return fallbackValue;

  const firstAvailable = Object.values(value).find(
    (entry) => typeof entry === "string" && entry.trim()
  );

  return firstAvailable || "";
};

export const updateLocalizedField = (originalValue, newText, language = "gl") => {
  if (originalValue && typeof originalValue === "object" && !Array.isArray(originalValue)) {
    const lang = String(language || "").slice(0, 2);
    return {
      ...originalValue,
      [lang]: newText,
    };
  }

  return newText;
};
