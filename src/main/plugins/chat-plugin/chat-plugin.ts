import { ChatOptions } from "../../../common/config/chat-options";
import { UserConfigOptions } from "../../../common/config/user-config-options";
import { defaultChatIcon } from "../../../common/icon/default-icons";
import { SearchResultItem } from "../../../common/search-result-item";
import { TranslationSet } from "../../../common/translation/translation-set";
import { ExecutionPlugin } from "../../execution-plugin";
import { PluginType } from "../../plugin-type";

/**
 * chat bot plugin
 * support open-ai gpt
 */
export class ChatBotPlugin implements ExecutionPlugin {
    public pluginType = PluginType.Chat;
    private chatConfig: ChatOptions;

    private translationSet: TranslationSet;
    private readonly clipboardCopier: (value: string) => Promise<void>;

    constructor(
        config: UserConfigOptions,
        translationSet: TranslationSet,
        clipboardCopier: (value: string) => Promise<void>,
    ) {
        this.chatConfig = config.chatOptions;
        this.translationSet = translationSet;
        this.clipboardCopier = clipboardCopier;
    }

    isValidUserInput(userInput: string): boolean {
        if(userInput === undefined){
            return false;
        }
        return userInput.startsWith(this.chatConfig.prefix);
    }

    public execute(searchResultItem: SearchResultItem, privileged: boolean): Promise<void> {
        return this.clipboardCopier(searchResultItem.executionArgument);
    }

    getSearchResults(userInput: string): Promise<SearchResultItem[]> {
        // TODO  openai stuff
        return new Promise((resolve)=> {
            resolve([
                {
                    description: this.translationSet.calculatorCopyToClipboard,
                    executionArgument: "args", // copy的参数
                    hideMainWindowAfterExecution: true,
                    icon: defaultChatIcon,
                    name: "hello, " + this.chatConfig.key,
                    originPluginType: this.pluginType,
                    searchable: [],
                },
            ]);
        });
    }

    public isEnabled(): boolean {
        return this.chatConfig.isEnabled;
    }

    public updateConfig(updatedConfig: UserConfigOptions, translationSet: TranslationSet): Promise<void> {
        return new Promise((resolve) => {
            this.chatConfig = updatedConfig.chatOptions;
            this.translationSet = translationSet;
            resolve();
        });
    }
}