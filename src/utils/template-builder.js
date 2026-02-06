/**
 * First Level: Specializes a generic factory for a specific sport.
 * 
 * @param {Function} factory - The template factory (e.g., createResultTemplate)
 * @param {String} sportId - 'basket', 'soccer', etc.
 * @param {Object} config - Template specific configuration
 */
export const defineSportTemplate = (factory, sportId, config) => {
  const { id: slug, ...rest } = config;
  
  // The factory creates the base Render/Controls and merges defaultData
  const base = factory({ ...rest, sportId });
  
  return {
    ...rest,                  // name, icon, extraBlock, etc.
    ...base,                  // factory's Render, Controls, defaultData
    id: `${sportId}_${slug}`, // Unique ID: sport_type
  };
};

/**
 * Second Level: Specializes a sport template for a specific club.
 * 
 * @param {Object} template - The sport-specialized template
 * @param {Object} overrides - Club overrides (defaultTheme, defaultData, etc.)
 */
export const customizeForClub = (template, overrides) => {
  if (!template) return null;
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

/**
 * Utility to transform a list of templates into a registry map.
 * Ensures the map keys match the template IDs.
 */
export const buildTemplateRegistry = (templatesArray) => {
  return Object.fromEntries(
    templatesArray
      .filter(Boolean)
      .map(t => [t.id, t])
  );
};
