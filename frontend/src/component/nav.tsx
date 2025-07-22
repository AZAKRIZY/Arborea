
import plant from "../assets/plant.png"

const Nav = () => {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-gray-100 ">
      
      <div className="flex items-center">
        <img src={plant} alt="Plant logo" className="h-15 w-14 mr-2" />
        <h1 className="text-xl font-bold">Arborea</h1>
      </div>
      
      <button className="bg-green-600 hover:cursor-pointer text-white px-4 py-2 rounded hover:bg-green-700">
        Sign In
      </button>
    </div>
  )
}

export default Nav