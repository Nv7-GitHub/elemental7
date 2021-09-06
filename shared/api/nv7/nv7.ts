import { Elem, ElementalBaseAPI, ElementalLoadingUi, ServerStats, SuggestionAPI, SuggestionResponse, SuggestionRequest, Suggestion, ServerSavefileAPI, ServerSavefileEntry, SuggestionColorInformation, ElementalColorPalette, ThemedPaletteEntry, applyColorTransform, RecentCombinationsAPI, RecentCombination, OptionsMenuAPI, OptionsSection, OptionTypes, RandomSuggestionsAPI } from "../../elem";
import Color from 'color';
import { login } from "./login";
import { foundElement, getFound } from "./savefile";
import { getElem, getCombination, downloadElems } from "./elements";
import { getSuggests, downSuggestion, newSuggestion } from "./suggestions";
import { getRecents, waitForNew } from "./recents";
import { IStore } from "../../store";
import { Cache } from "./cache";
import { Element } from "./types";
import { randomLonelySugg, upAndComingSugg } from "./randomSuggestions";
import { ElementalClient, ServiceError } from "./pb/elemental_pb_service";
import { ResponseStream } from "./pb/elemental_pb_service";
import { Empty } from "google-protobuf/google/protobuf/empty_pb";

export class NV7ElementalAPI extends ElementalBaseAPI implements SuggestionAPI<'dynamic-elemental4'>, RecentCombinationsAPI, ServerSavefileAPI, OptionsMenuAPI, RandomSuggestionsAPI {
	public uid: string
	public saveFile;
	public ui;
	public votesRequired: number = 3;
	public ref: ResponseStream<Empty>;
	public store: IStore;
	public prefix: string;
	public cache: Cache;
	public elemCache: Record<string, Element> = {};
	public client: ElementalClient;

	public handleError(err: ServiceError) {
		if (err.message.length > 100) {
			err.message = "Unknown error."
		}
		this.ui.alert({
			title: "Error",
			message: err.message,
			button: "Ok",
		});
	}

	async open(ui?: ElementalLoadingUi): Promise<boolean> {
		this.prefix = this.config.prefix;
		this.client = new ElementalClient(this.config.grpc); // Don't hardcode, get from config
		this.cache = new Cache();
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
	async getElement(id: string): Promise<Elem> { return getElem(this, id); }
	async getCombo(ids: string[]): Promise<string[]> {
		ids.sort();
		return getCombination(this, ids[0], ids[1]);
	}
	async getStartingInventory(): Promise<string[]> {
		return ['Air', 'Earth', 'Fire', 'Water'];
	}

	getSaveFiles(): ServerSavefileEntry[] {
		return [
			{
				id: "main",
				name: "Main Save",
			}
		]
	}
	readSaveFileElements(id: string): Promise<string[]> { return getFound(this); }
	writeNewElementToSaveFile(id: string, elementId: string): Promise<void> { return foundElement(this, elementId); }
	canCreateSaveFile(name: string): boolean { return false; }
	createNewSaveFile(name: string): Promise<string> { throw new Error("Method not implemented."); }
	canDeleteSaveFile(id: string): boolean { return false; }
	deleteSaveFile(id: string): Promise<boolean> { throw new Error("Method not implemented."); }
	canRenameSaveFile(id: string, name: string): boolean { return false; }
	renameSaveFile(id: string, name: string): Promise<boolean> { throw new Error("Method not implemented."); }

	getSuggestionColorInformation(): SuggestionColorInformation<'dynamic-elemental4'> {
		return {
			type: 'dynamic-elemental4'
		};
	}
	async getSuggestions(ids: string[]): Promise<Suggestion<"dynamic-elemental4">[]> {
		ids.sort();
		return getSuggests(this, ids[0], ids[1]);
	}
	async createSuggestion(ids: string[], suggestion: SuggestionRequest<"dynamic-elemental4">): Promise<SuggestionResponse> {
		ids.sort();
		return newSuggestion(ids[0], ids[1], suggestion, this);
	}

	async downvoteSuggestion(ids: string[], suggestion: SuggestionRequest<"dynamic-elemental4">): Promise<void> {
		ids.sort();
		return downSuggestion(suggestion, this);
	}

	async getRecentCombinations(limit: number): Promise<RecentCombination[]> {
		return getRecents(this);
	}

	async waitForNewRecent(): Promise<void> {
		return waitForNew(this);
	}

	async randomLonelySuggestion(): Promise<string[]> {
		return await randomLonelySugg(this);
	}

	async upAndComingSuggestion(): Promise<string[]> {
		return await upAndComingSugg(this);
	}

	lookupCustomPaletteColor(basePalette: Record<ElementalColorPalette, ThemedPaletteEntry>, string: string): Color {
		const [base, ...x] = string.split('_')
		const [saturation, lightness] = x.map(y => parseFloat(y));

		return applyColorTransform(basePalette[base], saturation, lightness);
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
