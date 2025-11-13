import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Toaster, toast } from 'sonner';
import { EventProvider } from './contexts/event-provider/event-provider';
import { getDummyData, useCreateApi } from './services/mutations/useCreateApi';
import { useEvent } from './contexts/event-provider/useEvent';
import { NANO_EVENT } from './contexts/event-provider/types';
import type { Api } from './interfaces/Api';


function App() {
  const { mutateAsync } = useCreateApi();

  const [apis, setApis] = useState<Api[]>(getDummyData());

  // subscribing to API creation event
  useEvent(NANO_EVENT.API_CREATED, (data) => {
    console.log('API created:', data);
    toast.success(`API created: ${data.name}`);


    // also updating the list state
    setApis(getDummyData());
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
        <button onClick={() => {
          mutateAsync();

        }} style={{ marginRight: '10px' }}>
          Dispatch API Creation Event
        </button>

        <button onClick={() => {
          localStorage.setItem('dummy-data', '[]');
          setApis([]);
        }}>
          Clear
        </button>


      </div>

      <div>
        <h2>All APIs in LocalStorage</h2>
        <ul className="read-the-docs">
          {apis.map((api: any, idx: number) => (
            <li key={idx}>
              <strong>{api.name}</strong> - {api.version} ({api.baseUrl})
            </li>
          ))}

          {apis.length === 0 && <li>No APIs found in LocalStorage</li>}
        </ul>
      </div>
    </EventProvider>
  )
}

export default App
