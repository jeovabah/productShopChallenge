import { useAuth } from "../providers/Auth";
import Router from "./router";
import { RouterProtected } from "./routerProtected";

export const RoutesAll = () => {
    const { signed } = useAuth();


    return (
        <>
            {
                signed ? (
                    <RouterProtected />
                ) : (
                    <Router />
                )
            }
        </>
    );

}