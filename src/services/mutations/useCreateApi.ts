import { useEventSystem } from "../../contexts/event-provider/event-provider";
import { NANO_EVENT } from "../../contexts/event-provider/types";
import type { Api } from "../../interfaces/Api";

export const getDummyData = () => {
    return JSON.parse(localStorage.getItem('dummy-data') || '[]');
}

export const setDummyData = (data: Array<Api>) => {
    localStorage.setItem('dummy-data', JSON.stringify(data));
}

export const useCreateApi = () => {
    const emitter = useEventSystem()
    // TODO: implement react query mutation
    const mutateAsync = async () => {

        // faking backend request
        await new Promise(resolve => setTimeout(resolve, 1000));
        const data: Api = {
            name: `API_${Math.floor(Math.random() * 10000)}`,
            version: `${Math.floor(Math.random() * 2) + 1}.${Math.floor(Math.random() * 10)}.${Math.floor(Math.random() * 100)}`,
            baseUrl: `https://api${Math.floor(Math.random() * 1000)}.example.com`,
            endpoints: {
                [`getItems${Math.floor(Math.random() * 100)}`]: {
                    url: `/items/${Math.floor(Math.random() * 50)}`,
                    method: Math.random() > 0.5 ? 'GET' : 'POST',
                },
            },
        }

        // Faking data persistence into localStorage
        const currentData = getDummyData();
        setDummyData([...currentData, data]);


        // Event dispatching
        emitter.emit(NANO_EVENT.API_CREATED, data);

        return data;
    };

    return { mutateAsync };
};