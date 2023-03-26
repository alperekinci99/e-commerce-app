import { Link } from "react-router-dom";

export default function Breadcrumb(props){
    return(
        <div className="breadcrumb-area">
            <h1 className="page-title">
                {props.mainTitle}
            </h1>
            <ul className="list">
                <li>
                    <Link to="/">Anasayfa</Link>
                </li>
                {props.link.map((item, index) =>
                    item.isActive === true ? <li key={index} className="active-link">
                        <span>{item.title}</span> </li>:
                        <li key={index}>
                        <Link to={item.url}>{item.title}</Link></li>
                )}
            </ul>
        </div>
        
    )
}