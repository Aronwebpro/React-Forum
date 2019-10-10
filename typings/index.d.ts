declare type User = {
    uid: string
    authorName: string
    authorAvatar: string
    memberSince: string // Date
    topics: number
    answers: number
    lastReply: string
    type: string
}

declare type Post = {
    postId: string
    title: string
    text: string
    type: string
    category: string
    categoryId: string
    created: number
    lastReply: number
    lastUser: User
    lastUserId: string
    repliesCount: number
    userId: string
    user: User
}

declare type GoogleUser = {
    uid: string
    displayName: string
    email: string
    photoURL: string
}