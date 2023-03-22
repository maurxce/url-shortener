import { FormEvent } from "react";

function App() {
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("input") as string;

    const response = await fetch(`http://localhost:3000/create?url=${value}`, {
      method: "POST",
    });

    const result = await response.json();
    const url = `http://localhost:3000/${result.url}/`;

    const out = document.getElementById("out")!;
    out.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  };

  return (
    <main>
      <section>
        <h1>URL shortener</h1>

        <article>
          <form onSubmit={handleSubmit}>
            <label htmlFor="input">
              Original URL
              <input
                type="text"
                name="input"
                placeholder="https://example.com/"
                required
              />
            </label>

            <button type="submit">Short</button>
          </form>

          <small id="out"></small>
        </article>
      </section>
    </main>
  );
}

export default App;
