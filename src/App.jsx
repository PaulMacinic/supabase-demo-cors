import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://hakaiaxejimickjldgzu.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhha2FpYXhlamltaWNramxkZ3p1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDI3NTg2OTQsImV4cCI6MjAxODMzNDY5NH0.Ztj5gWFPAMCX9fAGZTJqY70bxH0uA-wstXA9B0VnyMQ"
);

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const callEdgeFunction = async () => {
      const { data, error } = await supabase.functions.invoke("hello-world", {
        body: { name: "Functions" },
      });

      console.log(data, error);
    };
    callEdgeFunction();
  }, []);

  useEffect(() => {
    getCountries();
  }, []);

  async function getCountries() {
    const { data } = await supabase.from("countries").select();
    setCountries(data);
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={country.name}>{country.name}</li>
      ))}
    </ul>
  );
}

export default App;
