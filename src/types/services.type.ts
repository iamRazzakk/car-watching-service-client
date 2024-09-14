export type TCreateService = {
    _id:string;
    name: string;
    description: string;
    price: number;
    duration: number;
    isDeleted?: boolean;
};
