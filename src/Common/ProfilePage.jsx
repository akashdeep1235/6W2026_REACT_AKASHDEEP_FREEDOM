import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { RingLoader } from "react-spinners";
import { toast } from "react-toastify";
import UserService from "../Services/UserService";
import CloudinaryService from "../Services/CloudinaryService";
import AuthService from "../Services/AuthService";

const override = { display: "block", margin: "0 auto", borderColor: "red" };

export default function ProfilePage() {
    const uid = AuthService.getUid();
    const userType = AuthService.getUserType();
    const isFreelancer = userType === "freelancer";
    const homeLink = isFreelancer ? "/freelancer/home" : "/";

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [user, setUser] = useState(null);

    const [name, setName] = useState("");
    const [contact, setContact] = useState("");
    const [address, setAddress] = useState("");
    const [skills, setSkills] = useState("");
    const [imageFile, setImageFile] = useState(null);     // new picture chosen by the user
    const [preview, setPreview] = useState("");           // what is shown in the circle

    useEffect(() => {
        async function loadUser() {
            try {
                const u = await UserService.getById(uid);
                if (!u) {
                    toast.error("Profile not found");
                    return;
                }
                setUser(u);
                setName(u.name || "");
                setContact(u.contact || "");
                setAddress(u.address || "");
                setSkills(u.skills || "");
                setPreview(u.profileImage || "");
            } catch (err) {
                console.log(err);
                toast.error("Could not load profile");
            } finally {
                setLoading(false);
            }
        }
        loadUser();
    }, []);

    function handleImage(e) {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            toast.error("Please choose an image file");
            return;
        }
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image must be smaller than 2 MB");
            return;
        }
        setImageFile(file);
        setPreview(URL.createObjectURL(file));
    }

    async function handleSave(e) {
        e.preventDefault();

        if (!name.trim() || !contact.trim() || !address.trim()) {
            toast.error("Name, contact and address are required");
            return;
        }
        if (!/^\d{10}$/.test(contact.trim())) {
            toast.error("Contact number must be 10 digits");
            return;
        }
        if (isFreelancer && !skills.trim()) {
            toast.error("Please enter your skills");
            return;
        }

        try {
            setSaving(true);

            let imageUrl = user.profileImage || "";
            if (imageFile) {
                imageUrl = await CloudinaryService.upload(imageFile);
            }

            await UserService.updateProfile(uid, {
                name: name.trim(),
                contact: contact.trim(),
                address: address.trim(),
                skills: isFreelancer ? skills.trim() : "",
                profileImage: imageUrl,
            });

            // keep the name/image used by the rest of the app in sync
            localStorage.setItem("name", name.trim());
            localStorage.setItem("address", address.trim());
            if (imageUrl) localStorage.setItem("image", imageUrl);

            setUser({ ...user, profileImage: imageUrl });
            setImageFile(null);
            toast.success("Profile updated");
        } catch (err) {
            console.log(err);
            toast.error("Could not update profile");
        } finally {
            setSaving(false);
        }
    }

    return (
        <>
            {/* Page Header Start */}
            <div className="container-fluid page-header py-5 mb-5 wow fadeIn" data-wow-delay="0.1s">
                <div className="container text-center py-5">
                    <h1 className="display-3 text-white mb-4 animated slideInDown">Profile</h1>
                    <nav aria-label="breadcrumb animated slideInDown">
                        <ol className="breadcrumb justify-content-center mb-0">
                            <li className="breadcrumb-item"><Link to={homeLink}>Home</Link></li>
                            <li className="breadcrumb-item active" aria-current="page">Profile</li>
                        </ol>
                    </nav>
                </div>
            </div>
            {/* Page Header End */}

            {loading ? (
                <RingLoader color="#81C408" loading={loading} cssOverride={override} size={75} />
            ) : (
                user && (
                    <div className="container mb-5" style={{ maxWidth: 700 }}>
                        <div className="border rounded p-4">

                            {/* Picture + role */}
                            <div className="text-center mb-4">
                                {preview ? (
                                    <img
                                        src={preview}
                                        alt="Profile"
                                        className="rounded-circle border mb-3"
                                        style={{ width: 120, height: 120, objectFit: "cover" }}
                                    />
                                ) : (
                                    <div
                                        className="rounded-circle border mb-3 d-inline-flex align-items-center justify-content-center bg-light"
                                        style={{ width: 120, height: 120, fontSize: 48, color: "#81C408" }}
                                    >
                                        {(name || "?").charAt(0).toUpperCase()}
                                    </div>
                                )}
                                <div>
                                    <span className="badge bg-success me-2 text-capitalize">{user.userType}</span>
                                    <span className="badge bg-secondary text-capitalize">{user.status}</span>
                                </div>
                            </div>

                            <form onSubmit={handleSave}>
                                <div className="mb-3">
                                    <label className="form-label">Profile picture</label>
                                    <input type="file" accept="image/*" className="form-control" onChange={handleImage} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" value={user.email || ""} disabled />
                                    <small className="text-muted">Email cannot be changed</small>
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Contact number</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={contact}
                                        maxLength={10}
                                        onChange={(e) => setContact(e.target.value.replace(/\D/g, ""))}
                                    />
                                </div>

                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <textarea className="form-control" rows={2} value={address} onChange={(e) => setAddress(e.target.value)} />
                                </div>

                                {isFreelancer && (
                                    <div className="mb-3">
                                        <label className="form-label">Skills</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="e.g. React, Node.js, UI design"
                                            value={skills}
                                            onChange={(e) => setSkills(e.target.value)}
                                        />
                                    </div>
                                )}

                                <button type="submit" className="btn btn-primary" disabled={saving}>
                                    {saving ? "Saving..." : "Save Changes"}
                                </button>
                            </form>
                        </div>
                    </div>
                )
            )}
        </>
    );
}