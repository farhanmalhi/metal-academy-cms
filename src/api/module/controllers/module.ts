/**
 * module controller
 */

import { factories } from "@strapi/strapi";
import { v4 as uuidv4 } from 'uuid';

export default factories.createCoreController(
  "api::module.module",
  ({ strapi }) => ({
    /**
     * Get all modules with their nested sections and resources
     * Handles both ordered and unordered sections/resources
     */
    async getAllWithNested(ctx) {
      try {
        // Fetch all modules with their nested relations
        const modules = (await strapi.entityService.findMany(
          "api::module.module",
          {
            populate: [
              "sections.resources",
              "sections.resources.thumbnail",
              "sections.resourceOrders.resource",
              "sections.resourceOrders.resource.thumbnail",
              "sectionOrders.section.resources",
              "sectionOrders.section.resources.thumbnail",
              "sectionOrders.section.resourceOrders.resource",
              "sectionOrders.section.resourceOrders.resource.thumbnail"
            ],
          }
        )) as any[];

        // Sort modules by their order field
        const sortedModules = modules.sort((a, b) => a.order - b.order);

        // Transform modules to include ordered sections and resources
        const transformedModules = sortedModules.map((module) => {
          // Handle sections based on whether they have order information
          const orderedSections =
            module.sectionOrders?.length 
              ? module.sectionOrders.sort((a, b) => a.order - b.order)
                .map((order) => {
                  const section = order.section;
                  if (!section) return null;

                  // Handle resources based on whether they have order information
                  const orderedResources = section.resourceOrders?.length
                    ? section.resourceOrders.sort((a, b) => a.order - b.order)
                      .map((order) => {
                        const resource = order.resource;
                        if (!resource) return null;
                        
                        // Map resource to include only necessary fields
                        return {
                          id: resource.id,
                          key: uuidv4(),
                          title: resource.title,
                          description: resource.description,
                          type: resource.type,
                          url: resource.url,
                          thumbnail: resource.thumbnail?.url || null
                        };
                      })
                      .filter(Boolean)
                    : section.resources?.map(resource => ({
                        id: resource.id,
                        key: uuidv4(),
                        title: resource.title,
                        description: resource.description,
                        type: resource.type,
                        url: resource.url,
                        thumbnail: resource.thumbnail?.url || null
                      })) || [];

                  // Map section with its resources
                  return {
                    id: section.id,
                    key: uuidv4(),
                    title: section.title,
                    description: section.description,
                    resources: orderedResources,
                  };
                })
                .filter(Boolean)
              : module.sections?.map(section => ({
                  id: section.id,
                  key: uuidv4(),
                  title: section.title,
                  description: section.description,
                  resources: section.resources?.map(resource => ({
                    id: resource.id,
                    key: uuidv4(),
                    title: resource.title,
                    description: resource.description,
                    type: resource.type,
                    url: resource.url,
                    thumbnail: resource.thumbnail?.url || null
                  })) || []
                })) || [];

          // Map module with its sections
          return {
            id: module.id,
            key: uuidv4(),
            title: module.title,
            description: module.description,
            sections: orderedSections,
          };
        });

        return {
          data: transformedModules,
        };
      } catch (err) {
        ctx.body = err;
      }
    },
  })
);
