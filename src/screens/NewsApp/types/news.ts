export type NewType = {
  id?: string;
  title: string;
  description: string;
  content: string;
  url: string;
  image: string;
  urlToImage?: string;
  author?: string;
  publishedAt: string;
  lang: string;
  source?: {
    id: string;
    name: string;
    url: string;
  };
};
