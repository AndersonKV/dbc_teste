export interface CreateToDoDTO {
  title: string;
  description?: string;
}

export interface UpdateToDoDTO {
  title?: string;
  description?: string;
  completed?: boolean;
}
