import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import toast from "react-hot-toast";
import { Oval } from "react-loader-spinner";

const Homepage = () => {
	const {
		allBankLists,
		setAllBankLists,
		accountNumber,
		setAccountNumber,
		bankName,
		setBankName,
		user,
		setUser,
		loading,
		setLoading,
	} = useContext(UserContext);

	const handleAn = (e) => {
		setAccountNumber(e.target.value);
	};
	const handleBn = (e) => {
		setBankName(e.target.value);
	};

	const getAllBanks = async () => {
		try {
			const response = await fetch("https://api.paystack.co/bank", {
				headers: {
					Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY}`,
				},
			});
			if (!response.ok) {
				throw new Error("Failed to fetch banks");
			}

			const data = await response.json();
			console.log(data.data);
			setAllBankLists(data.data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getAllBanks();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);

		const response = await fetch(
			`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankName}`,
			{
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${import.meta.env.VITE_SECRET_KEY}`,
				},
			}
		);

		if (response.status === 200) {
			const userData = await response.json();

			setTimeout(() => {
				toast.success("Account retrieved successfully");
				setAccountNumber("");
				setBankName("");
				setLoading(false);
				setUser(userData.data);
			}, 2000);
		} else {
			const error = await response.json();
			setLoading(false);
			toast.error("This account is invalid");
		}
	};
	return (
		<div className="">
			<h1 className="font-bold text-2xl italic">Account Verification</h1>
			<form action="" className="mt-4" onSubmit={handleSubmit}>
				<div className="flex flex-col gap-1">
					<label htmlFor="" className="font-bold">
						Account Number:
					</label>
					<input
						type="number"
						placeholder="Type in your account number"
						className="border border-blue-400 rounded-lg outline-blue-700 h-12 px-2 text-lg"
						value={accountNumber}
						onChange={handleAn}
                        required
					/>
				</div>
				<div className="flex flex-col gap-1 mt-4">
					<label htmlFor="" className="font-bold">
						Select Bank:
					</label>
					<select
						name=""
						id=""
						className="border border-blue-400 rounded-lg outline-blue-700 h-12 px-2 text-lg"
						value={bankName}
						onChange={handleBn}
                        required
					>
						<option value="">Select your bank</option>
						{allBankLists.map((bankList) => (
							<option value={bankList.code} key={bankList.id}>
								{bankList.name}
							</option>
						))}
					</select>
				</div>
				<div className="mt-5 flex justify-center">
					<button
						type="submit"
						className="bg-blue-700 text-white rounded-md py-2 px-14"
					>
						{loading ? (
							<Oval
								visible={true}
								height="30"
								width="100"
								color="#fff"
								ariaLabel="oval-loading"
								wrapperStyle={{}}
								wrapperClass=""
							/>
						) : (
							`Submit`
						)}
					</button>
				</div>
			</form>
			<div className="mt-4">
				<h1 className="font-bold text-xl text-center">
					{user.account_name}
				</h1>
				<p className="text-center">{user.account_number}</p>
			</div>
		</div>
	);
};

export default Homepage;
