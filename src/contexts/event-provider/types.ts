import type { Api } from "../../interfaces/Api";
import type { App } from "../../interfaces/App";


export enum NANO_EVENT {
	APP_CREATED = "appCreated",
	API_CREATED = "appUpdated",
}

export type Events = {
	[NANO_EVENT.APP_CREATED]: (data: Api) => void;
	[NANO_EVENT.API_CREATED]: (data: App) => void;
};
