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
 * Supports multiple layers of overrides (e.g., Sport Defaults + Club Specifics).
 * 
 * @param {Object} template - The sport-specialized template
 * @param {...Object} overridesList - Variable list of override objects (merged in order)
 */
export const customizeForClub = (template, ...overridesList) => {
  if (!template) return null;

  // Reduce all overrides onto the accumulator, starting with the template
  return overridesList.reduce((acc, override) => {
    if (!override) return acc;
    const { defaultData, ...rest } = override;
    
    return {
      ...acc,
      ...rest, // Merge top-level props (theme, name, etc.)
      defaultData: {
        ...acc.defaultData,
        ...(defaultData || {}) // Merge nested defaultData
      }
    };
  }, { ...template });
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
