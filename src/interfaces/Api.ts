// Dummy API interface
export interface Api {
    name: string;
    version: string;
    baseUrl: string;
    endpoints: Record<string, any>;
}