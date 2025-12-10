import '@rspress/shared';

declare module '@rspress/shared' {
  export declare type PageType = 'home' | 'doc' | 'custom' | '404' | 'blank' | 'about' | 'friend' | 'blog';
  interface FrontMatterMeta {
    date: string;
  }
}

export { };