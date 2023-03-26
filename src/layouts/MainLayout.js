import { Outlet } from "react-router-dom"
import Alert from "../components/Alert"
import Header from "../components/Header"

export function MainLayout(props){

    return(
        <>
            <Header urunler={props.urunler} urunSayisi={props.urunSayisi}/>
            <main>
                <div className="container">
                    <Outlet />
                </div>
            </main>
            <Alert />
        </>
    )
}