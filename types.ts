export interface Resource {
  id: number;
  title: string;
  url: string;
  category: string;
  domain: string;
  description?: string;
  tags?: string[];
}