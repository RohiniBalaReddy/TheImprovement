import React, { useMemo } from 'react';
import { DefaultSeo, OrganizationJsonLd, BreadcrumbJsonLd } from 'next-seo';
import { useRouter } from 'next/router';
import Head from 'next/head';

import {
  BASE_DEPLOYMENT_URL,
  PROJECT_NAME,
  PRIMARY_IMAGE_URL,
  CORPORATE_CONTACTS,
  SOCIAL_PROFILES,
  DEFAULT_ADDRESS,
  DEFAULT_OPENING_HOURS,
  DEFAULT_KEYWORDS
} from './seoConstants';

/** ---------- Props Interface ---------- **/
export interface ISEO {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  keywords?: string;
  imageUrl?: string;
  favicon?: string;
  noIndex?: boolean;
  markdownText?: string;
  breadcrumbs?: { name: string; item: string }[];
  faq?: { question: string; answer: string }[];
  service?: {
    name: string;
    description: string;
    areaServed?: string[];
    providerType?: "LocalBusiness" | "RealEstateAgent" | "HomeAndConstructionBusiness";
  };
  realEstateListing?: {
    name: string;
    description: string;
    addressLocality: string;
    addressRegion: string;
    price?: number;
    priceCurrency?: string;
    propertyType?: string;
    url?: string;
  };
  article?: {
    headline: string;
    datePublished: string;
    dateModified?: string;
    author: { name: string };
  };
  siteLinksSearchBox?: boolean;
  corporateContact?: {
    telephone: string;
    contactType: string;
    areaServed: string | string[];
    availableLanguage: string | string[];
  }[];
  socialProfiles?: string[];
  openingHours?: string;
  address?: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
}

