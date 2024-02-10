"use client";

import ReduxProvider from "./redux-provider";


export default function Providers({ children }) {
    return (
        <ReduxProvider>
            {children}
        </ReduxProvider>
    );
}