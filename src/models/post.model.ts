interface PostModel {
    id?:string,
    title?:string,
    titleAr?:string,
    content?:string,
    contentAr?:string,
    publishedDate?:Date,
    imageUrl?:string,
    category?:string,
    tag?:TagModel[],
}