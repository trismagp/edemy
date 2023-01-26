import { useEffect, useState, useContext } from "react";
import { Context } from "../../context";
import axios from "axios";
import { useRouter } from "next/router";

const UserIndex = () => {
  // state
  const [hidden, setHidden] = useState(true);
    // router
  const router = useRouter();

  const {
    state: { user },
  } = useContext(Context);

  useEffect(() => {
    fetchUser();
    if (user === null) router.push("/");
  }, []);

  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/current-user");
      console.log(data);
      setHidden(false);
    } catch (err) {
      console.log(err);
      setHidden(true);
    }
  };

  return (
    <>
      {!hidden && (
        <h1 className="jumbotron text-center square">
          <pre>{JSON.stringify(user, null, 4)}</pre>
        </h1>
      )}
    </>
  );

};

export default UserIndex;
