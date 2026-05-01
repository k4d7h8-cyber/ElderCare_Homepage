export type SubPageNavItem = {
  label: string;
  targetId: string;
};

export type AboutPageContent = {
  greeting: {
    directorName: string;
    title: string;
    message: string;
    philosophyTitle: string;
    philosophyDescription: string;
  };
  history: Array<{
    year: string;
    title: string;
    description: string;
  }>;
  facility: {
    scale: string;
    floors: Array<{
      floor: string;
      description: string;
    }>;
    spaces: Array<{
      title: string;
      description: string;
    }>;
  };
  organization: {
    chart: Array<{
      role: string;
      name: string;
    }>;
    professionals: Array<{
      title: string;
      description: string;
    }>;
  };
  strengths: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
};

export type AdmissionPageContent = {
  targets: Array<{
    title: string;
    description: string;
  }>;
  steps: Array<{
    title: string;
    description: string;
  }>;
  documents: string[];
  costs: Array<{
    category: string;
    description: string;
    note: string;
  }>;
};

export type ServicePageContent = Array<{
  id: string;
  title: string;
  description: string;
  icon: string;
  imageUrl: string;
}>;

export type GalleryCategory = "daily" | "program" | "event" | "facility";

export type GalleryPageItem = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: GalleryCategory;
  date: string;
  isVisible: boolean;
};

export type NoticeListItem = {
  id: string;
  title: string;
  summary: string;
  publishedAt: string;
  isPinned: boolean;
  isVisible: boolean;
};

export type NoticeDetail = NoticeListItem & {
  content: string;
  attachments: Array<{
    name: string;
    url: string;
  }>;
  previousId?: string;
  nextId?: string;
};

export type LocationPageContent = {
  address: string;
  detailAddress: string;
  mapEmbedUrl: string;
  parking: string;
};
