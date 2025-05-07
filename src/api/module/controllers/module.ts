/**
 * module controller
 */

import { factories } from "@strapi/strapi";

export default factories.createCoreController(
  "api::module.module",
  ({ strapi }) => ({
    async getAllWithNested(ctx) {
      try {
        const modules = (await strapi.entityService.findMany(
          "api::module.module",
          {
            populate: [
              "Sections.Resources",
              "Sections.ResourceOrders.Resource",
              "SectionOrders.Section.Resources",
              "SectionOrders.Section.ResourceOrders.Resource"
            ],
          }
        )) as any[];

        // Transform the data to include ordered sections and resources
        const transformedModules = modules.map((module) => {
          // Get ordered sections
          const orderedSections =
            module.SectionOrders?.sort((a, b) => a.Order - b.Order)
              .map((order) => {
                const section = order.Section;
                if (!section) return null;

                // Get ordered resources for this section
                const orderedResources = section.ResourceOrders?.sort(
                  (a, b) => a.Order - b.Order
                )
                  .map((order) => order.Resource)
                  .filter(Boolean);

                return {
                  id: section.id,
                  Title: section.Title,
                  Description: section.Description,
                  Resources: orderedResources || [],
                };
              })
              .filter(Boolean) || [];

          return {
            id: module.id,
            Title: module.Title,
            Description: module.Description,
            Order: module.Order,
            Sections: orderedSections,
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
