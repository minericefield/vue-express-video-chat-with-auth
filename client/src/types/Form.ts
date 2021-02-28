export type FormItem = {
  text: string;
  errorMessage: string;
}

export type Form = {
  [key: string]: FormItem;
}
