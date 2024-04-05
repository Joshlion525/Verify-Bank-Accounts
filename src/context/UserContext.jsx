import { createContext, useState } from "react";

export const UserContext = createContext();
const UserContextProvider = ({ children }) => {
	const [allBankLists, setAllBankLists] = useState([]);
	const [accountNumber, setAccountNumber] = useState("");
	const [bankName, setBankName] = useState("");
	const [user, setUser] = useState([]);
	const [loading, setLoading] = useState(false);
	const userContextValue = {
		allBankLists,
		setAllBankLists,
		accountNumber,
		setAccountNumber,
		bankName,
		setBankName,
		user,
		setUser,
        loading,
        setLoading
	};
	return (
		<UserContext.Provider value={userContextValue}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContextProvider;
