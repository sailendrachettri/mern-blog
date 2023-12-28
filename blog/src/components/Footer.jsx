import { Link } from "react-router-dom";

export default function Footer(){
    const sailendraGithub = 'http://github.com/sailendrachettri';
    const sailendraGamil = 'tomail:sailendra9083@gmail.com';

    let year = new Date();
    year = year.getFullYear();
    

    return(
        <footer>
            <div>Developed by <Link to={sailendraGithub} className="linkTag">Sailendra</Link> @ <span>{year}</span></div>
            <div><Link to={sailendraGamil} className="linkTag">sailendra9083@gmail.com</Link></div>

        </footer>
    );
}