import { useEffect, useState } from "react";

const allMessages = [
  { id: 1, que: "What are the skills you have", ans: "Dummy skills" },
  {
    id: 2,
    que: "What are the product you have",
    ans: "Dummy products",
  },
  { id: 3, que: "What are the fruits you have", ans: "Dummy Fruits" },
];
export default function Home() {
  const [messages, setMessages] = useState([]);
  const [que, setQue] = useState([]);
  const [isTyping, setIsTyping] = useState(true);
  const [isAfterTyping, setIsAfterTyping] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  }, []);

  const onSubmitHandler = (e) => {
    e.preventDefault();

    if (que === "") {
      return;
    }
    setMessages((prev) => [
      ...prev,
      { id: messages.length + 1, name: que, owner: "user" },
    ]);
    setIsAfterTyping(true);
    document
      .getElementById("scrollTo")
      .scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const ans = allMessages.find((msg) =>
        msg.que.toLocaleLowerCase().includes(que)
      );
      let findAns;
      if (ans) {
        findAns = { id: messages.length + 1, name: ans.ans };
      } else {
        findAns = { id: messages.length + 1, name: "No answer found" };
      }
      setMessages((prev) => [...prev, findAns]);
      setQue("");
      document
        .getElementById("scrollTo")
        .scrollIntoView({ behavior: "smooth", block: "start" });

      setIsAfterTyping(false);

      
    }, 1000);
  };

  return (
    <div
      style={{
        height: "100vh",
        padding: "10px",
        color: "white",
      }}
    >
      <h1 style={{ margin: "0" }}>Welcome to the chatbot</h1>

      {isTyping
        ? "Typing ..."
        : allMessages.map((msg) => (
            <p key={msg.id}>
              {msg.id}. {msg.que}
            </p>
          ))}

      <hr style={{ height: "5px", color: "white" }} />

      {messages.map((m, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            width: "100%",
            justifyContent: m.owner === "user" ? "flex-end" : "flex-start",
          }}
        >
          <div
            style={{
              backgroundColor: m.owner === "user" ? "green" : "orange",
              padding: "3px",
              width: "40%",
              borderRadius: "10px",
              marginBottom: "10px",
            }}
          >
            <p style={{margin:'2px'}}> {m.name} </p>
          </div>
        </div>
      ))}

      {isAfterTyping && "Typing..."}

      <div id="scrollTo" style={{ height: "70px" }}></div>

      <form
        onSubmit={onSubmitHandler}
        style={{
          display: "flex",
          margin: "auto",
          width: "98%",
          position: "fixed",
          bottom: "0",
        }}
      >
        <input
          value={que}
          style={{ flex: 1, width: "100%", height: "30px" }}
          onChange={(e) => setQue(e.target.value)}
          type="text"
        />
        <button type="submit"> {`>`} </button>
      </form>
    </div>
  );
}
