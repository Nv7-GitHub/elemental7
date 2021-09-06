import Color from "color";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";
import { applyColorTransform, Elem, ElementalBaseAPI, ElementalColorPalette, ElementalLoadingUi, OptionsMenuAPI, OptionsSection, RecentCombination, RecentCombinationsAPI, ServerSavefileAPI, ServerSavefileEntry, ServerStats, Suggestion, SuggestionAPI, SuggestionColorInformation, SuggestionRequest, SuggestionResponse, ThemedPaletteEntry } from "../../elem";
import { Cache } from "./cache";
import { downloadElems, getCombination, getElem } from "./elements";
import { login } from "./login";
import { AnarchyClient, ResponseStream, ServiceError } from "./pb/anarchy_pb_service";
import { getRecents, waitForNew } from "./recents";
import { foundElement, getFound } from "./savefile";
import { Element } from "./types";
import { createElement } from "./create";


export class Nv7AnarchyAPI extends ElementalBaseAPI implements SuggestionAPI<'dynamic-elemental4'>, RecentCombinationsAPI,  ServerSavefileAPI, OptionsMenuAPI {
    public uid: string
	public saveFile;
	public ui;
    public client: AnarchyClient;
    public elemCache: Record<string, Element> = {};
    public cache: Cache;
    public ref: ResponseStream<Empty>;
	public prefix: string;

    public handleError(err: ServiceError) {
		if (err.message.length > 100) {
			err.message = "Unknown error."
		}
		this.ui.alert({
			title: "Error",
			text: err.message,
		});
	}

    async open(ui?: ElementalLoadingUi): Promise<boolean> {
		this.client = new AnarchyClient(this.config.grpc);
		this.cache = new Cache();
		this.prefix = this.config.prefix;
		await this.cache.init();
		await login(this, ui);
		await downloadElems(this, ui);
		return true;
    }

    async close(): Promise<void> {
		this.ref.cancel();
	}

    async getStats(): Promise<ServerStats> {
        return {
            totalElements: 0
        }
    }

    getSaveFiles(): ServerSavefileEntry[] {
        return [
            {
                id: "main",
                name: "Main Save",
            }
        ]
    }

    async getSuggestions(ids: string[]): Promise<Suggestion<"dynamic-elemental4">[]> {return []}
    async downvoteSuggestion(ids: string[], suggestion: SuggestionRequest<"dynamic-elemental4">): Promise<void> {throw new Error("Method not implemented.");}
	canCreateSaveFile(name: string): boolean {return false;}
	createNewSaveFile(name: string): Promise<string> {throw new Error("Method not implemented.");}
	canDeleteSaveFile(id: string): boolean {return false;}
	deleteSaveFile(id: string): Promise<boolean> {throw new Error("Method not implemented.");}
	canRenameSaveFile(id: string, name: string): boolean {return false;}
	renameSaveFile(id: string, name: string): Promise<boolean> {throw new Error("Method not implemented.");}
	lookupCustomPaletteColor(basePalette: Record<ElementalColorPalette, ThemedPaletteEntry>, string: string): Color {
		const [base, ...x] = string.split('_') 
			const [saturation, lightness] = x.map(y => parseFloat(y));
		
		return applyColorTransform(basePalette[base], saturation, lightness);
		}
    getSuggestionColorInformation(): SuggestionColorInformation<'dynamic-elemental4'> {
        return {
            type: 'dynamic-elemental4'
        };
    }

    readSaveFileElements(id: string): Promise<string[]> {return getFound(this); }
	writeNewElementToSaveFile(id: string, elementId: string): Promise<void> {return foundElement(this, elementId);}
    async getElement(id: string): Promise<Elem> {return getElem(this, id);}
    async getCombo(ids: string[]): Promise<string[]> {
		ids.sort();
		return getCombination(this, ids[0], ids[1]);
	}
    async getStartingInventory(): Promise<string[]> {
		return ['Air','Earth','Fire','Water'];
	}

    async getRecentCombinations(limit: number): Promise<RecentCombination[]> {
		return getRecents(this);
	}

	async waitForNewRecent(): Promise<void> {
		return waitForNew(this);
	}

    async createSuggestion(ids: string[], suggestion: SuggestionRequest<"dynamic-elemental4">): Promise<SuggestionResponse> {
		ids.sort();
		return createElement(this, ids[0], ids[1], suggestion);
	}

	getOptionsMenu(): OptionsSection[] {
		return [
			{
				title: "Nv7's Elemental",
				desc: this.config.description,
				items: [
					{
						type: "button",
						label: "Get Login Info",
						onChange: async () => {
							await this.ui.alert({
								title: "Username",
								text: await this.saveFile.get("email"),
							});
							await this.ui.alert({
								title: "Password",
								text: await this.saveFile.get("password"),
							});
						}
					},
					{
						type: "button",
						label: "Log Out",
						onChange: async () => {
							await this.saveFile.set("email", "default");
							await this.saveFile.set("password", "default");
							await this.ui.reloadSelf();
						}
					},
					{
						type: "button",
						label: "Refresh Cache",
						onChange: async () => {
							await this.saveFile.set("downloadTime", 0)
							await this.ui.reloadSelf();
						}
					},
				]
			},
		];
	}
}