export type HeroContent = {
  title: string;
  description: string;
  primaryActionLabel: string;
  secondaryActionLabel: string;
  backgroundImageUrl: string;
};

export type HomeHighlight = {
  id: string;
  title: string;
  description: string;
};

export type HomePageData = {
  hero: HeroContent;
  highlights: HomeHighlight[];
};

export type MenuItem = {
  id: string;
  label: string;
  href: string;
  order: number;
  isVisible: boolean;
};

export type SiteConfig = {
  siteName: string;
  siteDescription: string;
  phone: string;
  email: string;
  address: string;
  consultationHours: string;
};

export type Notice = {
  id: string;
  title: string;
  summary: string;
  href: string;
  publishedAt: string;
  isTopBanner: boolean;
  isVisible: boolean;
};

export type AboutStat = {
  label: string;
  value: string;
};

export type AboutOverview = {
  title: string;
  description: string;
  stats: AboutStat[];
};

export type AdmissionContent = {
  title: string;
  description: string;
  steps: string[];
  documents: string[];
  contactLabel: string;
};

export type LocationContent = {
  name: string;
  address: string;
  detailAddress: string;
  phone: string;
  mapEmbedUrl: string;
  traffic: string[];
  parking: string;
};

export type Service = {
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
  order: number;
  isVisible: boolean;
};

export type GalleryItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  order: number;
  isVisible: boolean;
};
