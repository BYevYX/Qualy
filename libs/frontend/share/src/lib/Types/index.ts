export type Action = NonNullable<
  string | ((formData: FormData) => void | Promise<void>) | undefined
>;
