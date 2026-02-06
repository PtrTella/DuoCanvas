/**
 * Utility for the "Double Specialization" pattern.
 * Allows defining templates at Sport level, then overriding at Club level.
 */

/**
 * First Level: Specializes a generic factory for a specific sport.
 * 
 * @param {Function} factory - The template factory (e.g., createResultTemplate)
 * @param {String} sportId - 'basket', 'soccer', etc.
 * @param {Object} config - Template specific configuration
 */
export const defineSportTemplate = (factory, sportId, config) => {
  const { id: templateSlug, ...factoryOptions } = config;
  
  const base = factory({ ...factoryOptions, sportId });
  
  return {
    ...base,
    id: `${sportId}_${templateSlug}`
  };
};

/**
 * Second Level: Specializes a sport template for a specific club.
 * Used in club-specific template registries to add themes or localized defaults.
 * 
 * @param {Object} template - The sport-specialized template
 * @param {Object} overrides - Club overrides (defaultTheme, defaultData, etc.)
 */
export const customizeForClub = (template, overrides) => {
  const { defaultData, ...rest } = overrides;
  
  return {
    ...template,
    ...rest,
    defaultData: {
      ...template.defaultData,
      ...(defaultData || {})
    }
  };
};
