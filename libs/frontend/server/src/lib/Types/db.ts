export interface Email {
  email: string;
}

export type EmailOrId =
  | Email
  | {
      id: string;
    };