/** ---------- Main Component ---------- **/
const SEO: React.FC<ISEO> = (props) => {
  const { isReady, asPath } = useRouter();

  // Current URL (for canonical and structured data)
  const currentUrl = useMemo(
    () => (isReady ? `${BASE_DEPLOYMENT_URL}${asPath.split('?')[0]}` : ''),
    [isReady, asPath]
  );

  const title = props.title || PROJECT_NAME;
  const description =
    props.description ||
    props.markdownText ||
    'OneCasa is India’s leading platform for Real Estate,  Construction, Interiors, Solar, Furniture & More.';
  const keywords =
    props.keywords ||
    DEFAULT_KEYWORDS
  const imageURL = props.imageUrl || PRIMARY_IMAGE_URL;
  const favicon = props.favicon || '/favicon.ico';
  const canonical = props.canonicalUrl || currentUrl;
  const noIndex = props.noIndex === true;
  const corporateContacts = props.corporateContact || CORPORATE_CONTACTS;
  const socialProfiles = props.socialProfiles || SOCIAL_PROFILES;
  const address = props.address || DEFAULT_ADDRESS;


  return (
    <>
      {/* Default SEO Config */}
      <DefaultSeo
        title={title}
        description={description}
        canonical={canonical}
        themeColor="#eedc00"
        openGraph={{
          type: 'website',
          siteName: PROJECT_NAME,
          title,
          description,
          url: canonical,
          images: [
            {
              url: imageURL,
              alt: description,
              width: 1200,
              height: 630,
            },
          ],
          // Enhanced Open Graph data
          ...(props.address && {
            place: {
              location: {
                'street-address': props.address.streetAddress,
                'locality': props.address.addressLocality,
                'region': props.address.addressRegion,
                'postal-code': props.address.postalCode,
                'country-name': props.address.addressCountry,
              }
            }
          }),
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@onecasa_in',
          site: '@onecasa_in',
        }}
        additionalMetaTags={[
          { name: 'keywords', content: keywords },
          { property: 'og:site_name', content: PROJECT_NAME },
          { name: 'apple-mobile-web-app-title', content: PROJECT_NAME },
          { name: 'application-name', content: PROJECT_NAME },
          { name: 'msapplication-TileColor', content: '#eedc00' },
          { name: 'theme-color', content: '#eedc00' },
        ]}
      />

      {/* Enhanced Organization JSON-LD */}
      <OrganizationJsonLd
        type="Corporation"
        id={BASE_DEPLOYMENT_URL}
        logo={imageURL}
        legalName="OneCasa Real Estate"
        name="OneCasa Real Estate"
        url={BASE_DEPLOYMENT_URL}
        sameAs={socialProfiles}
        contactPoint={corporateContacts}
        address={address}
        {...(props.openingHours && { openingHours: props.openingHours })}
      />

      {/* Breadcrumb JSON-LD */}
      {props.breadcrumbs && props.breadcrumbs.length > 0 && (
        <BreadcrumbJsonLd
          itemListElements={props.breadcrumbs.map((item, index) => ({
            position: index + 1,
            name: item.name,
            item: item.item,
          }))}
        />
      )}

      {/* Site Links Search Box */}
      {props.siteLinksSearchBox !== false && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: BASE_DEPLOYMENT_URL,
              potentialAction: {
                '@type': 'SearchAction',
                target: `${BASE_DEPLOYMENT_URL}/search?q={search_term_string}`,
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      )}

      {/* FAQ Schema */}
      {props.faq && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: props.faq.map((q) => ({
                '@type': 'Question',
                name: q.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: q.answer,
                },
              })),
            }),
          }}
        />
      )}

      {/* Service Schema */}
      {props.service && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Service',
              name: props.service.name,
              description: props.service.description,
              provider: {
                '@type': 'Organization',
                name: "OneCasa",
                url: BASE_DEPLOYMENT_URL,
              },
              areaServed: props.service.areaServed || ['India'],
              serviceType: props.service.providerType || 'RealEstateAgent',
            }),
          }}
        />
      )}

      {/* RealEstateListing Schema */}
      {props.realEstateListing && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'RealEstateListing',
              name: props.realEstateListing.name,
              description: props.realEstateListing.description,
              url: props.realEstateListing.url || currentUrl,
              address: {
                '@type': 'PostalAddress',
                addressLocality: props.realEstateListing.addressLocality,
                addressRegion: props.realEstateListing.addressRegion,
              },
              offers: props.realEstateListing.price
                ? {
                  '@type': 'Offer',
                  price: props.realEstateListing.price,
                  priceCurrency: props.realEstateListing.priceCurrency || 'INR',
                }
                : undefined,
              itemOffered: {
                '@type': 'Product',
                name: props.realEstateListing.propertyType,
              },
            }),
          }}
        />
      )}

      {/* Article Schema */}
      {props.article && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Article',
              headline: props.article.headline,
              datePublished: props.article.datePublished,
              dateModified: props.article.dateModified || props.article.datePublished,
              author: {
                '@type': 'Person',
                name: props.article.author.name,
              },
              publisher: {
                '@type': 'Organization',
                name: 'OneCasa',
                logo: {
                  '@type': 'ImageObject',
                  url: imageURL,
                },
              },
              mainEntityOfPage: currentUrl,
            }),
          }}
        />
      )}

      {/* LocalBusiness Schema for better local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'RealEstateAgent',
            '@id': `${BASE_DEPLOYMENT_URL}#organization`,
            name: 'OneCasa Real Estate',
            description: 'OneCasa is India’s leading platform for Real Estate, Interiors, Solar, Furniture & More.',
            url: BASE_DEPLOYMENT_URL,
            telephone: '+918897574909',
            address: address,
            openingHours: props.openingHours || 'Mo-Su 09:00-18:00',
            sameAs: socialProfiles,
            priceRange: '₹₹',
            image: imageURL,
            areaServed: 'India',
          }),
        }}
      />

      <Head>
        <meta
          name="robots"
          content={noIndex ? 'noindex,nofollow' : 'index,follow'}
        />
        <link rel="icon" href={favicon} />
        <link rel="apple-touch-icon" href={favicon} />

        <meta name="geo.region" content="IN-TG" />
        <meta name="geo.placename" content="Hyderabad" />
        <meta name="geo.position" content="17.385044;78.486671" />
        <meta name="ICBM" content="17.385044, 78.486671" />

        <meta name="language" content="en-IN" />
        <meta property="og:locale" content="en_IN" />
      </Head>
    </>
  );
};

export default SEO;