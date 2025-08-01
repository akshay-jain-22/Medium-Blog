import { Auth } from "../components/Auth";
import { Quote } from "../components/Quote";


function Signup() {
    return <div>
        <div className="grid grid-cols-1 lg:grid-cols-2">
            <div>
                <Auth type="signup" />
            </div>
            <div className="bg-gray-300 invisible lg:visible">
                <Quote />
            </div>
                
        </div>
    </div>
     
}

export default Signup;
