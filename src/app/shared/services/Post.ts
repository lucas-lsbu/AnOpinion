export interface Post {
    imageUrl?: string;
    title: string,
    categories: string[] | null,
    createdDate: Date,
    text: string,
    uid?: string,
}
