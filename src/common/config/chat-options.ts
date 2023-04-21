export interface ChatOptions {
    key: string;
    isEnabled: boolean;
    prefix: string;
}

export const defaultChatOptions: ChatOptions = {
    isEnabled: true,
    key: "",
    prefix: "chat:"
};
