import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ReactQueryDevtools} from "react-query-devtools";
import {QueryClientProvider, QueryClient} from "react-query";
import Main from "./components/Main";

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
        <div className="App h-full">
        <DndProvider backend={HTML5Backend}>
          <Main />
        </DndProvider>
      </div>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
    
    
  );
}

export default App;
