import supabase from "../config/supabaseClient";
import { useState, useEffect } from "react";

export default function Home() {
  const [fetchError, setFetchError] = useState < any > null;
  const [fruits, setFruits] = useState < any > null;
  useEffect(() => {
    const fetchFruits = async () => {
      const { data, error } = await supabase.from("fruits").select();
      if (error) {
        setFetchError("error message");
        console.log(error);
        setFruits(null);
      }
      if (data) {
        console.log(data);
        setFruits(data);
        setFetchError(null);
      }
    };
    fetchFruits();
  }, []);
  return (
    <>
      {fetchError && <div>{fetchError}</div>}
      {fruits && (
        <div>
          {fruits.map((fruit) => {
            return <div key={fruit.id}>{fruit.title}</div>;
          })}
        </div>
      )}
    </>
  );
}
