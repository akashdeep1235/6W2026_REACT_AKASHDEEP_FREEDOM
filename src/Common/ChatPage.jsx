import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import MessageService from "../Services/MessageService";
import ProjectService from "../Services/ProjectService";
import UserService from "../Services/UserService";
import AuthService from "../Services/AuthService";

export default function ChatPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const uid = AuthService.getUid();
    const myName = localStorage.getItem("name") || "Me";
    const backLink = AuthService.getUserType() === "freelancer" ? "/freelancer/contracts" : "/work";
    const [title, setTitle] = useState("");
    const [otherName, setOtherName] = useState("");
    const [messages, setMessages] = useState([]);
    const [text, setText] = useState("");
    const [sending, setSending] = useState(false);
    const bottomRef = useRef(null);
    useEffect(() => {
        let cancelled = false;
        let unsubscribe = () => { };

        async function init() {
            try {
                const contract = await MessageService.getContract(id);
                if (cancelled) return;
                if (!contract || (contract.clientId !== uid && contract.freelancerId !== uid)) {
                    toast.error("You cannot access this chat", { toastId: "chat-denied" });
                    navigate("/", { replace: true });
                    return;
                }
                const [projects, users] = await Promise.all([ProjectService.all(), UserService.all()]);
                if (cancelled) return;
                setTitle(projects.find((p) => p.id === contract.projectId)?.title || "");
                const otherId = contract.clientId === uid ? contract.freelancerId : contract.clientId;
                setOtherName(users.find((u) => u.uid === otherId)?.name || "");

                unsubscribe = MessageService.listen(id, setMessages, (err) => {
                    console.log(err);
                    toast.error("Could not load messages", { toastId: "chat-load" });
                });
            } catch (err) {
                console.log(err);
                toast.error("Could not open chat", { toastId: "chat-open" });
            }
        }
        init();
        return () => {
            cancelled = true;
            unsubscribe();
        };
    }, [id]);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);
    async function handleSend(e) {
        e.preventDefault();
        const msg = text.trim();
        if (!msg || sending) return;
        try {
            setSending(true);
            await MessageService.send(id, { senderId: uid, senderName: myName, text: msg });
            setText("");
        } catch (err) {
            console.log(err);
            toast.error("Message not sent");
        } finally {
            setSending(false);
        }
    }
    return (
        <>
            {/* ...page banner... */}

            <div className="container mb-5" style={{ maxWidth: 800 }}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <div>
                        <h4 className="mb-0">{title || "Contract chat"}</h4>
                        {otherName && <small className="text-muted">Chatting with {otherName}</small>}
                    </div>
                    <Link to={backLink} className="btn btn-outline-secondary btn-sm">Back</Link>
                </div>
                <div className="border rounded p-3 mb-3" style={{ height: 420, overflowY: "auto", background: "#f8f9fa" }}>
                    {messages.length === 0 && (
                        <p className="text-center text-muted mt-5">No messages yet. Say hello!</p>
                    )}

                    {messages.map((m) => {
                        const mine = m.senderId === uid;
                        return (
                            <div key={m.id} className={"d-flex mb-2 " + (mine ? "justify-content-end" : "justify-content-start")}>
                                <div style={{
                                    maxWidth: "75%", padding: "8px 12px", borderRadius: 12,
                                    background: mine ? "#81C408" : "#ffffff",
                                    color: mine ? "#ffffff" : "#212529",
                                    border: mine ? "none" : "1px solid #dee2e6",
                                }}>
                                    {!mine && <div style={{ fontSize: 12, fontWeight: 600 }}>{m.senderName}</div>}
                                    <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>{m.text}</div>
                                    <div style={{ fontSize: 11, opacity: 0.75, textAlign: "right" }}>
                                        {new Date(m.createdAt).toLocaleString([], { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    <div ref={bottomRef} />
                </div>
                <form onSubmit={handleSend} className="d-flex gap-2">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Type a message..."
                        value={text}
                        maxLength={1000}
                        onChange={(e) => setText(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary" disabled={sending || !text.trim()}>
                        Send
                    </button>
                </form>
            </div>
        </>
    );
}