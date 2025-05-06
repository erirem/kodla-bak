import React, {useState} from "react";
import {login, register} from "../services/authService";

export default function LoginRegister({onAuthSuccess}) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = isLogin
                ? {email, password}
                : {name, email, password};

            const data = isLogin ? await login(userData) : await register(userData);

            if (isLogin) {
                localStorage.setItem("token", data.access_token);
                onAuthSuccess();
            } else {
                setIsLogin(true);
            }
        } catch (err) {
            setError("🚫 Giriş veya kayıt başarısız. Lütfen tekrar deneyin.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <input
                            type="text"
                            placeholder="Adınız"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        />
                    )}
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />
                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        required
                    />

                    {error && <div className="text-red-500 text-sm">{error}</div>}

                    <button
                        type="submit"
                        className="bg-indigo-600 w-full text-white py-2 rounded hover:bg-indigo-700"
                    >
                        {isLogin ? "Giriş Yap" : "Kayıt Ol"}
                    </button>
                </form>

                <p className="mt-4 text-center text-sm">
                    {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
                    <button
                        onClick={() => setIsLogin(!isLogin)}
                        className="text-indigo-600 hover:underline"
                    >
                        {isLogin ? "Kayıt Ol" : "Giriş Yap"}
                    </button>
                </p>
            </div>
        </div>
    );
}
