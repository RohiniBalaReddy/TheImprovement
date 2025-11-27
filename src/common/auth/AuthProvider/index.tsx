import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import AuthModal from "../AuthModal";

type OpenOpts = { callbackUrl?: string; defaultMethod?: "email" | "phone" };

type AuthCtx = {
    openAuth: (opts?: OpenOpts) => void;
    closeAuth: () => void;
};

const Ctx = createContext<AuthCtx>({ openAuth: () => { }, closeAuth: () => { } });
export const useAuthModal = () => useContext(Ctx);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const [opts, setOpts] = useState<OpenOpts>({});

    const openAuth = useCallback((o?: OpenOpts) => {
        setOpts(o || {});
        setOpen(true);
    }, []);

    const closeAuth = useCallback(() => setOpen(false), []);

    const value = useMemo(() => ({ openAuth, closeAuth }), [openAuth, closeAuth]);

    return (
        <Ctx.Provider value={value}>
            {children}
            <AuthModal
                isOpen={open}
                closeModal={closeAuth}
                callbackUrl={opts?.callbackUrl}
            />
        </Ctx.Provider>
    );
}
