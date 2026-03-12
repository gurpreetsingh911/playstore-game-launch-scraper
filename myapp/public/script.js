async function fetchGame() {

    const url = document.getElementById("gameUrl").value;

    const response = await fetch("/fetch-game", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
    });

    const data = await response.json();

    document.getElementById("message").innerHTML = `
      Status: ${data.message} <br>
    
    `;
        
    
    document.getElementById("result").innerHTML = `
      <h3>Result</h3>
      Game Name: ${data.gameName} <br>
      Developer: ${data.developer} <br>
      Play Link: ${data.googleLink}
  `;
}


async function addGame() {

  const url = document.getElementById("gameUrl").value;

  const response = await fetch("/fetch-game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ url })
  });

  const data = await response.json();

  document.getElementById("gameName").innerText = data.gameName;
  document.getElementById("developer").innerText = data.developer;
  document.getElementById("playLink").innerText = data.googleLink;
}