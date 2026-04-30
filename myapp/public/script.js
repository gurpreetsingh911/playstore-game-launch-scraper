async function fetchGame() {
  const urlInput = document.getElementById("gameUrlInput");
  const url = urlInput.value.trim(); //  .trim() removes accidental spaces
  const messageDiv = document.getElementById("message");
  const table = document.getElementById("first");
  
  //  Guard: stop early if empty
  if (!url) {
    messageDiv.innerText = "❌ Please enter a URL!";
    return;
  }

  try {
    const response = await fetch("/fetch-game", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url: url }) //  using `url` consistently
    });

    const data = await response.json();
    console.log("Data from backend:", data); //  keep this for debugging

    if (response.ok) {
    document.getElementById("resName").innerText = data.gameName;   // 
    document.getElementById("resDev").innerText = data.developer;   // 
    document.getElementById("resLink").innerText = data.googleLink; //

    } else {
      messageDiv.innerText = "❌ Error: " + (data.error || "Server crash");
    }

  } catch (err) {
    console.log("Fetch error:", err);
    messageDiv.innerText = "❌ Network error, check console."; //  show error on page too
  }

 
}