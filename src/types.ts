export type newUser = {
  password: string;
  email: string;
  name: string;
};

export type loginUser = {
  password: string;
  email: string;
};

export type filterType = {
  status: string | undefined;
  priority: string | undefined;
  page: number;
};

export type taskType = {
  title: string;
  dueDate: string;
  priority: string;
  status?: string;
};

export type paginationInfoType = {
  current_page: number;
  per_page: number;
  total_pages: number;
  count: number;
};
