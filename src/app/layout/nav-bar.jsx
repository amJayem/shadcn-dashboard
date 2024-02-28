import logo from '@/assets/rof-logo.png'
import { CardDescription } from '@/components/ui/card'
import Image from 'next/image'

const NavBar = () => {
  return (
    <div className='h-20 mb-2 flex justify-between items-center bg-lime-100'>
      <div></div>
      <div className='flex items-center'>
        <Image src={logo} height={100} width={80} alt='logo' />
        <text className='text-[#1FA457] text-2xl font-bold inline'>
          Rajbari <span className='text-yellow-500'>Organic</span> Foods
        </text>
      </div>
      <CardDescription className='pr-5'>Investors</CardDescription>
    </div>
  )
}
export default NavBar
