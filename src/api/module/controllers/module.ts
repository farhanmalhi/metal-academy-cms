/**
 * module controller
 */

import { factories } from "@strapi/strapi";
import { v4 as uuidv4 } from 'uuid';

export default factories.createCoreController(
  "api::module.module",
  ({ strapi }) => ({
    async getAllWithNested(ctx) {
      try {
        const modules = (await strapi.entityService.findMany(
          "api::module.module",
          {
            populate: [
              "sections.resources",
              "sections.resourceOrders.resource",
              "sectionOrders.section.resources",
              "sectionOrders.section.resourceOrders.resource"
            ],
          }
        )) as any[];

        // Sort modules by order
        const sortedModules = modules.sort((a, b) => a.order - b.order);

        // Transform the data to include ordered sections and resources
        const transformedModules = sortedModules.map((module) => {
          // Get ordered sections
          const orderedSections =
            module.sectionOrders?.sort((a, b) => a.order - b.order)
              .map((order) => {
                const section = order.section;
                if (!section) return null;

                // Get ordered resources for this section
                const orderedResources = section.resourceOrders?.sort(
                  (a, b) => a.order - b.order
                )
                  .map((order) => {
                    const resource = order.resource;
                    if (!resource) return null;
                    
                    // Only return needed fields for resource
                    return {
                      id: resource.id,
                      key: uuidv4(),
                      title: resource.title,
                      description: resource.description,
                      type: resource.type,
                      url: resource.url,
                      thumbnail: resource.thumbnail
                    };
                  })
                  .filter(Boolean);

                return {
                  id: section.id,
                  key: uuidv4(),
                  title: section.title,
                  description: section.description,
                  resources: orderedResources || [],
                };
              })
              .filter(Boolean) || [];

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
