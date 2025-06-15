import { useMutation } from "@tanstack/react-query";

export const useGenerateReceipe = () => {
  return useMutation({
    mutationFn: async (prompt: string) => {
      // TODO: ENVS!
      const res = await fetch("http://localhost:3001/api/openai/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error("Coś poszło nie tak");
      const data = await res.json();
      return data.result;
    },
  });
};
