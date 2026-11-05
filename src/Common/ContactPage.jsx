
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import QueryService from "../Services/QueryService";
import AuthService from "../Services/AuthService";

export default function ContactPage() {
    const userType = AuthService.getUserType();
    const homeLink = userType === "freelancer" ? "/freelancer/home" : "/";

    const [name, setName] = useState(localStorage.getItem("name") || "");
    const [email, setEmail] = useState(localStorage.getItem("email") || "");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [sending, setSending] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();

        if (
            !name.trim() ||
            !email.trim() ||
            !subject.trim() ||
            !message.trim()
        ) {
            toast.error("Please fill all the fields");
            return;
        }

        if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
            toast.error("Enter a valid email");
            return;
        }

        try {
            setSending(true);

            await QueryService.add({
                userId: AuthService.getUid() || "",
                userType: userType || "guest",
                name: name.trim(),
                email: email.trim(),
                subject: subject.trim(),
                message: message.trim(),
            });

            toast.success("Message sent. We will get back to you soon.");

            setSubject("");
            setMessage("");

        } catch (err) {
            console.log(err);
            toast.error("Could not send message");
        } finally {
            setSending(false);
        }
    }

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">
                        Contact Us
                    </h1>

                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item">
                                <Link to={homeLink}>Home</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Contact
                            </li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}

            <div className="container-xxl py-5">
                <div className="container">
                    <div className="row g-5">

                        {/* Form */}
                        <div className="col-lg-7">
                            <p className="fs-5 fw-bold text-primary">
                                Contact Us
                            </p>

                            <h1 className="display-6 mb-4">
                                Have a question or problem? Send us a message
                            </h1>

                            <form onSubmit={handleSubmit}>
                                <div className="row g-3">

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="cname"
                                                placeholder="Your Name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="cname">Your Name</label>
                                        </div>
                                    </div>

                                    <div className="col-md-6">
                                        <div className="form-floating">
                                            <input
                                                type="email"
                                                className="form-control"
                                                id="cemail"
                                                placeholder="Your Email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="cemail">Your Email</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="csubject"
                                                placeholder="Subject"
                                                maxLength={100}
                                                value={subject}
                                                onChange={(e) => setSubject(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="csubject">Subject</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="form-floating">
                                            <textarea
                                                className="form-control"
                                                id="cmessage"
                                                placeholder="Message"
                                                style={{ height: 140 }}
                                                maxLength={1000}
                                                value={message}
                                                onChange={(e) => setMessage(e.target.value)}
                                                required
                                            />
                                            <label htmlFor="cmessage">Message</label>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <button
                                            className="btn btn-primary py-3 px-4"
                                            type="submit"
                                            disabled={sending}
                                        >
                                            {sending ? "Sending..." : "Send Message"}
                                        </button>
                                    </div>

                                </div>
                            </form>
                        </div>

                        {/* Contact Details */}
                        <div className="col-lg-5">

                            <div className="border rounded p-4 mb-3">
                                <h5 className="mb-1">
                                    <i className="fa fa-map-marker-alt text-primary me-2" />
                                    Address
                                </h5>
                                <p className="mb-0">
                                    Your FREEDOM project address
                                </p>
                            </div>

                            <div className="border rounded p-4 mb-3">
                                <h5 className="mb-1">
                                    <i className="fa fa-phone-alt text-primary me-2" />
                                    Phone
                                </h5>
                                <p className="mb-0">
                                    +91 XXXXXXXXXX
                                </p>
                            </div>

                            <div className="border rounded p-4">
                                <h5 className="mb-1">
                                    <i className="fa fa-envelope text-primary me-2" />
                                    Email
                                </h5>
                                <p className="mb-0">
                                    your-email@example.com
                                </p>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}
