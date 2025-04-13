import { ShoppingCart, UserIcon } from "lucide-react";
import { Image } from "next/image";

import { Link } from "next/link";
import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/lib/constants";


const Header = () => {
  return (
    <Header className="w-full border-b">
        <div className="wrapper flex-between" >
            <div className="flex-start">
                <Link className="flex-start" href="/"/>
                <Image 
                    src='/images/logo.svg' 
                    alt={`${APP_NAME} logo`}
                    height={48}
                    width={48}
                    priority={true}
                />
                <span className="hidden lg:block fond-bold text-2xl ml-3" >{APP_NAME}</span>
            </div>
        </div>
    </Header>
  );
};

export default Header;
