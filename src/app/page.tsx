
import { HomeNav} from "@/components/home/HomeNav";
import { HomeHero } from "@/components/home/HomeHero";


export default function Page() {
    return (
        <>
        <HomeNav isLoggedIn={false}/>
        <HomeHero />
        </>
    )
  }