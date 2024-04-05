import UserContextProvider from "./context/UserContext";
import Homepage from "./pages/Homepage";
import { Toaster } from "react-hot-toast";

function App() {
	return (
		<UserContextProvider>
			<Toaster position="top-right" />
			<div className="font-cormoran max-w-[500px] mx-auto mt-2 px-4">
				<Homepage />
			</div>
		</UserContextProvider>
	);
}

export default App;
