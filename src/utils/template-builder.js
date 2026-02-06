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
 * Merges multiple layers of configuration (Sport defaults + Club overrides).
 * 
 * @param {Object} template - The base template from the library
 * @param {...Object} overrides - One or more override objects to merge
 */
export const customizeForClub = (template, ...overrides) => {
  if (!template) return null;

  return overrides.reduce((acc, curr) => {
    if (!curr) return acc;

    const { defaultData, ...rest } = curr;

    return {
      ...acc,
      ...rest,
      // Deep merge defaultData to combine schema, sport defaults, and overrides
      defaultData: {
        ...(acc.defaultData || {}),
        ...(defaultData || {})
      }
    };
  }, { ...template });
};

/**
 * Creates a complete Template Registry from an array of templates.
 * Returns both the map (by ID) and the default data for state initialization.
 */
export const buildRegistry = (templatesArray) => {
  const list = templatesArray.filter(Boolean);
  const map = {};
  const defaults = {};

  list.forEach(template => {
    if (!template.id) {
      console.error("Template building error: Missing ID for", template.name);
      return;
    }
    map[template.id] = template;
    defaults[template.id] = { ...template.defaultData };
  });

  return { map, list, defaults };
};

/**
 * Backwards compatibility alias for buildRegistry
 */
export const buildTemplateRegistry = (templatesArray) => buildRegistry(templatesArray).map;
