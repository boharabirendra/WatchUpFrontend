export interface ICommentCard{
    createdAt: Date,
    text: string;
    user: {
        email: string;
        profileUrl: string;
        fullName: string
    }
}

