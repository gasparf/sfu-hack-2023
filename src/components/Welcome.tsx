import Image from "next/image"

const Welcome = () => {
  return (
    <div>
      <div className="flex justify-center font-bold text-4xl mt-10 ">
        <p className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent" >Unleash the Power of Wellness: Your Journey to a Healthier, Happier You!</p>
      </div>
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-center justify-center mt-20 text-2xl font-bold">
          Try out our Calorie Tracker
          <Image src="/groceries.png" alt="image" width={400} height={400} className="rounded-xl mt-5"/>
        </div>
        <div className="flex flex-col items-center justify-center mt-20 text-2xl font-bold">
          Try out our AI Health Doctor
          <Image src="/doctor.png" alt="image" width={400} height={400} className="rounded-xl mt-5"/>
        </div>

      </div>
    </div>
  )
}

export default Welcome