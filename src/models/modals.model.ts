export interface OpenEmailModal {
    title: string;
    message: string;
}

export interface CloseEmailModal {
    email: string;
    submit: boolean;
}

export interface GenericModalOpen{
    html: string;
    time: number;
}

export interface GenericModalClose{
    isClosed: boolean;
}