export interface OpenEmailModal {
    title: string;
    message: string;
}

export interface CloseEmailModal {
    email: string;
    submit: boolean;
}