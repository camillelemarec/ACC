"use client";

import { useState, useRef, useCallback } from "react";
import Footer from "../../components/Footer";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

interface PersonalInfo {
  lastName: string;
  firstName: string;
  phone: string;
  email: string;
}

interface PhotoFile {
  file: File;
  preview: string;
}

export default function ContactPage() {
  const [step, setStep] = useState<Step>(1);
  const [role, setRole] = useState<"particulier" | "professionnel" | "">("");
  const [project, setProject] = useState("");
  const [address, setAddress] = useState("");
  const [photos, setPhotos] = useState<PhotoFile[]>([]);
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    lastName: "",
    firstName: "",
    phone: "",
    email: "",
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const next = () => setStep((s) => (s < 6 ? ((s + 1) as Step) : s));
  const prev = () => setStep((s) => (s > 1 ? ((s - 1) as Step) : s));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(6);
  };

  const addPhotos = useCallback((files: FileList | null) => {
    if (!files) return;
    const newPhotos: PhotoFile[] = Array.from(files)
      .filter((f) => f.type.startsWith("image/"))
      .map((file) => ({ file, preview: URL.createObjectURL(file) }));
    setPhotos((prev) => [...prev, ...newPhotos]);
  }, []);

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    addPhotos(e.dataTransfer.files);
  };

  const isPersonalInfoValid =
    personalInfo.lastName.trim() &&
    personalInfo.firstName.trim() &&
    personalInfo.phone.trim() &&
    personalInfo.email.trim();

  const stepBtn =
    "rounded-full bg-primary px-5 py-2 text-sm uppercase tracking-[0.2em] text-white transition hover:bg-accent hover:text-primary disabled:cursor-not-allowed disabled:opacity-40";
  const backBtn =
    "text-sm uppercase tracking-[0.2em] text-primary/70 hover:text-accent";
  const modifyBtn =
    "text-xs uppercase tracking-[0.3em] text-primary/60 underline";
  const cardBase = "rounded-2xl bg-white p-6 shadow-soft transition";
  const inputBase =
    "w-full rounded-xl border border-primary/20 bg-offwhite/60 p-4 text-primary outline-none ring-accent/20 focus:border-accent focus:ring-2";

  return (
    <>
      <main className="mx-auto max-w-4xl bg-offwhite px-6 py-16 text-primary md:px-10 md:py-20">
        <p className="text-xs uppercase tracking-[0.3em] text-primary/60">
          Nous Contacter
        </p>
        <h1 className="mt-4 font-serif text-3xl md:text-4xl">
          Parlons de votre projet
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-primary/75">
          Quelques étapes rapides pour nous permettre de mieux comprendre votre
          besoin et vous accompagner au mieux.
        </p>

        {/* Barre de progression */}
        <div className="mt-8 flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((s) => (
            <div
              key={s}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                s <= (step === 6 ? 5 : step)
                  ? "bg-accent"
                  : "bg-primary/15"
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-8">
          {/* ───── Étape 1 : Profil ───── */}
          <div
            className={`${cardBase} ${step === 1 ? "opacity-100" : "opacity-60"}`}
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-xl md:text-2xl">
                1. Vous êtes…
              </h2>
              {step > 1 && (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className={modifyBtn}
                >
                  modifier
                </button>
              )}
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              {(["particulier", "professionnel"] as const).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => {
                    setRole(value);
                    if (step === 1) next();
                  }}
                  className={`rounded-full border px-5 py-2.5 text-sm uppercase tracking-[0.2em] transition ${
                    role === value
                      ? "border-accent bg-accent text-primary"
                      : "border-primary/30 text-primary hover:border-accent hover:text-accent"
                  }`}
                >
                  {value}
                </button>
              ))}
            </div>
          </div>

          {/* ───── Étape 2 : Projet ───── */}
          {step >= 2 && (
            <div
              className={`${cardBase} ${step === 2 ? "opacity-100" : "opacity-60"}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl md:text-2xl">
                  2. Parlez-nous de votre projet
                </h2>
                {step > 2 && (
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className={modifyBtn}
                  >
                    modifier
                  </button>
                )}
              </div>
              <textarea
                value={project}
                onChange={(e) => setProject(e.target.value)}
                className={`mt-4 ${inputBase}`}
                rows={4}
                placeholder="Décrivez votre projet : rénovation, construction, type de bâti, vos envies…"
              />
              {step === 2 && (
                <div className="mt-4 flex items-center justify-between">
                  <button type="button" onClick={prev} className={backBtn}>
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => project.trim() && next()}
                    disabled={!project.trim()}
                    className={stepBtn}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ───── Étape 3 : Adresse ───── */}
          {step >= 3 && (
            <div
              className={`${cardBase} ${step === 3 ? "opacity-100" : "opacity-60"}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl md:text-2xl">
                  3. Adresse du projet
                </h2>
                {step > 3 && (
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className={modifyBtn}
                  >
                    modifier
                  </button>
                )}
              </div>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={`mt-4 ${inputBase}`}
                placeholder="Adresse, code postal, ville…"
              />
              {step === 3 && (
                <div className="mt-4 flex items-center justify-between">
                  <button type="button" onClick={prev} className={backBtn}>
                    Retour
                  </button>
                  <button
                    type="button"
                    onClick={() => address.trim() && next()}
                    disabled={!address.trim()}
                    className={stepBtn}
                  >
                    Suivant
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ───── Étape 4 : Photos ───── */}
          {step >= 4 && (
            <div
              className={`${cardBase} ${step === 4 ? "opacity-100" : "opacity-60"}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl md:text-2xl">
                  4. Ajoutez des photos de votre projet
                </h2>
                {step > 4 && (
                  <button
                    type="button"
                    onClick={() => setStep(4)}
                    className={modifyBtn}
                  >
                    modifier
                  </button>
                )}
              </div>
              <p className="mt-1 text-sm text-primary/60">
                Photos du bâtiment, du terrain, plans… tout ce qui peut nous
                aider à visualiser votre projet.
              </p>

              {step === 4 && (
                <>
                  <div
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    className={`mt-4 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 transition ${
                      isDragging
                        ? "border-accent bg-accent/10"
                        : "border-primary/20 bg-offwhite/60 hover:border-accent/50"
                    }`}
                  >
                    <svg
                      className="h-10 w-10 text-primary/30"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 16v-8m0 0-3 3m3-3 3 3M6.75 19.25h10.5A2.25 2.25 0 0019.5 17V7a2.25 2.25 0 00-2.25-2.25H6.75A2.25 2.25 0 004.5 7v10a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                    <p className="mt-3 text-sm font-medium text-primary/70">
                      Glissez vos photos ici ou{" "}
                      <span className="text-accent underline">parcourez</span>
                    </p>
                    <p className="mt-1 text-xs text-primary/45">
                      JPG, PNG, WEBP — 10 Mo max par fichier
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={(e) => addPhotos(e.target.files)}
                      className="hidden"
                    />
                  </div>

                  {photos.length > 0 && (
                    <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
                      {photos.map((photo, i) => (
                        <div key={i} className="group relative">
                          <img
                            src={photo.preview}
                            alt={`Photo ${i + 1}`}
                            className="h-24 w-full rounded-lg object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(i)}
                            className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-xs text-white opacity-0 transition group-hover:opacity-100"
                            aria-label="Supprimer"
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}

              {step > 4 && photos.length > 0 && (
                <p className="mt-2 text-sm text-primary/60">
                  {photos.length} photo{photos.length > 1 ? "s" : ""}{" "}
                  ajoutée{photos.length > 1 ? "s" : ""}
                </p>
              )}

              {step === 4 && (
                <div className="mt-4 flex items-center justify-between">
                  <button type="button" onClick={prev} className={backBtn}>
                    Retour
                  </button>
                  <button type="button" onClick={next} className={stepBtn}>
                    {photos.length > 0 ? "Suivant" : "Passer cette étape"}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ───── Étape 5 : Informations personnelles ───── */}
          {step >= 5 && (
            <div
              className={`${cardBase} ${step === 5 ? "opacity-100" : "opacity-60"}`}
            >
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-xl md:text-2xl">
                  5. Vos informations personnelles
                </h2>
                {step > 5 && (
                  <button
                    type="button"
                    onClick={() => setStep(5)}
                    className={modifyBtn}
                  >
                    modifier
                  </button>
                )}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-primary/70">
                    Nom
                  </label>
                  <input
                    type="text"
                    value={personalInfo.lastName}
                    onChange={(e) =>
                      setPersonalInfo((p) => ({
                        ...p,
                        lastName: e.target.value,
                      }))
                    }
                    className={inputBase}
                    placeholder="Votre nom"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-primary/70">
                    Prénom
                  </label>
                  <input
                    type="text"
                    value={personalInfo.firstName}
                    onChange={(e) =>
                      setPersonalInfo((p) => ({
                        ...p,
                        firstName: e.target.value,
                      }))
                    }
                    className={inputBase}
                    placeholder="Votre prénom"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-primary/70">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={personalInfo.phone}
                    onChange={(e) =>
                      setPersonalInfo((p) => ({
                        ...p,
                        phone: e.target.value,
                      }))
                    }
                    className={inputBase}
                    placeholder="06 00 00 00 00"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-primary/70">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    value={personalInfo.email}
                    onChange={(e) =>
                      setPersonalInfo((p) => ({
                        ...p,
                        email: e.target.value,
                      }))
                    }
                    className={inputBase}
                    placeholder="votre@email.fr"
                  />
                </div>
              </div>
              {step === 5 && (
                <div className="mt-6 flex items-center justify-between">
                  <button type="button" onClick={prev} className={backBtn}>
                    Retour
                  </button>
                  <button
                    type="submit"
                    disabled={!isPersonalInfoValid}
                    className={stepBtn}
                  >
                    Envoyer ma demande
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ───── Étape 6 : Confirmation ───── */}
          {step === 6 && (
            <div className="rounded-2xl bg-primary/5 p-6 text-primary">
              <h3 className="font-serif text-xl md:text-2xl text-primary">
                Merci pour votre demande !
              </h3>
              <p className="mt-3 text-base leading-relaxed text-primary/75">
                Voici le récapitulatif de votre projet. Nous reviendrons vers
                vous rapidement.
              </p>
              <ul className="mt-4 space-y-2 text-sm text-primary/80">
                <li>
                  <span className="font-semibold">Profil :</span>{" "}
                  {role || "Non renseigné"}
                </li>
                <li>
                  <span className="font-semibold">Projet :</span>{" "}
                  {project || "Non renseigné"}
                </li>
                <li>
                  <span className="font-semibold">Adresse :</span>{" "}
                  {address || "Non renseigné"}
                </li>
                <li>
                  <span className="font-semibold">Photos :</span>{" "}
                  {photos.length > 0
                    ? `${photos.length} photo${photos.length > 1 ? "s" : ""}`
                    : "Aucune photo ajoutée"}
                </li>
                <li>
                  <span className="font-semibold">Contact :</span>{" "}
                  {personalInfo.firstName} {personalInfo.lastName}
                </li>
                <li>
                  <span className="font-semibold">Téléphone :</span>{" "}
                  {personalInfo.phone}
                </li>
                <li>
                  <span className="font-semibold">Email :</span>{" "}
                  {personalInfo.email}
                </li>
              </ul>
              {photos.length > 0 && (
                <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {photos.map((photo, i) => (
                    <img
                      key={i}
                      src={photo.preview}
                      alt={`Photo ${i + 1}`}
                      className="h-16 w-full rounded-lg object-cover"
                    />
                  ))}
                </div>
              )}
              <p className="mt-4 text-sm text-primary/65">
                (L&apos;envoi par email sera ajouté lors de l&apos;intégration
                de l&apos;API mail.)
              </p>
            </div>
          )}
        </form>

        <p className="mt-10 text-sm text-primary/70">
          Vous pouvez aussi nous joindre directement :{" "}
          <span className="font-medium text-primary">
            contact@alaincoutant.fr
          </span>
        </p>
        <div className="mt-10 space-y-3">
          <p className="text-xs uppercase tracking-[0.3em] text-primary/60">
            Passez nous voir
          </p>
          <p className="text-base text-primary/75">
            BP 04 · Z.I. de la Poterie · 79700 Mauléon
          </p>
          <div className="overflow-hidden rounded-2xl border border-primary/10 shadow-soft">
            <iframe
              title="Plan - SARL Alain Coutant"
              src="https://maps.google.com/maps?q=46.926382,-0.740875&t=k&z=17&output=embed"
              className="h-48 w-full md:h-64"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
