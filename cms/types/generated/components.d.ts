import type { Schema, Attribute } from '@strapi/strapi';

export interface BuilderFaq extends Schema.Component {
  collectionName: 'components_builder_faqs';
  info: {
    displayName: 'faq';
    icon: 'crown';
    description: '';
  };
  attributes: {
    question: Attribute.Text;
    answer: Attribute.Text;
  };
}

export interface BuilderSoc extends Schema.Component {
  collectionName: 'components_builder_socs';
  info: {
    displayName: 'Soc';
    icon: 'crown';
    description: '';
  };
  attributes: {
    contact: Attribute.String & Attribute.Required;
    network: Attribute.Enumeration<
      ['facebook', 'twitter', 'instagram', 'youtube', 'telegram']
    >;
  };
}

export interface SharedMetaSocial extends Schema.Component {
  collectionName: 'components_shared_meta_socials';
  info: {
    displayName: 'metaSocial';
    icon: 'project-diagram';
  };
  attributes: {
    socialNetwork: Attribute.Enumeration<['Facebook', 'Twitter']> &
      Attribute.Required;
    title: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    description: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 65;
      }>;
    image: Attribute.Media;
  };
}

export interface SharedSeo extends Schema.Component {
  collectionName: 'components_shared_seos';
  info: {
    displayName: 'seo';
    icon: 'search';
    description: '';
  };
  attributes: {
    metaTitle: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        maxLength: 60;
      }>;
    metaDescription: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 50;
        maxLength: 160;
      }>;
    metaImage: Attribute.Media;
    metaSocial: Attribute.Component<'shared.meta-social', true>;
    keywords: Attribute.Text;
    metaRobots: Attribute.String;
    structuredData: Attribute.JSON;
    metaViewport: Attribute.String;
    canonicalURL: Attribute.String;
    OG: Attribute.Component<'shared.meta-social', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'builder.faq': BuilderFaq;
      'builder.soc': BuilderSoc;
      'shared.meta-social': SharedMetaSocial;
      'shared.seo': SharedSeo;
    }
  }
}
