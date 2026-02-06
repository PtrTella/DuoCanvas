/**
 * First Level: Specializes a generic factory for a specific sport.
 * 
 * @param {Function} factory - The template factory (e.g., createResultTemplate)
 * @param {String} sportId - 'basket', 'soccer', etc.
 * @param {Object} config - Template specific configuration
 */
export const defineSportTemplate = (factory, sportId, config) => {
  // La factory è agnostica: riceve solo la configurazione funzionale.
  const base = factory(config); 
  
  return {
    ...config,                    // name, icon, defaultData, etc.
    ...base,                      // Render/Controls prodotti dalla factory
    sport: sportId,               // Salvato come metadato organizzativo
    id: `${sportId}_${config.id}`, // Namespace unico per evitare collisioni IDs
  };
};

/**
 * Creates a specialized version of defineSportTemplate for a single sport.
 * Useful to avoid repeating 'basket' or 'soccer' in every template definition.
 */
export const createSport = (sportId) => (factory, config) => 
  defineSportTemplate(factory, sportId, config);

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
 * Configure helper: Merge Template -> Sport Defaults -> Specific Defaults
 * 
 * @param {Object} template - The sport template
 * @param {Object} sportDefaults - General defaults for the sport (e.g. Arena name)
 * @param {Object} specificOverrides - Specific overrides for this template (e.g. Header Title)
 */
export const configureClubTemplate = (template, sportDefaults, specificOverrides = {}) => {
  return customizeForClub(template, {
    ...sportDefaults,
    ...specificOverrides,
    defaultData: {
      ...sportDefaults.defaultData,
      ...(specificOverrides.defaultData || {})
    }
  });
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
