
import { HomeNav } from "pages/home/HomeNav";
import { HomeHero } from "pages/home/HomeHero";


export default function Page() {
    return (
        <>
        <HomeNav isLoggedIn={false}/>
        <HomeHero />
        
        </>
    )
  }