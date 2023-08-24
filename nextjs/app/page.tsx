import Reserve from '@/components/reserve'
import Hometop from '@/components/hometop'
import Homeleft from '@/components/homeleft'
import Homeright from '@/components/homeright'
export default function Home() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Hometop/>
      <Reserve/>
      <Homeleft/>
      <Homeright/>
    </div>
  );
}
