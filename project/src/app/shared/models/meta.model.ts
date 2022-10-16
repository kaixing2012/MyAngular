export class Meta {
  pagination: Pagination;
}

class Pagination {
  total: number;
  pages: number;
  page: number;
  limit: number;
  links: LinkSet;
}

class LinkSet {
  previous: string;
  current: string;
  next: string;
}
