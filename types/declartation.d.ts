export interface ChannelOption {
    name: string;
    params: object;
    hooks?: {
        ok: (resp: any) => void;
        error: (resp: any) => void;
        [key: string]: (resp: any) => void;
    };
}
