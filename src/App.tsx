import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster, toast } from 'sonner';
import { EventProvider } from './contexts/event-provider/event-provider';
import { useCreateApi } from './services/mutations/useCreateApi';
import { useGetApis } from './services/queries/useGetApis';
import { useEvent } from './contexts/event-provider/useEvent';
import { NANO_EVENT } from './contexts/event-provider/types';
import type { Api } from './interfaces/Api';


function App() {
  const createApiState = useCreateApi();
  const { data, isLoading } = useGetApis();

  useEvent(NANO_EVENT.API_CREATED, (data) => {
    console.log('API created:', data);
    toast.success(`API created: ${data.name}`);
  });

  return (
    <EventProvider>
      <Toaster />

      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React + Event Provider</h1>
      <div className="card">
        <button
          onClick={() => {
            createApiState.mutateAsync();
          }}
          style={{ marginRight: '10px' }}
        >
          {createApiState.isPending ? 'Creating...' : 'Dispatch API Creation Event'}
        </button>

        <button onClick={() => {
          localStorage.setItem('dummy-data', '[]');
          useGetApis.invalidateQueries();
        }}>
          Clear
        </button>


      </div>

      <div>
        <h2>All APIs in LocalStorage</h2>
        {isLoading ? (
          <p>Loading APIs...</p>
        ) : (
          <ul className="read-the-docs">
            {data?.map((api: Api, idx: number) => (
              <li key={idx}>
                <strong>{api.name}</strong> - {api.version} ({api.baseUrl})
              </li>
            ))}

            {data?.length === 0 && <li>No APIs found in LocalStorage</li>}
          </ul>
        )}
      </div>
    </EventProvider>
  )
}

export default App
