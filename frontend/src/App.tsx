import { FormEvent, useEffect, useState } from "react";

type URL = {
  shortened: string;
  original: string;
  clicked: number;
  created: string;
};

function App() {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchEntries = async () => {
      const response = await fetch("http://localhost:3000/list", {
        method: "GET",
      });

      const result = await response.json();
      setUrls(result);
    };

    fetchEntries();
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const value = formData.get("input") as string;

    const response = await fetch(`http://localhost:3000/create?url=${value}`, {
      method: "POST",
    });

    const result = await response.json();
    const url = `http://localhost:3000/r/${result.shortened}/`;

    const out = document.getElementById("out")!;
    out.innerHTML = `<a href="${url}" target="_blank">${url}</a>`;
  };

  return (
    <main className="container">
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

        <article>
          <table>
            <tr>
              <th>Shortened</th>
              <th>Original</th>
              <th>Clicks</th>
              <th>Created</th>
            </tr>

            {urls.map((url: URL) => (
              <tr>
                <td>
                  <a href={`http://localhost:3000/r/${url.shortened}/`}>
                    {url.shortened}
                  </a>
                </td>
                <td>
                  <a href={url.original}>{url.original}</a>
                </td>
                <td>{url.clicked}</td>
                <td>{new Date(url.created).toLocaleDateString("en-US")}</td>
              </tr>
            ))}
          </table>
        </article>
      </section>
    </main>
  );
}

export default App;
