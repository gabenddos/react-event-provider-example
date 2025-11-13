import { useMutation } from '@tanstack/react-query';
import { useEventSystem } from "../../contexts/event-provider/event-provider";
import { NANO_EVENT } from "../../contexts/event-provider/types";
import type { Api } from "../../interfaces/Api";
import { useGetApis } from '../queries/useGetApis';

export const getDummyData = () => {
    return JSON.parse(localStorage.getItem('dummy-data') || '[]');
}

export const setDummyData = (data: Array<Api>) => {
    localStorage.setItem('dummy-data', JSON.stringify(data));
}

export const useCreateApi = () => {
    // hook to get the event system
    const emitter = useEventSystem();

    return useMutation({
        mutationFn: async (): Promise<Api> => {
            await new Promise(resolve => setTimeout(resolve, 500));
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

            const currentData = getDummyData();
            setDummyData([...currentData, data]);

            console.log('Emitting event with data: ', data);
            // emit the event with the NANO_EVENT enum and data (notice that for each event in the enum the that will be validated e.g. passing a `{}` instead of `data` will cause a type error)
            emitter.emit(NANO_EVENT.API_CREATED, data);

            return data;
        },
        onSuccess: () => {
            useGetApis.invalidateQueries();
        },
    });

};