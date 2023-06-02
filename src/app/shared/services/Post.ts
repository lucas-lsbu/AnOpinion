export interface Post {
    title: string,
    categories: string[] | null,
    createdDate: Date,
    text: string,
    uid?: string
}
