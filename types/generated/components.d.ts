import type { Schema, Struct } from '@strapi/strapi';

export interface OrderingResourceOrder extends Struct.ComponentSchema {
  collectionName: 'components_ordering_resource_orders';
  info: {
    description: 'Defines the order of a resource within a section';
    displayName: 'Resource Order';
  };
  attributes: {
    Order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    Resource: Schema.Attribute.Relation<'oneToOne', 'api::resource.resource'>;
  };
}

export interface OrderingSectionOrder extends Struct.ComponentSchema {
  collectionName: 'components_ordering_section_orders';
  info: {
    description: 'Defines the order of a section within a module';
    displayName: 'Section Order';
  };
  attributes: {
    Order: Schema.Attribute.Integer &
      Schema.Attribute.Required &
      Schema.Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    Section: Schema.Attribute.Relation<'oneToOne', 'api::section.section'>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'ordering.resource-order': OrderingResourceOrder;
      'ordering.section-order': OrderingSectionOrder;
    }
  }
}
