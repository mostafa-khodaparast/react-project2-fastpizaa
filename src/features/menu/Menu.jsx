import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";


export async function menuLoader() {
  const data = await getMenu()
  return data
}

const Menu = () => {
  const menu = useLoaderData()
  

  return <ul className="divide-y divide-stone-300 px-2">
    {menu.map(pizza => <MenuItem pizza={pizza} key={pizza.id} />)}
  </ul>
}

export default Menu;
