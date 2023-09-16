import { useSelector } from "react-redux";
import CreateUser from "../features/user/CreateUser"
import Button from "./Button";

function Home() {
  const userName = useSelector(state => state.user.username)

  return (
    <div className="my-10 text-center ">
      <h1 className="mb-8 text-xl font-semibold md:text-2xl">
        The best pizza.
        <br />
        <span className="text-yellow-500 md:text-2xl">Straight out of the oven, straight to you.</span>
      </h1>
      {!userName ? <CreateUser /> : <Button to='/menu' size='medium'>BACK TO Menu</Button> }
    </div>
  );
}

export default Home;
