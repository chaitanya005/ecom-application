import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

export default function Logout() {
	useEffect(() => {
		localStorage.removeItem("ecom_token");
	}, []);
	return <Navigate to="/login" />;
}
